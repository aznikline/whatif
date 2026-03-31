#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import os
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

STYLE_LABELS = {
    "social-dread": "现代社会惊悚",
    "liaozhai-zhiguai": "聊斋式志怪",
    "county-uncanny": "乡镇怪谈",
    "product-intrusion": "商品异化恐怖",
    "urban-cold-dread": "都市冷感惊悚",
}

STYLE_TEMPLATES = {
    "social-dread": "从一个具体办事动作、营业动作、照护动作或公开协作动作切入，让压力从制度和人情缝里漏出来，而不是直接靠系统弹窗。",
    "liaozhai-zhiguai": "从夜路、借宿、旧宅、渡口、祠堂、纸物、香火、残页或异梦切入，让怪异先像地方人不愿讲透的旧例。",
    "county-uncanny": "从县城老街、国道边、小旅馆、河道、修车铺、养殖场、殡葬铺、夜班岗位或广播喇叭切入，让异常像地方传闻自己找上门。",
    "product-intrusion": "从拆封、试用、摆样、维修、调试、返修、售后或直播演示切入，让商品先完成一次不该有的举动。",
    "urban-cold-dread": "从合租房、办公楼、商场后场、医院走廊、末班车、跑腿、代驾或外卖柜切入，让秩序中的细小偏差先出现。",
}

STYLE_HARD_MODES = {
    "social-dread": "把恐怖写成协作、照护、排班、催办、营业、汇报这些日常机制里的失控，不要写成抽象后台报错。",
    "liaozhai-zhiguai": "必须有门槛、借宿、渡口、祠堂、纸物、灯火、香灰、路引这类具体触点中的至少一种；必须有一条地方人知道但不愿解释透的禁忌；禁止退化成旧宅里突然出现一个女鬼。",
    "county-uncanny": "必须把怪异长在县镇营生上：养殖、修理、跑车、看场、赶集、守夜、送货、巡塘、守灵；不要空写荒凉。",
    "product-intrusion": "商品或设备必须真有手感、故障、返修、售后、试用、摆样、绑定、回访中的至少一环；禁止只写屏幕弹窗或纯数字异常。",
    "urban-cold-dread": "必须从人流秩序、空间摩擦、夜班服务、公共设施里长出寒意；不要只靠压抑心情撑全文。",
}

IMAGINATION_AXES = {
    "animals": [
        "候鸟认路却飞回废弃码头",
        "黑猫总守着不该有门牌的门口",
        "河里的东西只在有人报名字时浮头",
        "站点里的流浪狗只对某一类包裹低吼",
        "养殖场的鹅会追着会说谎的人跑",
    ],
    "plants": [
        "潮湿墙缝里的霉会沿着名字生长",
        "河滩杂草只在夜里朝旧宅方向倒伏",
        "香灰里长出的芽会缠上旧物",
        "温室作物在播报声里改换气味",
        "药圃里的植物会记住摸过它的人",
    ],
    "new-jobs": [
        "夜班代收员",
        "无人机测绘员",
        "殡仪化妆师",
        "直播场控",
        "养老院夜护工",
        "温室巡检员",
        "垃圾分拣员",
        "宠物殡葬师",
        "民宿代管员",
    ],
    "sci-fi-devices": [
        "语音替身设备",
        "气味采样仪",
        "识别眼镜",
        "无人机喇叭",
        "睡眠监测枕",
        "情绪回放镜",
    ],
    "cosmic-rules": [
        "每次被正确命名的东西都会向人间靠近一步",
        "某些包裹一旦签收就不再属于活人",
        "旧河道记住的名字比人口登记更多",
        "镇上有一套只在夜里生效的计数法",
        "某些东西只要被看见第三次就必须带回家",
    ],
    "body-object": [
        "纸张会吸走人的体温",
        "塑料外壳开始长出像指甲一样的薄层",
        "人的气味会被旧布料记住",
        "毛发会朝着某个门牌方向弯曲",
        "木头会把摸过它的手纹慢慢顶出来",
    ],
}

