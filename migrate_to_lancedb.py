#!/usr/bin/env python3
import os, sys, sqlite3, json, importlib.util

os.environ['USE_LANCEDB'] = '1'
repo = '/Users/wizout/op/openclaw'
memory_cli_path = os.path.join(repo, 'ops', 'memory', 'memory_cli.py')
spec = importlib.util.spec_from_file_location("memory_cli", memory_cli_path)
memory_cli = importlib.util.module_from_spec(spec)
spec.loader.exec_module(memory_cli)

MemoryBackend = memory_cli.MemoryBackend

sqlite_conn = sqlite3.connect(os.path.join(repo, 'memory/store/vector.db'))
sqlite_conn.row_factory = sqlite3.Row
cur = sqlite_conn.cursor()
cur.execute("SELECT * FROM vectors")
rows = cur.fetchall()
print(f"[*] SQLite vectors: {len(rows)}")
mem = MemoryBackend()
backend = mem.vector_backend
print(f"[*] Using: {type(backend).__name__}")
count = 0
errors = []
for r in rows:
    try:
        backend.insert_vector(
            chunk_id=r['chunk_id'],
            vector=json.loads(r['vector']),
            norm=r['norm'],
            text=r['text'],
            memory_id=r['memory_id'],
            checksum=r['checksum']
        )
        count += 1
    except Exception as e:
        errors.append((r['chunk_id'], str(e)))
print(f"[+] Migrated: {count}/{len(rows)}")
if errors:
    print(f"[!] Errors ({len(errors)}):")
    for cid, err in errors[:5]:
        print(f"    {cid}: {err}")
backend.close()
sqlite_conn.close()
