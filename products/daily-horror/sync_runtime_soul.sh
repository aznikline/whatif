#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/wizout/op/openclaw"
SOURCE="$ROOT/products/daily-horror/AGENT_SOUL.md"
TARGET="$ROOT/.openclaw-state/workspaces/daily-horror/SOUL.md"

mkdir -p "$(dirname "$TARGET")"
cp "$SOURCE" "$TARGET"
echo "$TARGET"