JOB_ANCHORS = {
    "social-dread": ["养老院夜护工", "培训机构后勤", "商场后场理货员", "社区食堂帮工", "夜间客服复核员"],
    "liaozhai-zhiguai": ["纸扎铺学徒", "渡口守夜人", "偏庙香火照看人", "祠堂账房", "替人抄经的租客"],
    "county-uncanny": ["温室巡检员", "养殖塘看守", "沿河修车工", "流动摊贩帮工", "民宿代管员"],
    "product-intrusion": ["返修仓技师", "样品间陈列员", "售后回访员", "直播场控", "旧货摊翻新工"],
    "urban-cold-dread": ["夜班医院运送员", "末班车保洁", "商场打烊巡场员", "老楼消防值守", "合租中介带看员"],
}

IMAGERY_ANCHORS = {
    "social-dread": ["考勤表上的油印手汗", "后厨蒸汽里发潮的塑料牌", "食堂保温箱里不散的异味", "夜班灯带下发白的皮肤"],
    "liaozhai-zhiguai": ["香灰里拱出来的细芽", "纸扎铺门后湿掉的灯笼骨", "渡口木桩上的潮痕", "祠堂梁上倒挂的旧羽毛"],
    "county-uncanny": ["养殖塘水面的碎月亮", "温室塑料膜上的手印雾气", "国道边招牌被风翻出的白背面", "修车铺地上的机油虹彩"],
    "product-intrusion": ["塑料外壳里渗出的体温雾", "样品包装边角长出的硬白薄片", "返修台金属托盘上的细小划痕", "柜台展示灯下发甜的焦味"],
    "urban-cold-dread": ["地铁换乘口的潮冷回风", "旧写字楼消防门缝里的灰", "商场中庭夜里悬空的广播回声", "医院走廊尽头不会灭的绿灯"],
}

STORY_ENGINES = {
    "animal-contract": {
        "label": "兽约",
        "prompt": "让某种动物成为地方规矩的执行者。人不是被鬼追，而是被一种懂规矩的生灵追认。",
        "fits": ["county-uncanny", "liaozhai-zhiguai"],
    },
    "botanical-takeover": {
        "label": "草木接管",
        "prompt": "让植物、霉、菌或药草沿着职业流程、家务流程或祭祀流程慢慢接管现实。",
        "fits": ["liaozhai-zhiguai", "social-dread", "county-uncanny"],
    },
    "craft-curse": {
        "label": "手艺报应",
        "prompt": "让一种具体手艺、修补术、烹调法、妆造法或地方工种，成为怪异发生的通道。",
        "fits": ["county-uncanny", "product-intrusion", "social-dread"],
    },
    "cosmic-counting": {
        "label": "计数法",
        "prompt": "让地方上存在一条离奇但自洽的计数、命名、轮换或映照规则，日常生活的人被迫进入它。",
        "fits": ["liaozhai-zhiguai", "urban-cold-dread", "social-dread"],
    },
    "itinerant-wonder": {
        "label": "游走奇物",
        "prompt": "让一个流动的摊位、戏班、展销员、维修员、灵车、广告车或巡回服务，把怪异带进镇子。",
        "fits": ["county-uncanny", "product-intrusion", "urban-cold-dread"],
    },
    "body-transference": {
        "label": "身体转写",
        "prompt": "让身体上的细节被布料、木头、塑料、纸、骨头、气味或植物悄悄转写、保存、复制或孵化。",
        "fits": ["product-intrusion", "liaozhai-zhiguai", "urban-cold-dread"],
    },
    "borrowed-season": {
        "label": "借来的时令",
        "prompt": "让某个季节性征候被提前、延后或借错地方，导致一整套地方规矩跟着失效。",
        "fits": ["liaozhai-zhiguai", "county-uncanny", "social-dread"],
    },
    "pilgrim-route": {
        "label": "走错路的朝圣",
        "prompt": "让人沿着一条本来服务于贸易、祭祀、探访或巡回工作的路线，误入另一套旧秩序。",
        "fits": ["liaozhai-zhiguai", "county-uncanny", "urban-cold-dread"],
    },
}

SCENE_FRAMES = {
    "social-dread": ["养老院值班室", "培训机构后勤间", "商场后场仓库", "社区食堂后厨", "夜间客服工位"],
    "liaozhai-zhiguai": ["渡口夜路", "借宿老宅", "香火将尽的偏庙", "祠堂后院", "纸扎铺后屋"],
    "county-uncanny": ["温室群深处", "水产养殖塘边", "沿河修车铺", "民宿背后的防空洞", "国道旁的流动摊位"],
    "product-intrusion": ["样品间", "返修仓", "试播间", "夜间售后柜台", "旧货市场临时摊位"],
    "urban-cold-dread": ["夜班医院走廊", "末班地铁换乘口", "商场打烊后的中庭", "老写字楼消防通道", "合租房公共厨房"],
}

