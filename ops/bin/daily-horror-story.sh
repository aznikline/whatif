#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/wizout/op/openclaw"
STATE_DIR="$ROOT/.openclaw-state"
CONFIG_PATH="$STATE_DIR/openclaw.json"
TODAY="${STORY_DATE_OVERRIDE:-$(date +%F)}"
YEAR="${TODAY%%-*}"
HARD_TIMEOUT="${DAILY_HORROR_HARD_TIMEOUT:-150}"
STORY_DIR="$ROOT/products/daily-horror/$YEAR"
RUN_DIR="$ROOT/products/daily-horror/.runs/$TODAY"
OUT_FILE="$STORY_DIR/$TODAY.md"
META_FILE="$STORY_DIR/$TODAY.meta.json"
RAW_FILE="$RUN_DIR/agent.raw"
JSON_FILE="$RUN_DIR/agent.json"
TEXT_FILE="$RUN_DIR/agent.txt"
POLISHED_FILE="$RUN_DIR/agent.polished.txt"
SEED_FILE="$RUN_DIR/seeds.json"
SOUL_SOURCE="$ROOT/products/daily-horror/AGENT_SOUL.md"
SOUL_TARGET="$ROOT/.openclaw-state/workspaces/daily-horror/SOUL.md"

mkdir -p "$STORY_DIR" "$RUN_DIR"

if [[ -f "$SOUL_SOURCE" ]]; then
  mkdir -p "$(dirname "$SOUL_TARGET")"
  cp "$SOUL_SOURCE" "$SOUL_TARGET"
fi

if [[ -f "$OUT_FILE" ]]; then
  echo "story already exists: $OUT_FILE"
  exit 0
fi

python3 "$ROOT/ops/story/fetch_hot_seeds.py" > "$SEED_FILE"

picked_event="$(jq -r '.picked_event.title // empty' "$SEED_FILE")"
picked_product="$(jq -r '.picked_product.title // empty' "$SEED_FILE")"
picked_style_key="$(jq -r '.picked_style.key // empty' "$SEED_FILE")"
picked_style_label="$(jq -r '.picked_style.label // empty' "$SEED_FILE")"
picked_style_reason="$(jq -r '.picked_style.reason // empty' "$SEED_FILE")"
opening_mode="$(jq -r '.opening_mode // empty' "$SEED_FILE")"
recent_styles="$(jq -r '.recent_styles[]? // empty' "$SEED_FILE" | paste -sd '; ' -)"
news_titles="$(jq -r '.news[:3][]?.title' "$SEED_FILE" | paste -sd '; ' -)"
product_titles="$(jq -r '.products[:3][]?.title' "$SEED_FILE" | paste -sd '; ' -)"
recent_titles="$(
  find "$ROOT/products/daily-horror" -maxdepth 2 -name '*.md' -type f 2>/dev/null |
    sort |
    tail -n 5 |
    while read -r f; do head -n 1 "$f"; done |
    sed '/^$/d' |
    paste -sd ';' -
)"

