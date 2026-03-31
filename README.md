# WhatIf Studio

一个用正规 monorepo 方式管理的内容与叙事产品仓库。

当前对外项目统一放在 `products/`，内部工具和生产流水线放在 `projects/` 与 `ops/`。

## Products

### 1. 改命剧场

互动叙事试玩项目，当前仍是 MVP，但已经按正式产品目录管理。

- 路径：[`products/gaiming-juchang`](products/gaiming-juchang)
- 入口：[`products/gaiming-juchang/index.html`](products/gaiming-juchang/index.html)
- GitHub Pages 发布目录：`products/gaiming-juchang`

### 2. Douyin 8D Nordic Pipeline

短视频内容生产流水线项目，负责音频候选发现、8D 处理、画面合成和审核入队。

- 路径：[`products/douyin-8d-nordic-pipeline`](products/douyin-8d-nordic-pipeline)
- 说明：[`products/douyin-8d-nordic-pipeline/README.md`](products/douyin-8d-nordic-pipeline/README.md)
- 运行手册：[`products/douyin-8d-nordic-pipeline/runbook.md`](products/douyin-8d-nordic-pipeline/runbook.md)

### 3. Daily Horror

一个基于当天热点事件与热门产品种子，自动生成惊悚短篇并推送到 GitHub 的内容项目。

- 路径：[`products/daily-horror`](products/daily-horror)
- 索引：[`products/daily-horror/README.md`](products/daily-horror/README.md)
- 今日样例：[`products/daily-horror/2026/2026-03-31.md`](products/daily-horror/2026/2026-03-31.md)

## Internal Projects

这些不是对外产品，而是内部生产工具或工作流。

- `projects/autopaper`: idea-to-paper 论文生产链
- `projects/cs146s-study`: CS146S 系统性学习笔记与课程拆解
- `ops/`: 自动化脚本、launchd、运维工具
- `memory/`: 持久化记忆文件与索引源

## Repository Layout

```text
products/
  gaiming-juchang/
  douyin-8d-nordic-pipeline/
  daily-horror/
projects/
  autopaper/
  cs146s-study/
ops/
docs/
memory/
```

## Version Control Rule

- 对外项目统一进 `products/`
- 内部工具统一进 `projects/` 或 `ops/`
- 默认走 monorepo 主线管理，不用“每个项目一个长期分支”来充当目录结构
- 需要独立发布节奏时，靠产品目录、标签和自动化区分，不靠混乱的根目录命名

## Current Repository Naming

仓库当前 GitHub slug 还是旧名字 `whatif`。仓库内部命名已经切到 `WhatIf Studio`。

如果要把 GitHub 远端 slug 也改掉，建议改成：

- `whatif-studio`

这一步需要在 GitHub 仓库设置页执行真实改名，然后再更新本地 `origin`。
