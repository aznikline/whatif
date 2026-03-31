#!/usr/bin/env bash
set -euo pipefail

PLIST_SRC="/Users/wizout/op/openclaw/ops/launchd/ai.openclaw.daily-horror.plist"
PLIST_DST="/Users/wizout/Library/LaunchAgents/ai.openclaw.daily-horror.plist"

cp "$PLIST_SRC" "$PLIST_DST"
launchctl unload "$PLIST_DST" >/dev/null 2>&1 || true
launchctl load "$PLIST_DST"

echo "installed: $PLIST_DST"
