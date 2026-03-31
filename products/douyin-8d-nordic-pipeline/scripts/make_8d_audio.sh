#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "usage: $0 <input-audio> <output-audio>" >&2
  exit 1
fi

infile="$1"
outfile="$2"

if [[ ! -f "$infile" ]]; then
  echo "input audio not found: $infile" >&2
  exit 1
fi

mkdir -p "$(dirname "$outfile")"

pulse_hz="${PULSE_HZ:-0.09}"
pulse_amount="${PULSE_AMOUNT:-0.85}"

filter_chain="highpass=f=80,lowpass=f=14500,extrastereo=m=1.8,apulsator=mode=sine:hz=${pulse_hz}:amount=${pulse_amount},aecho=0.8:0.6:35|70:0.22|0.18,alimiter=limit=0.95"

ffmpeg -y \
  -i "$infile" \
  -vn \
  -af "$filter_chain" \
  -c:a aac \
  -b:a 320k \
  "$outfile"
