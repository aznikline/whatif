#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/wizout/op/openclaw"
TODAY="${STORY_DATE_OVERRIDE:-$(date +%F)}"
YEAR="${TODAY%%-*}"
HARD_TIMEOUT="${DAILY_HORROR_HARD_TIMEOUT:-150}"
STORY_DIR="$ROOT/products/daily-horror/$YEAR"
RUN_DIR="$ROOT/products/daily-horror/.runs/$TODAY"
OUT_FILE="$STORY_DIR/$TODAY.md"
META_FILE="$STORY_DIR/$TODAY.meta.json"
SEED_FILE="$RUN_DIR/seeds.json"
RAW_FILE="$RUN_DIR/draft.raw.json"
MODEL_META_FILE="$RUN_DIR/draft.meta.json"
TEXT_FILE="$RUN_DIR/draft.txt"
POLISHED_FILE="$RUN_DIR/polished.txt"
HOOK_REPORT="$RUN_DIR/opening.check.json"
PROMPT_PRIMARY="$RUN_DIR/prompt.primary.txt"
PROMPT_FALLBACK="$RUN_DIR/prompt.fallback.txt"
PROMPT_POLISH="$RUN_DIR/prompt.polish.txt"
PROMPT_OPENING="$RUN_DIR/prompt.opening.txt"
PROMPT_DERUTIFY="$RUN_DIR/prompt.derutify.txt"
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
style_template="$(jq -r '.style_template // empty' "$SEED_FILE")"
selected_axes="$(jq -r '.selected_axes[]? // empty' "$SEED_FILE" | paste -sd '; ' -)"
axis_details="$(jq -r '.axis_details[]? // empty' "$SEED_FILE" | paste -sd '; ' -)"
nonhuman_pressure="$(jq -r '.nonhuman_pressure // empty' "$SEED_FILE")"
banned_mechanisms="$(jq -r '.banned_mechanisms[]? // empty' "$SEED_FILE" | paste -sd '; ' -)"
story_engine_key="$(jq -r '.story_engine_key // empty' "$SEED_FILE")"
story_engine="$(jq -r '.story_engine // empty' "$SEED_FILE")"
story_engine_prompt="$(jq -r '.story_engine_prompt // empty' "$SEED_FILE")"
random_nonce="$(jq -r '.random_nonce // empty' "$SEED_FILE")"
recent_titles="$(
  find "$ROOT/products/daily-horror" -maxdepth 2 -name '*.md' -type f 2>/dev/null |
    sort |
    tail -n 5 |
    while read -r f; do head -n 1 "$f"; done |
    sed '/^$/d' |
    paste -sd ';' -
)"

SEED_NUM="${DAILY_HORROR_SEED:-$random_nonce}"
TEMPERATURE="$(python3 - <<PY
import random
random.seed(int("$SEED_NUM"))
print(f"{random.uniform(0.93, 1.08):.2f}")
PY
)"
TOP_P="$(python3 - <<PY
import random
random.seed(int("$SEED_NUM") + 17)
print(f"{random.uniform(0.86, 0.95):.2f}")
PY
)"

cat > "$PROMPT_PRIMARY" <<EOF
你现在不是在扮演某个现成 agent，也不是在走 OpenClaw 工作流。你就是这篇中文惊悚短篇的直接作者。

目标只有一个：写出一篇真正有风格、不是模板化、不是平均值的中文惊悚短篇。它应当像严肃文学和志怪小说在当代县镇、街区、职业现场里相撞出来的东西。

硬要求：
1. 直接输出完整故事正文。
2. 第一行必须是纯标题，不要加 markdown 星号。
3. 1500-2600 字。
4. 禁止解释创作思路、禁止提纲、禁止代码块。
5. 开头前 180-220 字内必须出现异常信号。
6. 禁止写成“系统故障、失联名单、旧档回流、颜色标签、数据库多出一人”那种旧骨架，除非只占极小背景。

这次的写作参数：
- 风格谱系：$picked_style_label
- 风格原因：$picked_style_reason
- 开头动作模型：$opening_mode
- 风格模板：$style_template
- 故事引擎：${story_engine}（${story_engine_prompt}）
- 强制想象轴：$selected_axes
- 必须显式写进正文、且成为主骨架支点的陌生元素：$axis_details
- 非人压力源：$nonhuman_pressure
- 禁止复用的近期机制：$banned_mechanisms
- 随机扰动号：${SEED_NUM}（不要在正文显式写出这个数字）

