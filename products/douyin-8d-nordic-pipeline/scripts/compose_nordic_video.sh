#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 3 ]]; then
  echo "usage: $0 <input-video> <input-audio> <output-video>" >&2
  exit 1
fi

invideo="$1"
inaudio="$2"
outfile="$3"

if [[ ! -f "$invideo" ]]; then
  echo "input video not found: $invideo" >&2
  exit 1
fi

if [[ ! -f "$inaudio" ]]; then
  echo "input audio not found: $inaudio" >&2
  exit 1
fi

mkdir -p "$(dirname "$outfile")"

ffmpeg -y \
  -stream_loop -1 \
  -i "$invideo" \
  -i "$inaudio" \
  -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p[v]" \
  -map "[v]" \
  -map 1:a \
  -shortest \
  -c:v libx264 \
  -preset medium \
  -crf 20 \
  -c:a aac \
  -b:a 192k \
  "$outfile"