TABOO_RULES = {
    "liaozhai-zhiguai": [
        "夜里有人报出全名时，不可回第二声",
        "借来的灯不能照祠堂后墙",
        "渡口边数到第七下水声就必须闭眼",
        "旧纸扎一旦沾了唾沫就不能再烧",
    ],
    "county-uncanny": [
        "流动车在镇上只停单数日，双数日看见也不能买",
        "养殖塘边有人吹口哨时，不能跟着数拍子",
        "夜班交接本若自己翻页，当班的人不能改最后一行",
        "国道边捡来的活物，天亮前不能起名",
    ],
    "social-dread": [
        "夜班表改到第三次，就不能再问上一班去了哪",
        "加班餐里吃到第一根白丝时，不能把名字写进投诉群",
        "当月考勤若被重算两次，当事人不能再碰原始记录",
    ],
    "product-intrusion": [
        "试用样品一旦被人夸过三次，就不能再退回仓库",
        "售后回访里听见自己的声音时，不能继续按确认键",
        "展示机若在断网后还亮着，柜台里的人不能替它关机",
    ],
    "urban-cold-dread": [
        "末班车广播报错站名后，下一站不能下车",
        "公共监控里看见自己迟到的背影，第二天不能走同一扇门",
        "急诊走廊若同时响三次呼叫铃，值班的人不能问姓名",
    ],
}

MECHANISM_LIBRARY = {
    "system-glitch": ["系统", "后台", "数据", "刷新", "标签", "色标", "弹窗", "平台", "界面"],
    "archive-return": ["档案", "旧档", "户籍", "登记", "注销", "台账", "底册", "旧册", "归档"],
    "missing-contact": ["失联", "联系不到", "空号", "没人接", "不回", "打不通"],
    "delivery-loop": ["快递", "包裹", "驿站", "签收", "面单"],
    "mortuary-loop": ["殡仪", "骨灰", "遗体", "火化", "寄存楼"],
}


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


def normalize_meta_list(value) -> list[str]:
    out: list[str] = []
    if isinstance(value, list):
        for item in value:
            if isinstance(item, str):
                parts = [part.strip() for part in item.split(";") if part.strip()]
                out.extend(parts or [item.strip()])
    elif isinstance(value, str):
        out.extend([part.strip() for part in value.split(";") if part.strip()])
    return [item for item in out if item]


def read_recent_meta(limit: int = 6) -> list[dict]:
    records: list[dict] = []
    for meta in sorted(STORY_ROOT.glob("20*/*.meta.json"), reverse=True):
        try:
            records.append(json.loads(meta.read_text(encoding="utf-8")))
        except Exception:
            continue
        if len(records) >= limit:
            break
    return records


def read_recent_styles(limit: int = 5) -> list[str]:
    styles: list[str] = []
    for payload in read_recent_meta(limit * 2):
        style = payload.get("selected_style")
        if isinstance(style, str) and style and style not in styles:
            styles.append(style)
        if len(styles) >= limit:
            break
    return styles


def read_recent_axes(limit: int = 6) -> list[str]:
    axes: list[str] = []
    for payload in read_recent_meta(limit * 2):
        for axis in normalize_meta_list(payload.get("selected_axes", [])):
            if axis not in axes:
                axes.append(axis)
        if len(axes) >= limit:
            break
    return axes[:limit]


def read_recent_axis_details(limit: int = 8) -> list[str]:
    details: list[str] = []
    for payload in read_recent_meta(limit * 2):
        for detail in normalize_meta_list(payload.get("axis_details", [])):
            if detail not in details:
                details.append(detail)
        if len(details) >= limit:
            break
    return details[:limit]


def read_recent_engines(limit: int = 5) -> list[str]:
    engines: list[str] = []
    for payload in read_recent_meta(limit * 2):
        engine = payload.get("story_engine_key")
        if isinstance(engine, str) and engine and engine not in engines:
            engines.append(engine)
        if len(engines) >= limit:
            break
    return engines


