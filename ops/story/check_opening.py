#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ACTION_WORDS = [
    "买", "拆", "收", "开", "查", "翻", "点开", "录", "填", "走", "敲", "推", "刷", "签", "接", "抬", "看",
]
ANOMALY_WORDS = [
    "不对", "不见", "多出来", "少了", "没人", "自己", "忽然", "怪", "反常", "变成", "亮了", "黑了", "声音",
    "影子", "名字", "门牌", "档案", "颜色", "系统", "旧", "死", "夜里", "水", "河", "庙", "纸", "梦",
]
SENSORY_WORDS = [
    "冷", "热", "潮", "腥", "锈", "暗", "亮", "嗡", "响", "气味", "灯", "风", "灰", "湿", "痒",
]


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: check_opening.py <story-file>", file=sys.stderr)
        return 2

    text = Path(sys.argv[1]).read_text(encoding="utf-8")
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    title = lines[0] if lines else ""
    body = "\n".join(lines[1:]) if len(lines) > 1 else text
    opening = body[:280]

    score = 0
    reasons: list[str] = []

    if any(word in opening for word in ACTION_WORDS):
        score += 2
        reasons.append("has_action_entry")
    else:
        reasons.append("missing_action_entry")

    if any(word in opening for word in ANOMALY_WORDS):
        score += 3
        reasons.append("has_anomaly_signal")
    else:
        reasons.append("missing_anomaly_signal")

    if any(word in opening for word in SENSORY_WORDS):
        score += 1
        reasons.append("has_sensory_detail")
    else:
        reasons.append("weak_sensory_detail")

    paragraph_count = len([p for p in body.split("\n\n") if p.strip()])
    if paragraph_count >= 2:
        score += 1
        reasons.append("has_paragraph_motion")

    if re.search(r"[“\"].+[”\"]", opening):
        score += 1
        reasons.append("has_dialogue_or_quote")

    if len(opening) < 120:
        reasons.append("opening_too_short")
    elif len(opening) > 320:
        reasons.append("opening_too_long")
    else:
        score += 1
        reasons.append("opening_length_ok")

    conspicuous_number = False
    for match in re.findall(r"\d+", opening):
        if len(match) >= 3 and (match == match[::-1] or len(set(match)) <= 2):
            conspicuous_number = True
            break
    if conspicuous_number:
        reasons.append("conspicuous_number_pattern")
        score -= 1

    should_rewrite = score < 5 or "missing_anomaly_signal" in reasons or "missing_action_entry" in reasons
    payload = {
        "title": title,
        "score": score,
        "opening_excerpt": opening,
        "reasons": reasons,
        "should_rewrite": should_rewrite,
    }
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
