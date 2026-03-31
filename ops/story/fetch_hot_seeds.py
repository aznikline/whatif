#!/usr/bin/env python3
from __future__ import annotations

import json
import random
import re
import urllib.request
import xml.etree.ElementTree as ET
from html import unescape
from pathlib import Path

NEWS_URLS = [
    "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
    "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en",
]
TRENDING_URL = "https://github.com/trending?since=daily"
STORY_ROOT = Path("/Users/wizout/op/openclaw/products/daily-horror")
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode("utf-8", errors="replace")


def clean(text: str) -> str:
    text = unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def fetch_news() -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    seen: set[str] = set()
    for url in NEWS_URLS:
        try:
            xml_text = fetch(url)
            root = ET.fromstring(xml_text)
        except Exception:
            continue
        for item in root.findall(".//item")[:10]:
            title = clean(item.findtext("title") or "")
            link = clean(item.findtext("link") or "")
            if not title or title in seen:
                continue
            seen.add(title)
            items.append({"title": title, "link": link, "source": url})
    return items[:12]


def fetch_products() -> list[dict[str, str]]:
    try:
        html = fetch(TRENDING_URL)
    except Exception:
        return []
    repos: list[str] = []
    for article in re.findall(r"<article[\s\S]*?</article>", html):
        match = re.search(r'href="/([^/"]+)/([^/"]+)"', article)
        if not match:
            continue
        owner, name = match.groups()
        full = f"{owner}/{name}"
        if full in repos:
            continue
        if owner in {"features", "topics", "collections", "sponsors", "trending"}:
            continue
        repos.append(full)
        if len(repos) >= 10:
            break
    return [
        {"title": repo, "link": f"https://github.com/{repo}", "source": TRENDING_URL}
        for repo in repos
    ]


STYLE_LABELS = {
    "social-dread": "现代社会惊悚",
    "liaozhai-zhiguai": "聊斋式志怪",
    "county-uncanny": "乡镇怪谈",
    "product-intrusion": "商品异化恐怖",
    "urban-cold-dread": "都市冷感惊悚",
}


def read_recent_styles(limit: int = 5) -> list[str]:
    styles: list[str] = []
    for meta in sorted(STORY_ROOT.glob("20*/*.meta.json"), reverse=True):
        try:
            payload = json.loads(meta.read_text(encoding="utf-8"))
        except Exception:
            continue
        style = payload.get("selected_style")
        if isinstance(style, str) and style and style not in styles:
            styles.append(style)
        if len(styles) >= limit:
            break
    return styles


def score_styles(event_title: str, product_title: str) -> dict[str, int]:
    text = f"{event_title} || {product_title}".lower()
    scores = {key: 0 for key in STYLE_LABELS}

    social_keywords = [
        "pay", "union", "strike", "attack", "threat", "court", "protest",
        "citizenship", "library", "school", "shutdown", "layoff", "review",
    ]
    product_keywords = [
        "app", "ios", "ai", "voice", "device", "assistant", "wearable",
        "copilot", "agent", "hermes", "vibe", "software", "github",
    ]
    urban_keywords = [
        "city", "miami", "hospital", "subway", "apartment", "office",
        "mall", "metro", "taxi", "delivery",
    ]
    county_keywords = [
        "island", "port", "harbor", "lake", "village", "county",
        "tanker", "oil", "road", "school", "west bank",
    ]
    zhiguai_keywords = [
        "island", "temple", "library", "ghost", "dream", "water",
        "river", "mountain", "old", "archive", "gate", "hall",
    ]

    for word in social_keywords:
        if word in text:
            scores["social-dread"] += 2
    for word in product_keywords:
        if word in text:
            scores["product-intrusion"] += 2
    for word in urban_keywords:
        if word in text:
            scores["urban-cold-dread"] += 2
    for word in county_keywords:
        if word in text:
            scores["county-uncanny"] += 2
    for word in zhiguai_keywords:
        if word in text:
            scores["liaozhai-zhiguai"] += 1

    if any(word in text for word in ["voice", "audio", "record", "ios", "ai"]):
        scores["product-intrusion"] += 3
        scores["urban-cold-dread"] += 1
    if any(word in text for word in ["tanker", "oil", "port", "harbor", "island"]):
        scores["county-uncanny"] += 3
        scores["liaozhai-zhiguai"] += 1
    if any(word in text for word in ["threat", "attack", "protest", "citizenship", "pay"]):
        scores["social-dread"] += 3
    return scores


def choose_style(event_title: str, product_title: str) -> tuple[str, str, list[str]]:
    recent = read_recent_styles()
    scores = score_styles(event_title, product_title)
    ranked = sorted(scores.items(), key=lambda item: (-item[1], item[0]))

    chosen = ranked[0][0] if ranked else "social-dread"
    for style, score in ranked:
        if style not in recent and score >= ranked[0][1] - 1:
            chosen = style
            break

    reasons: list[str] = []
    if chosen == "product-intrusion":
        reasons.append("产品种子更强，适合写商品/设备侵入生活")
    elif chosen == "social-dread":
        reasons.append("事件种子带有明显社会紧张感")
    elif chosen == "county-uncanny":
        reasons.append("港口/县城/边缘地带意象更强")
    elif chosen == "liaozhai-zhiguai":
        reasons.append("种子里有旧物、渡口、水域或异闻气质")
    elif chosen == "urban-cold-dread":
        reasons.append("题材更适合冷都市、平台、办公和夜生活语境")

    if chosen in recent:
        reasons.append("最近风格重复不可避免，但仍按种子匹配度优先")
    elif recent:
        reasons.append(f"同时避开最近已连续使用的风格: {', '.join(recent)}")

    return chosen, "；".join(reasons), recent


def choose_opening_mode(style_key: str) -> str:
    modes = {
        "social-dread": "从一次看似普通但已经让主角无法装作没看见的社会性小事切入",
        "liaozhai-zhiguai": "从夜路、旧宅、渡口、香火、纸物或异梦中的一个反常细节切入",
        "county-uncanny": "从县城、小港、国道、水库、集市、小旅馆里的异样传闻或夜间遭遇切入",
        "product-intrusion": "从一件新买、试用、促销或热门商品第一次表现出不该有的行为切入",
        "urban-cold-dread": "从合租房、办公楼、地铁口、医院、代驾或夜便利店里的一件失手或怪事切入",
    }
    return modes.get(style_key, "从一件普通生活细节中的反常变化切入")


def main() -> int:
    news = fetch_news()
    products = fetch_products()
    payload: dict[str, object] = {"news": news, "products": products}
    if news:
        payload["picked_event"] = random.choice(news[:5])
    if products:
        payload["picked_product"] = random.choice(products[:5])
    event_title = str(payload.get("picked_event", {}).get("title", ""))
    product_title = str(payload.get("picked_product", {}).get("title", ""))
    style_key, style_reason, recent_styles = choose_style(event_title, product_title)
    payload["picked_style"] = {
        "key": style_key,
        "label": STYLE_LABELS[style_key],
        "reason": style_reason,
    }
    payload["recent_styles"] = recent_styles
    payload["opening_mode"] = choose_opening_mode(style_key)
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
