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
  - cosmic dread / Lovecraft-adjacent unknowability
- horror details should feel lived-in before they feel symbolic
- Liaozhai-inspired modes should grow from taboo, rumor, lineage, water routes, temples, trades, and old records rather than random spooky ornament
- cosmic-dread modes should emphasize scale mismatch, failed naming, measurement drift, and partial perception rather than stock tentacles or lore dumping
- avoid conspicuous numeric symbolism or over-designed coincidences unless they are naturally motivated and paid off

## Generation Mechanics
- one current event seed and one product seed are fetched first
- the system scores them into a preferred style family
- each style family carries its own opening template so the first paragraphs do not collapse into one generic voice
- the pipeline now also selects a random `story engine` and a random `generation seed` to break deterministic fallback into the same old skeleton
- the seed router now also selects a concrete `scene_frame` and one `taboo_rule`; both are hard constraints in the prompt, not optional flavor text
- the router now also selects a concrete `job_anchor` and `imagery_anchor`; this is meant to prevent generic narrators and forgettable visual texture
- recent stories are scanned for overused mechanisms; the top repeated mechanisms become a blacklist for the next run
- recent styles are read from prior `.meta.json` files to avoid repeating the same voice
- recent scene frames are also tracked so the next run avoids repeating the same main workplace / route / room when possible
- recent job anchors and imagery anchors are also tracked to prevent back-to-back reuse of the same occupation and same sensory hook
- each story stores `selected_style`, `style_reason`, `opening_mode`, `story_engine`, `scene_frame`, `taboo_rule`, `job_anchor`, `imagery_anchor`, `selected_axes`, `banned_mechanisms`, and the generation seed in metadata
- the runtime script syncs `products/daily-horror/AGENT_SOUL.md` into the live workspace before generation
- prompts now include a plausibility guard to suppress heavy-handed prices, numbers, and contrived symbolic setups
- generation no longer depends on `openclaw agent`; the script calls the model directly and falls back locally if needed
- after the first draft, the pipeline runs an editorial pass and then a dedicated de-rut pass to remove generic model habits
- after polishing, an opening checker scores the first section; if the hook is too weak, the pipeline rewrites the opening once
- the SOUL now explicitly bans consecutive reuse of the same main job, main scene, or stale mechanism cluster
- Liaozhai-style branches must carry a concrete local taboo or route rule; cosmic-rule branches must produce an actionable rule with a visible cost, not abstract lore
- Lovecraft-adjacent branches are treated as a craft constraint, not a monster skin:
  - the unknown should be approached through effects and side channels
  - the text should avoid generic “unknowable” filler
  - the protagonist should confront a reality larger than human categories while still trapped in ordinary labor
- `fetch_hot_seeds.py` supports forced canary routing through env vars such as `DAILY_HORROR_FORCE_STYLE`, `DAILY_HORROR_FORCE_ENGINE`, `DAILY_HORROR_FORCE_SCENE`, and `DAILY_HORROR_FORCE_TABOO`

## Sources
- Google News RSS for current events
- GitHub Trending for hot product-like software topics

## Schedule
- default local run time: 09:10 Asia/Shanghai via launchd