def read_recent_scene_frames(limit: int = 5) -> list[str]:
    scenes: list[str] = []
    for payload in read_recent_meta(limit * 2):
        scene = payload.get("scene_frame")
        if isinstance(scene, str) and scene and scene not in scenes:
            scenes.append(scene)
        if len(scenes) >= limit:
            break
    return scenes


def read_recent_job_anchors(limit: int = 5) -> list[str]:
    jobs: list[str] = []
    for payload in read_recent_meta(limit * 2):
        job = payload.get("job_anchor")
        if isinstance(job, str) and job and job not in jobs:
            jobs.append(job)
        if len(jobs) >= limit:
            break
    return jobs


def read_recent_imagery_anchors(limit: int = 6) -> list[str]:
    motifs: list[str] = []
    for payload in read_recent_meta(limit * 2):
        motif = payload.get("imagery_anchor")
        if isinstance(motif, str) and motif and motif not in motifs:
            motifs.append(motif)
        if len(motifs) >= limit:
            break
    return motifs


def detect_banned_mechanisms(limit: int = 3) -> list[str]:
    scores = {key: 0 for key in MECHANISM_LIBRARY}
    recent_files = sorted(STORY_ROOT.glob("20*/*.md"), reverse=True)[:5]
    for story in recent_files:
        try:
            text = story.read_text(encoding="utf-8")
        except Exception:
            continue
        for key, words in MECHANISM_LIBRARY.items():
            scores[key] += sum(text.count(word) for word in words)
    ranked = [key for key, score in sorted(scores.items(), key=lambda item: (-item[1], item[0])) if score > 0]
    return ranked[:limit]


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
        "island", "temple", "library", "water", "river", "mountain",
        "old", "gate", "hall", "harbor", "shore",
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
    forced = os.getenv("DAILY_HORROR_FORCE_STYLE", "").strip()
    if forced in STYLE_LABELS:
        return forced, "手动强制风格路由", read_recent_styles()
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
        reasons.append("种子里有水域、旧物、旧地名或异闻气质")
    elif chosen == "urban-cold-dread":
        reasons.append("题材更适合冷都市、平台、夜班与秩序偏差")

    if chosen in recent:
        reasons.append("最近风格重复不可避免，但仍按种子匹配度优先")
    elif recent:
        reasons.append(f"同时避开最近已连续使用的风格: {', '.join(recent)}")

    return chosen, "；".join(reasons), recent


def choose_opening_mode(style_key: str) -> str:
    modes = {
        "social-dread": "从一次营业、核账、照护、值班、核查或纠纷处理中的小失手切入",
        "liaozhai-zhiguai": "从夜路、旧宅、渡口、祠堂、纸物、香火、借宿或异梦中的一个反常细节切入",
        "county-uncanny": "从县城、小港、国道、水库、集市、小旅馆、养殖场或夜班岗位里的异样遭遇切入",
        "product-intrusion": "从拆封、试用、返修、摆样、调试、收货或直播演示切入，让商品第一次表现出不该有的行为",
        "urban-cold-dread": "从合租房、办公楼、商场后场、地铁口、医院、代驾或夜便利店里的一件失手切入",
    }
    return modes.get(style_key, "从一件普通生活细节中的反常变化切入")


def choose_imagination_axes(style_key: str) -> tuple[list[str], list[str], str]:
    recent_axes = read_recent_axes()
    recent_details = read_recent_axis_details()
    preferred = {
        "social-dread": ["new-jobs", "cosmic-rules", "animals", "plants"],
        "liaozhai-zhiguai": ["animals", "plants", "cosmic-rules", "body-object"],
        "county-uncanny": ["animals", "new-jobs", "plants", "cosmic-rules"],
        "product-intrusion": ["sci-fi-devices", "body-object", "animals", "new-jobs"],
        "urban-cold-dread": ["new-jobs", "sci-fi-devices", "body-object", "plants"],
    }.get(style_key, ["new-jobs", "animals"])

    selected: list[str] = []
    for axis in preferred:
        if axis not in recent_axes and axis not in selected:
            selected.append(axis)
        if len(selected) >= 2:
            break

    for axis in IMAGINATION_AXES:
        if len(selected) >= 3:
            break
        if axis not in selected:
            selected.append(axis)

    random.shuffle(selected)
    selected = selected[: random.choice([2, 3])]
    details = []
    for axis in selected:
        pool = [item for item in IMAGINATION_AXES[axis] if item not in recent_details] or IMAGINATION_AXES[axis]
        details.append(random.choice(pool))
    nonhuman = random.choice(["动物", "植物", "器物", "水", "风", "菌", "地方禁忌", "计数规则"])
    return selected, details, nonhuman


