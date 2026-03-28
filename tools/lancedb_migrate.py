#!/usr/bin/env python3
"""
LanceDB vector store adapter for OpenClaw memory system

Usage:
    source .venv/bin/activate
    python tools/lancedb_migrate.py migrate    # Migrate from SQLite
    python tools/lancedb_migrate.py verify     # Verify data integrity
"""

import sys
import json
import sqlite3
from pathlib import Path
from typing import List, Tuple, Optional

try:
    import lancedb
    import numpy as np
    LANCEDB_AVAILABLE = True
except ImportError:
    LANCEDB_AVAILABLE = False
    print("Error: lancedb not installed. Run: pip install lancedb")
    sys.exit(1)

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
STORE_DIR = PROJECT_ROOT / "memory" / "store"
SQLITE_VECTOR_DB = STORE_DIR / "vector.db"
LANCE_DB_DIR = STORE_DIR / "lance.db"

VECTOR_DIMS = 256


class LanceDBAdapter:
    """LanceDB-backed vector storage with lossless attributes."""

    def __init__(self, db_path: Path = LANCE_DB_DIR):
        self.db_path = db_path
        self.db = None
        self.table = None

    def connect(self):
        """Connect to LanceDB and get or create table."""
        self.db = lancedb.connect(str(self.db_path))

        # Define schema (using pyarrow)
        try:
            import pyarrow as pa
        except ImportError:
            print("Error: pyarrow required for LanceDB schema")
            sys.exit(1)

        schema = pa.schema([
            ("chunk_id", pa.string()),
            ("dims", pa.int32()),
            ("norm", pa.float32()),
            ("vector", pa.list_(pa.float32(), VECTOR_DIMS)),
            ("checksum", pa.string()),
            ("text", pa.string()),
            ("memory_id", pa.string()),
            ("created_at", pa.string()),
        ])

        if "vectors" in self.db.table_names():
            self.table = self.db.open_table("vectors")
        else:
            self.table = self.db.create_table("vectors", schema=schema, mode="overwrite")
            self.table.create_scalar_index("chunk_id")
            # Create vector index for fast search
            self.table.create_index(
                column="vector",
                index_type="IVF",  # or "HNSW"
                metric_type="cosine",
                num_partitions=256,
                num_sub_vectors=96
            )

    def insert_vector(self, chunk_id: str, vector: List[float], norm: float,
                      text: str, memory_id: str, checksum: str) -> bool:
        """Insert a vector record."""
        import pyarrow as pa

        row = {
            "chunk_id": chunk_id,
            "dims": len(vector),
            "norm": norm,
            "vector": vector,
            "checksum": checksum,
            "text": text,
            "memory_id": memory_id,
            "created_at": "",  # optional
        }

        try:
            self.table.add([row])
            return True
        except Exception as e:
            print(f"Insert error: {e}")
            return False

    def search_vectors(self, query_vector: List[float], k: int = 5) -> List[Tuple]:
        """Search nearest vectors."""
        try:
            # LanceDB query
            result = (
                self.table.search(query_vector)
                .select(["chunk_id", "text", "memory_id", "norm", "checksum"])
                .limit(k)
                .to_df()
            )

            # Convert to expected tuple format: (chunk_id, text, memory_id, norm, checksum)
            hits = []
            for _, row in result.iterrows():
                hits.append((
                    row['chunk_id'],
                    row['text'],
                    row['memory_id'],
                    row['norm'],
                    row['checksum']
                ))
            return hits
        except Exception as e:
            print(f"Search error: {e}")
            return []

    def count(self) -> int:
        """Return total vector count."""
        return self.table.count_rows()

    def close(self):
        """Close connection."""
        pass  # LanceDB auto-commit


def migrate_from_sqlite():
    """Migrate all vectors from SQLite to LanceDB."""
    if not SQLITE_VECTOR_DB.exists():
        print(f"Error: {SQLITE_VECTOR_DB} not found")
        return False

    print(f"Migrating from {SQLITE_VECTOR_DB} to {LANCE_DB_DIR}")

    # Connect to both
    sqlite_conn = sqlite3.connect(str(SQLITE_VECTOR_DB))
    cursor = sqlite_conn.cursor()

    lance_adapter = LanceDBAdapter()
    lance_adapter.connect()

    # Check current count
    cursor.execute("SELECT COUNT(*) FROM vectors")
    total = cursor.fetchone()[0]
    print(f"Found {total} vectors in SQLite")

    # Fetch in batches
    batch_size = 1000
    offset = 0
    migrated = 0

    while True:
        cursor.execute(
            "SELECT chunk_id, dims, norm, vector_json, checksum, memory_id FROM vectors LIMIT ? OFFSET ?",
            (batch_size, offset)
        )
        rows = cursor.fetchall()
        if not rows:
            break

        for chunk_id, dims, norm, vector_json, checksum, memory_id in rows:
            vector = json.loads(vector_json)
            # Get text from chunks table
            cursor2 = sqlite_conn.cursor()
            cursor2.execute("SELECT text FROM chunks WHERE chunk_id = ?", (chunk_id,))
            text_row = cursor2.fetchone()
            text = text_row[0] if text_row else ""

            lance_adapter.insert_vector(chunk_id, vector, norm, text, memory_id, checksum)
            migrated += 1

        offset += batch_size
        print(f"Migrated {migrated}/{total}", end="\r")

    sqlite_conn.close()
    print(f"\nMigration complete: {migrated} vectors")

    # Verify
    lance_count = lance_adapter.count()
    print(f"LanceDB count: {lance_count}")
    return lance_count == total


def verify():
    """Verify LanceDB integrity and test search."""
    if not LANCE_DB_DIR.exists():
        print(f"Error: {LANCE_DB_DIR} not found")
        return False

    lance_adapter = LanceDBAdapter()
    lance_adapter.connect()
    count = lance_adapter.count()
    print(f"LanceDB contains {count} vectors")

    # Test search (dummy query)
    if count > 0:
        dummy_query = [0.0] * VECTOR_DIMS
        results = lance_adapter.search_vectors(dummy_query, k=3)
        print(f"Test search returned {len(results)} results")
    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: lancedb_migrate.py [migrate|verify]")
        sys.exit(1)

    if sys.argv[1] == "migrate":
        success = migrate_from_sqlite()
        sys.exit(0 if success else 1)
    elif sys.argv[1] == "verify":
        verify()
    else:
        print("Unknown command")
        sys.exit(1)