prompt_primary=$(cat <<EOF
你是一位擅长中文惊悚短篇的小说作家。请直接写一篇完整中文短篇惊悚小说。

写作铁律：
1. 氛围第一，但开头必须有钩子；恐怖来自积累，不等于前面没有抓力。
2. 主角必须是普通人，有真实弱点和琐碎烦恼。
3. 故事发生在一个有名字的小镇或封闭社区，让地点成为角色。
4. 用大量感官细节、内心自辩、接地气对话和少量黑色幽默。
5. 恐怖处在超自然与现实交界，不要解释干净。
6. 结尾不要恢复平静，最后一句要留下寒意。

自然性约束：
- 恐怖细节必须先像生活，再像机关。
- 价格、数字、日期、门牌、次数、库存等必须自然，不能为了诡异而刻意写成连号、对仗或一眼看出“作者设计感很重”的样子。
- 如果某个数字、物件或句子后面会变得可怕，前面必须先自然出现，让它先像生活细节。
- 主角应先尝试用普通解释自圆其说，不要一上来就像知道自己在恐怖小说里。
- 不要写那种“读者一眼就觉得作者在用力摆机关”的句子。

志怪要求：
- 如果采用聊斋式志怪或乡镇怪谈，离奇必须长在地方逻辑里：禁忌、旧物来源、渡口夜路、庙口闲话、旧册子残句、行业经验、家族规矩。
- 志怪可以不说明白，但现实层面的因果和地方人情必须成立。
- 让怪异通过人的回避、旧记录、口耳相传、职业经验慢慢显影，而不是直接宣布“有鬼”。

风格选择：
- 不要固定成单一“斯蒂芬·金式”。
- 先根据今天的种子自动判断更适合的叙事谱系，再开始写：
  1. 现代社会惊悚
  2. 聊斋式志怪
  3. 乡镇怪谈
  4. 商品异化恐怖
  5. 都市冷感惊悚
- 可以混合两种谱系，但要保持统一，不要写成拼盘。
- 今天优先风格：$picked_style_label
- 选择原因：$picked_style_reason
- 最近已用风格：$recent_styles

结构节奏：
- 开篇约250-350字：立刻给出异常、危险传闻、违和物件或失手事件，让人想继续读
- 发展约800字：异常升级，找到旧事线索
- 高潮约400字：面对恐怖核心
- 余波约200字：幸存但代价留下

输出要求：
- 直接输出故事正文
- 第一行必须是标题
- 使用第三人称有限视角，可少量第一人称内心独白
- 字数 1500-2500
- 不要提纲，不要解释，不要代码块

今天的热点线索：
- 事件候选：$picked_event
- 产品候选：$picked_product
- 其他新闻标题：$news_titles
- 其他产品标题：$product_titles

使用规则：
- 只把热点当作灵感种子，不要写成新闻改写
- 可以把热点事件转成小镇流言、直播事故、社区恐慌、旧商业街传闻
- 可以把热门产品转成道具、玩具、直播设备、应用、智能硬件或廉价促销品
- 不要直接复用近期标题：$recent_titles
- 开头切入方式优先用这个动作模型：$opening_mode
- 如果种子更像志怪材料，就允许写出聊斋气、因果感、夜路感、纸扎感、祠堂或渡口气息
- 如果种子更像产品或互联网材料，就优先写商品如何侵入生活、关系和身体
- 不要每篇都从“主角回到出租屋”开始，要主动变化开头动作和场景
- 开头最好从一个正在发生的动作开始，而不是先写大段天气和街景
- 输出前默默自检一次：删掉显得刻意、工整、用力过猛的恐怖设计，换成更生活化但更不安的细节

默认优先把“热点事件 + 热门产品”揉成一个恐怖种子。
EOF
)

prompt_fallback=$(cat <<EOF
写一篇 1500-2200 字的中文惊悚短篇小说，直接输出故事正文。

强制种子：
- 热点事件：$picked_event
- 热门产品：$picked_product

要求：
- 第一行必须是中文标题
- 开头 200 字内必须出现异常钩子
- 场景可在小镇、旧社区、县城、都市边缘、夜班场所之间变化
- 普通人主角
- 缓慢积累的恐怖
- 风格可参考现代社会惊悚、聊斋式志怪、乡镇怪谈、商品异化恐怖，但不要写成模仿秀
- 数字、价格、门牌、日期、库存等必须自然，不要刻意设计成显眼机关
- 志怪要建立在地方禁忌、旧物来源、夜路水路、口耳相传上，不要只靠空泛氛围词
- 不要解释，不要提纲
- 结尾最后一句必须发冷
- 不要复用近期标题：$recent_titles
EOF
)

