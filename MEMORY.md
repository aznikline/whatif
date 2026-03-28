# MEMORY.md

这是当前工作区的长期记忆总册，只保留值得长期保留的事实、决策和偏好。

## 系统决策

- 2026-03-18：本地持久化记忆系统已落地，采用三层结构：
  - `memory/YYYY-MM-DD.md` 记录原始日记和过程性笔记
  - `memory/library/**/*.md` 记录结构化长期记忆
  - `memory/store/memory.db` 与 `memory/store/vector.db` 提供持久化检索
- 2026-03-24：记忆系统瘦身为“原始日志保真 + 近期提炼 + 长期核心”三段式，主动召回默认只保留 `MEMORY.md`、`memory/recent/*.md`、`memory/library/**/*.md`，原始日记、卡片和时间线继续保真留档但不再作为主动召回主源。
- 2026-03-24：项目态记忆后端切到 QMD/LanceDB 组合，`memory.qmd.includeDefaultMemory=false`，显式路径由 `MEMORY.md`、`memory/recent`、`memory/library` 组成，减少重复索引和 token 浪费。

## 运行约定

- 新记忆优先先落到文件，再入库。
- 重要决策、偏好、事故复盘应写入 `memory/library/` 或本文件。
- 检索优先使用本地 CLI：`python3 ops/memory/memory_cli.py search "<query>"`
- 主动召回优先查 `MEMORY.md` 和 `memory/recent/`，只在需要追溯原始过程时才回看 `memory/YYYY-MM-DD.md`、`memory/cards/`、`memory/timeline/`。
