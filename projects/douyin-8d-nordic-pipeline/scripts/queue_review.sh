#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <review-id> <payload-json-file>" >&2
  exit 1
fi

review_id="$1"
payload_file="$2"
review_dir="${REVIEW_DIR:-$(cd "$(dirname "$0")/.." && pwd)/review}"

if [[ ! -f "$payload_file" ]]; then
  echo "payload file not found: $payload_file" >&2
  exit 1
fi

mkdir -p "$review_dir"
cp "$payload_file" "$review_dir/${review_id}.json"
echo "$review_dir/${review_id}.json"
