#!/bin/bash
set -euo pipefail
export OPENCLAW_STATE_DIR=/Users/wizout/op/openclaw/.openclaw-state
export OPENCLAW_CONFIG_PATH=/Users/wizout/op/openclaw/.openclaw-state/openclaw.json
BACKUP_TAR='/Users/wizout/op/openclaw/tmp/openclaw-backups-main-openai-clean/openclaw-2026-03-24_1717.tar.gz'
RESTORE_DIR="$HOME/tmp/openclaw-restore-24h"
mkdir -p "$RESTORE_DIR" "$HOME/.openclaw"
/opt/homebrew/bin/openclaw gateway stop || true
tar -xzf "$BACKUP_TAR" -C "$RESTORE_DIR"
rsync -a "$RESTORE_DIR/home/.openclaw/" "$HOME/.openclaw/" || true
rsync -a "$RESTORE_DIR/project/.openclaw-state/" "/Users/wizout/op/openclaw/.openclaw-state/"
rsync -a "$RESTORE_DIR/project/.agents/skills/" "/Users/wizout/op/openclaw/.agents/skills/"
rsync -a "$RESTORE_DIR/project/memory/" "/Users/wizout/op/openclaw/memory/"
cp "$RESTORE_DIR/project/MEMORY.md" "/Users/wizout/op/openclaw/MEMORY.md"
cp "$RESTORE_DIR/project/SOUL.md" "/Users/wizout/op/openclaw/SOUL.md"
cp "$RESTORE_DIR/project/USER.md" "/Users/wizout/op/openclaw/USER.md"
/opt/homebrew/bin/openclaw gateway start