prompt_polish() {
  cat <<EOF
你是一位非常严格的中文惊悚小说编辑。请对下面这篇短篇做一次“保留故事骨架、只修表达和局部细节”的润稿。

你的目标只有四个：
1. 删掉所有显得刻意、工整、太像作者在摆机关的句子或细节。
2. 让开头更抓人，但不要换题材，不要重写成另一篇。
3. 让志怪和怪谈部分更像从地方禁忌、旧档案、口耳相传、现实办事逻辑里长出来。
4. 保持现代中文可读性，保留原有标题、人物、地点、主事件和结尾方向。

硬规则：
- 不要改变标题
- 不要改变主角姓名、地点名、核心设定、结尾方向
- 不要新增大段设定，不要发明另一套世界观
- 可以删改句子、替换细节、重写开头几段、压缩用力过猛的段落
- 如果遇到明显刻意的数字、价格、日期、门牌、库存、对仗数字设计，把它改得更自然
- 如果某段太像说明书或背景介绍，把它改成动作、对话、物件、气味、光线或人的反应
- 如果某个离奇点没有现实支点，就补一个小支点：旧记录、街坊回避、职业经验、庙口闲话、档案残页、地契、旧规矩
- 只输出润稿后的完整故事正文

下面是待润稿的故事：
$(cat "$TEXT_FILE")
EOF
}

run_agent_once() {
  local prompt="$1"
  local raw_file="$2"
  local pid=""
  local watcher=""
  local status=0

  (
    OPENCLAW_STATE_DIR="$STATE_DIR" OPENCLAW_CONFIG_PATH="$CONFIG_PATH" \
      openclaw agent --local --agent daily-horror --message "$prompt" --json --timeout 120
  ) > "$raw_file" 2>&1 &
  pid=$!

  (
    sleep "$HARD_TIMEOUT"
    kill -TERM "$pid" 2>/dev/null || true
  ) &
  watcher=$!

  wait "$pid" || status=$?
  kill -TERM "$watcher" 2>/dev/null || true
  wait "$watcher" 2>/dev/null || true
  return "$status"
}

extract_text() {
  sed -n '/^{/,$p' "$RAW_FILE" > "$JSON_FILE"
  jq -r '.payloads[0].text // empty' "$JSON_FILE" > "$TEXT_FILE"
  [[ -s "$TEXT_FILE" ]]
}

run_polish_pass() {
  local raw_file="$RUN_DIR/agent.polish.raw"
  local json_file="$RUN_DIR/agent.polish.json"
  local text_file="$RUN_DIR/agent.polish.txt"
  local prompt=""

  prompt="$(prompt_polish)"
  if ! run_agent_once "$prompt" "$raw_file"; then
    return 1
  fi
  sed -n '/^{/,$p' "$raw_file" > "$json_file"
  jq -r '.payloads[0].text // empty' "$json_file" > "$text_file"
  [[ -s "$text_file" ]] || return 1
  cp "$text_file" "$POLISHED_FILE"
  cp "$text_file" "$TEXT_FILE"
}

if ! run_agent_once "$prompt_primary" "$RAW_FILE" || ! extract_text; then
  mv "$RAW_FILE" "$RUN_DIR/agent.primary.raw" 2>/dev/null || true
  mv "$JSON_FILE" "$RUN_DIR/agent.primary.json" 2>/dev/null || true
  mv "$TEXT_FILE" "$RUN_DIR/agent.primary.txt" 2>/dev/null || true
  if ! run_agent_once "$prompt_fallback" "$RAW_FILE" || ! extract_text; then
    echo "daily-horror produced empty output" >&2
    exit 1
  fi
fi

run_polish_pass || true

cp "$TEXT_FILE" "$OUT_FILE"
python3 - <<PY
import json
from pathlib import Path

seed = json.loads(Path("$SEED_FILE").read_text(encoding="utf-8"))
seed["selected_style"] = "$picked_style_label"
seed["selected_style_key"] = "$picked_style_key"
seed["style_reason"] = "$picked_style_reason"
seed["opening_mode"] = "$opening_mode"
seed["story_date"] = "$TODAY"
seed["generator"] = "daily-horror"
seed["polish_pass"] = True
Path("$META_FILE").write_text(json.dumps(seed, ensure_ascii=False, indent=2), encoding="utf-8")
PY
python3 "$ROOT/ops/story/update_story_index.py"

git -C "$ROOT" add "$OUT_FILE" "$META_FILE" "$ROOT/products/daily-horror/README.md"
if ! git -C "$ROOT" diff --cached --quiet; then
  git -C "$ROOT" commit -m "story: daily horror for $TODAY"
  git -C "$ROOT" push origin master
fi

echo "$OUT_FILE"
