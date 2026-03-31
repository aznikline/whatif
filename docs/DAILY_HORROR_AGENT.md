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

## Sources
- Google News RSS for current events
- GitHub Trending for hot product-like software topics

## Schedule
- default local run time: 09:10 Asia/Shanghai via launchd
