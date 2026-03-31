#!/usr/bin/env python3
from __future__ import annotations

import json
import random
import re
import urllib.request
import xml.etree.ElementTree as ET
from html import unescape

NEWS_URLS = [
    "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
    "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-US&gl=US&ceid=US:en",
]
TRENDING_URL = "https://github.com/trending?since=daily"
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


def main() -> int:
    news = fetch_news()
    products = fetch_products()
    payload: dict[str, object] = {"news": news, "products": products}
    if news:
        payload["picked_event"] = random.choice(news[:5])
    if products:
        payload["picked_product"] = random.choice(products[:5])
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