写法要求：
- 不要再写成旧题材的变体。让动物、植物、新职业、身体/物件变形、科幻装置或古怪宇宙规则真正进入主骨架。
- 不要只写“异常发生了”，而要写一个人具体怎么工作、怎么吃饭、怎么走夜路、怎么闻到味、怎么手上沾东西、怎么被人敷衍过去。
- 允许大胆，但不能乱。离奇必须附着在地方规矩、行业手艺、地形、水路、养殖、摊贩、照护、修补、迁徙、祭祀、交换、计数这些现实支点上。
- 如果第一反应是把产品种子写成包裹、驿站、扫码枪、快递单、系统面板，就强制放弃第一反应，改写第二种更陌生但更具体的落点。
- 要有文学性，但别飘。句子要有压迫感、气味、材质、温度、重量。
- 可以吸收这些高层优点：普通人卷入巨大而陌生的规则；黑色幽默一点点；世界观不说破；最后一句有寒意。
- 不要照搬任何在世作者的句法和口吻。

开头规则：
- 从正在发生的动作切入，不要先空写天气。
- 第一段最好让读者立刻看见一种不该发生的小事。
- 第一段到第三段之间，必须让故事的陌生支点冒头一次。

今天的种子：
- 事件：$picked_event
- 产品：$picked_product
- 其他新闻：$news_titles
- 其他产品：$product_titles

热点使用规则：
- 热点只是灵感火种，不是新闻改写。
- 如果事件太大，就把它缩成镇上传闻、行业消息、沿街议论、直播间口播、夜班人听来的话。
- 如果产品太技术，就把它落回一个可摸到的载体：设备、样品、替身账号、家庭用品、维修件、训练器、摊位货、药、玩具。

最后自检：
- 删掉显眼的数字机关和太整齐的回环。
- 删掉像“模型在补设定”的说明段。
- 如果一段只是解释背景，不如改成动作、物件、对话、声音或传闻。
EOF

cat > "$PROMPT_FALLBACK" <<EOF
写一篇 1500-2400 字的中文惊悚短篇小说，直接输出故事正文。

约束：
- 标题单独占第一行，不要加 markdown 星号
- 200 字内必须出现异常钩子
- 不要再围绕这些旧骨架打转：$banned_mechanisms
- 本次必须真的使用这些陌生轴：$selected_axes
- 正文里必须显式出现并推动情节的陌生支点：$axis_details
- 本次故事引擎是：${story_engine}（${story_engine_prompt}）
- 本次非人压力源：$nonhuman_pressure
- 本次参考的现实火种：$picked_event / $picked_product
- 开头动作模型：$opening_mode
- 近期标题禁复用：$recent_titles

要求：
- 普通人主角
- 地方感强
- 大胆但有理路
- 结尾最后一句发冷
- 不要解释创作思路
EOF

generate_once() {
  local prompt_file="$1"
  local out_text="$2"
  local out_raw="$3"
  local out_meta="$4"

  python3 "$ROOT/ops/story/generate_story_direct.py" \
    --prompt-file "$prompt_file" \
    --output-file "$out_text" \
    --raw-file "$out_raw" \
    --meta-file "$out_meta" \
    --timeout "$HARD_TIMEOUT" \
    --seed "$SEED_NUM" \
    --temperature "$TEMPERATURE" \
    --top-p "$TOP_P"
}

if ! generate_once "$PROMPT_PRIMARY" "$TEXT_FILE" "$RAW_FILE" "$MODEL_META_FILE"; then
  if ! generate_once "$PROMPT_FALLBACK" "$TEXT_FILE" "$RAW_FILE" "$MODEL_META_FILE"; then
    echo "daily-horror produced empty output" >&2
    exit 1
  fi
fi

cat > "$PROMPT_POLISH" <<EOF
你是一位非常严格的中文惊悚小说编辑。只做语言和局部结构修订，不换题，不换人物，不换核心设定。

目标：
1. 删掉刻意、工整、太像作者在摆机关的句子。
2. 把过于像模板的段落打散，换成更具体的动作、材质、气味、职业细节。
3. 保留故事离奇性，但把现实支点补稳。
4. 不要让故事滑回这些近期旧骨架：$banned_mechanisms
5. 让这次的故事引擎更清楚：${story_engine}（${story_engine_prompt}）
6. 如果故事偷懒回到“包裹、扫码、驿站、后台、名册”这类显眼近路，就把它改去更陌生的职业现场或地方规矩里

硬规则：
- 标题不改
- 人名、地点、主事件、结尾方向不改
- 不要加解释段
- 不要把故事改回“系统异常/档案回流”套路
- 只输出润稿后的完整正文

原稿如下：
$(cat "$TEXT_FILE")
EOF

generate_once "$PROMPT_POLISH" "$POLISHED_FILE" "$RUN_DIR/polish.raw.json" "$RUN_DIR/polish.meta.json" || true
if [[ -s "$POLISHED_FILE" ]]; then
  cp "$POLISHED_FILE" "$TEXT_FILE"
