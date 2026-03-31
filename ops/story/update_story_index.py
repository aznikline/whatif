#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/Users/wizout/op/openclaw/products/daily-horror")
README = ROOT / "README.md"


def main() -> int:
    entries: list[tuple[str, str, str]] = []
    for path in sorted(ROOT.glob("20*/*.md"), reverse=True):
        if path.name == "README.md":
            continue
        try:
            title = path.read_text(encoding="utf-8").splitlines()[0].strip()
        except Exception:
            title = path.stem
        style = ""
        meta = path.with_suffix(".meta.json")
        if meta.exists():
            try:
                payload = json.loads(meta.read_text(encoding="utf-8"))
                style = str(payload.get("selected_style") or "")
            except Exception:
                style = ""
        entries.append((path.relative_to(ROOT).as_posix(), title, style))

    lines = ["# Daily Horror Stories", "", "每日自动生成并推送的热点惊悚短篇。", ""]
    for rel, title, style in entries:
        suffix = f" [{style}]" if style else ""
        lines.append(f"- `{rel}` - {title}{suffix}")
    lines.append("")
    README.write_text("\n".join(lines), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
