#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_FILE="${TREND_AUDIO_SOURCE_FILE:-$ROOT_DIR/data/audio_candidates.sample.json}"
SOURCE_URL="${TREND_AUDIO_SOURCE_URL:-}"

if [[ -n "$SOURCE_URL" ]]; then
  curl -fsSL "$SOURCE_URL"
  exit 0
fi

if [[ ! -f "$SOURCE_FILE" ]]; then
  echo "candidate source missing: $SOURCE_FILE" >&2
  exit 1
fi

cat "$SOURCE_FILE"