fi

cat > "$PROMPT_DERUTIFY" <<EOF
你现在做一次“反套路审查重写”。目标不是润色，而是找出这篇故事里仍然像通用对话模型平均输出的地方，并把它们改掉。

必须做的事：
1. 如果故事还在靠这些旧套路支撑：${banned_mechanisms}，就把它们削弱到次要位置或换成别的机制。
2. 强化这次真正该有的陌生骨架：${story_engine}（${story_engine_prompt}）
3. 让这些元素更早、更深地进入主骨架：$axis_details
4. 让非人压力源 $nonhuman_pressure 真正推动情节，而不是只出现一次
5. 把过于说明式的世界观解释改成传闻、动作、行话、物件细节

不要：
- 不要改标题
- 不要改人物姓名和地点
- 不要重写成另一篇
- 不要变成晦涩实验文本

只输出修改后的完整正文。

原稿如下：
$(cat "$TEXT_FILE")
EOF

generate_once "$PROMPT_DERUTIFY" "$RUN_DIR/derutify.txt" "$RUN_DIR/derutify.raw.json" "$RUN_DIR/derutify.meta.json" || true
if [[ -s "$RUN_DIR/derutify.txt" ]]; then
  cp "$RUN_DIR/derutify.txt" "$TEXT_FILE"
fi

python3 "$ROOT/ops/story/check_opening.py" "$TEXT_FILE" > "$HOOK_REPORT" || true
if [[ "$(jq -r '.should_rewrite // false' "$HOOK_REPORT" 2>/dev/null)" == "true" ]]; then
  cat > "$PROMPT_OPENING" <<EOF
你是一位中文惊悚小说编辑。下面这篇故事的开头不够抓人。保留标题、人物、地点、主事件和结尾方向，只重写前 3-5 段。

要求：
- 前 180-220 字内出现清晰异常
- 从具体动作切入
- 让故事引擎更早冒头：${story_engine}（${story_engine_prompt}）
- 让陌生轴更早冒头：$axis_details
- 不要写成旧套路：$banned_mechanisms
- 直接输出修改后的完整正文

原稿如下：
$(cat "$TEXT_FILE")
EOF
  generate_once "$PROMPT_OPENING" "$RUN_DIR/opening.txt" "$RUN_DIR/opening.raw.json" "$RUN_DIR/opening.meta.json" || true
  if [[ -s "$RUN_DIR/opening.txt" ]]; then
    cp "$RUN_DIR/opening.txt" "$TEXT_FILE"
  fi
  python3 "$ROOT/ops/story/check_opening.py" "$TEXT_FILE" > "$HOOK_REPORT" || true
fi

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
seed["generator"] = "daily-horror-direct"
seed["selected_axes"] = [x for x in """$selected_axes""".split("; ") if x]
seed["axis_details"] = [x for x in """$axis_details""".split("; ") if x]
seed["nonhuman_pressure"] = "$nonhuman_pressure"
seed["banned_mechanisms"] = [x for x in """$banned_mechanisms""".split("; ") if x]
seed["story_engine_key"] = "$story_engine_key"
seed["story_engine"] = "$story_engine"
seed["story_engine_prompt"] = "$story_engine_prompt"
seed["random_nonce"] = "$random_nonce"
seed["generation_seed"] = "$SEED_NUM"
seed["temperature"] = "$TEMPERATURE"
seed["top_p"] = "$TOP_P"
try:
    seed["opening_check"] = json.loads(Path("$HOOK_REPORT").read_text(encoding="utf-8"))
except Exception:
    seed["opening_check"] = {}
try:
    seed["model_run"] = json.loads(Path("$MODEL_META_FILE").read_text(encoding="utf-8"))
except Exception:
    seed["model_run"] = {}
Path("$META_FILE").write_text(json.dumps(seed, ensure_ascii=False, indent=2), encoding="utf-8")
PY

python3 "$ROOT/ops/story/update_story_index.py"

git -C "$ROOT" add -f \
  "$OUT_FILE" \
  "$META_FILE" \
  "$ROOT/products/daily-horror/README.md" \
  "$ROOT/ops/bin/daily-horror-story.sh" \
  "$ROOT/ops/story/fetch_hot_seeds.py" \
  "$ROOT/ops/story/generate_story_direct.py" \
  "$ROOT/products/daily-horror/AGENT_SOUL.md" \
  "$ROOT/docs/DAILY_HORROR_AGENT.md"

if ! git -C "$ROOT" diff --cached --quiet; then
  git -C "$ROOT" commit -m "refactor: run daily horror generation directly"
  git -C "$ROOT" push origin master
fi

echo "$OUT_FILE"
