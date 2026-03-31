# Daily Horror Agent

## Purpose
- fetch one current event seed and one current product seed each day
- generate one Chinese horror short story
- save it under `products/daily-horror/YYYY/YYYY-MM-DD.md`
- commit and push only the generated story files to GitHub
- bias generation toward stronger hooks in the opening paragraph
- rotate among multiple Chinese-friendly horror modes instead of one fixed voice

## Entry Points
- manual run: `/Users/wizout/op/openclaw/ops/bin/daily-horror-story.sh`
- launchd install: `/Users/wizout/op/openclaw/ops/bin/install-daily-horror.sh`
- runtime SOUL source of truth: `products/daily-horror/AGENT_SOUL.md`
- runtime SOUL sync helper: `products/daily-horror/sync_runtime_soul.sh`

## Output
- story markdown: `products/daily-horror/YYYY/YYYY-MM-DD.md`
- metadata: `products/daily-horror/YYYY/YYYY-MM-DD.meta.json`
- index: `products/daily-horror/README.md`

## Writing Direction
- opening should establish anomaly or danger quickly
- style is not locked to a single Stephen King-like mode
- acceptable modes now include:
  - modern social horror
  - Liaozhai-inspired zhiguai
  - county-town / small-city uncanny tales
  - product-object / gadget intrusion horror
  - cold urban dread
- horror details should feel lived-in before they feel symbolic
- Liaozhai-inspired modes should grow from taboo, rumor, lineage, water routes, temples, trades, and old records rather than random spooky ornament
- avoid conspicuous numeric symbolism or over-designed coincidences unless they are naturally motivated and paid off

## Generation Mechanics
- one current event seed and one product seed are fetched first
- the system scores them into a preferred style family
- recent styles are read from prior `.meta.json` files to avoid repeating the same voice
- each story stores `selected_style`, `style_reason`, and `opening_mode` in metadata
- the runtime script syncs `products/daily-horror/AGENT_SOUL.md` into the live workspace before generation
- prompts now include a plausibility guard to suppress heavy-handed prices, numbers, and contrived symbolic setups
- after the first draft, the pipeline runs a second editorial pass to sand down contrived gimmicks and strengthen lived-in detail

## Sources
- Google News RSS for current events
- GitHub Trending for hot product-like software topics

## Schedule
- default local run time: 09:10 Asia/Shanghai via launchd