def choose_story_engine(style_key: str, banned_mechanisms: list[str]) -> tuple[str, str]:
    forced = os.getenv("DAILY_HORROR_FORCE_ENGINE", "").strip()
    if forced in STORY_ENGINES:
        return forced, STORY_ENGINES[forced]["prompt"]
    recent_engines = read_recent_engines()
    candidates = []
    for key, payload in STORY_ENGINES.items():
        score = 0
        if style_key in payload["fits"]:
            score += 3
        if key not in recent_engines:
            score += 2
        if "system-glitch" in banned_mechanisms and key in {"cosmic-counting"}:
            score += 1
        if "archive-return" in banned_mechanisms and key in {"animal-contract", "itinerant-wonder", "botanical-takeover"}:
            score += 1
        candidates.append((score, key))
    candidates.sort(reverse=True)
    top = [key for _, key in candidates[:3]] or list(STORY_ENGINES.keys())
    chosen = random.choice(top)
    return chosen, STORY_ENGINES[chosen]["prompt"]


def choose_scene_frame(style_key: str) -> str:
    forced = os.getenv("DAILY_HORROR_FORCE_SCENE", "").strip()
    if forced:
        return forced
    recent = read_recent_scene_frames()
    pool = SCENE_FRAMES.get(style_key, ["夜班岗位"])[:]
    random.shuffle(pool)
    for scene in pool:
        if scene not in recent:
            return scene
    return pool[0]


def choose_taboo_rule(style_key: str) -> str:
    forced = os.getenv("DAILY_HORROR_FORCE_TABOO", "").strip()
    if forced:
        return forced
    pool = TABOO_RULES.get(style_key, ["同样的话不要问第二遍"])
    return random.choice(pool)


def choose_job_anchor(style_key: str) -> str:
    recent = read_recent_job_anchors()
    pool = JOB_ANCHORS.get(style_key, ["夜班工人"])[:]
    random.shuffle(pool)
    for job in pool:
        if job not in recent:
            return job
    return pool[0]


def choose_imagery_anchor(style_key: str) -> str:
    recent = read_recent_imagery_anchors()
    pool = IMAGERY_ANCHORS.get(style_key, ["一块不该发亮的旧玻璃"])[:]
    random.shuffle(pool)
    for motif in pool:
        if motif not in recent:
            return motif
    return pool[0]


def stable_random_nonce(event_title: str, product_title: str) -> int:
    material = f"{event_title}|{product_title}|{random.random()}".encode("utf-8")
    digest = hashlib.sha256(material).hexdigest()
    return int(digest[:8], 16)


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
    banned_mechanisms = detect_banned_mechanisms()
    axes, axis_details, nonhuman = choose_imagination_axes(style_key)
    story_engine_key, story_engine_prompt = choose_story_engine(style_key, banned_mechanisms)
    scene_frame = choose_scene_frame(style_key)
    taboo_rule = choose_taboo_rule(style_key)
    job_anchor = choose_job_anchor(style_key)
    imagery_anchor = choose_imagery_anchor(style_key)
    random_nonce = stable_random_nonce(event_title, product_title)

    payload["picked_style"] = {
        "key": style_key,
        "label": STYLE_LABELS[style_key],
        "reason": style_reason,
    }
    payload["recent_styles"] = recent_styles
    payload["opening_mode"] = choose_opening_mode(style_key)
    payload["style_template"] = STYLE_TEMPLATES.get(style_key, "")
    payload["selected_axes"] = axes
    payload["axis_details"] = axis_details
    payload["nonhuman_pressure"] = nonhuman
    payload["banned_mechanisms"] = banned_mechanisms
    payload["story_engine_key"] = story_engine_key
    payload["story_engine"] = STORY_ENGINES[story_engine_key]["label"]
    payload["story_engine_prompt"] = story_engine_prompt
    payload["scene_frame"] = scene_frame
    payload["taboo_rule"] = taboo_rule
    payload["job_anchor"] = job_anchor
    payload["imagery_anchor"] = imagery_anchor
    payload["style_hard_mode"] = STYLE_HARD_MODES.get(style_key, "")
    payload["random_nonce"] = random_nonce
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
