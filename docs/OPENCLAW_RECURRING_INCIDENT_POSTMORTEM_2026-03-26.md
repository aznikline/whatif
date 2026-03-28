# OpenClaw 反复故障复盘

日期：2026-03-26

## 结论

这不是一个单点故障，而是 5 类问题叠加后形成的“反复复发”：

1. `main` 前台会话长期复用，被测试、heartbeat、memory flush、失败回退污染
2. 主模型与 fallback 链路反复切换，行为不稳定
3. 全局 runtime 被临时补丁修改，行为与仓库内配置开始分叉
4. workspace 内脚本调用默认用了相对路径，导致 agent 在错误 cwd 下误判系统状态
5. harness 本身也会把 gateway / session lock 噪音误当成 agent 退化，评测信号失真

真正让问题“反复出现”的根因，不是模型差，而是：

`前台主链路缺少稳定边界，配置、会话、运行时和评测层都在共享同一条易污染路径。`

## 现象回顾

反复出现的症状主要有：

- 飞书里偶发完全无回复
- 有时只显示 typing，不出正文
- 有时回复跑偏，去做心跳/巡检/记忆搜索而不是回答用户
- 同一个问题昨天能回，今天又不回
- 本地 canary 偶尔通过，但真实飞书又失败

## 证据与时间线

### 1. 2026-03-24：主会话污染 + 模型链路不稳

已知证据：

- `main` 长会话复用，复杂任务进入 compaction、长锁和 timeout
- `gpt-5.4` 作为主模型时经常超时或 quota/rate-limit
- `stepfun/step-3.5-flash:free` 偶发 reasoning-only，无正文

### 2. 2026-03-25：runtime 被补丁修到“可回”，但仍不稳定

已做过的补丁包括：

- fallback 保留原始用户消息
- CLI 在 gateway timeout 后 fallback embedded 时换独立 session
- reasoning-only 时继续 fallback 或从 reasoning 中救回短答案

这些补丁提高了成功率，但也带来一个新的系统事实：

- 行为已经不只由仓库里的 `.openclaw-state/openclaw.json` 决定
- 还取决于 `/opt/homebrew/lib/node_modules/openclaw/dist/` 下的全局 runtime 当前是什么状态

### 3. 2026-03-26：再次出现“汇报状态”异常

今天最关键的一条证据来自：

- [a4b20b86-aec4-40a9-bb7f-9f1180a3a60d.jsonl](/Users/wizout/op/openclaw/.openclaw-state/agents/main/sessions/a4b20b86-aec4-40a9-bb7f-9f1180a3a60d.jsonl)

这条会话里，用户消息是：

- `汇报状态 后端所有细节配置`

agent 的实际行为是：

1. 试图执行 `ops/bin/openclaw-project.sh gateway status`
2. 但当前 cwd 是 `.openclaw-state/workspaces/main`
3. 相对路径不存在，于是返回：
   - `zsh:1: no such file or directory: ops/bin/openclaw-project.sh`
4. agent 因此误判 gateway 不存在
5. 随后整轮状态汇报继续跑偏并中断

这是今天最直接的复发触发点。

## 根因拆解

### 根因一：前台 `main` 会话被当成“永久容器”

问题：

- `agent:main:main` 被同时承载：
  - 真实飞书前台
  - canary 测试
  - 状态巡检
  - memory flush
  - fallback 续跑

后果：

- 任何一次异常都会污染下一次用户体验
- 上下文越脏，模型越容易误判任务类型

### 根因二：运行时行为漂移

问题：

- 我们为了解决真实故障，对全局 OpenClaw runtime 做过补丁
- 仓库配置和全局 runtime 不再严格一一对应

后果：

- “同样的配置”在不同时间并不等价
- 排障时容易以为修了配置，实际上影响来自 runtime patch

### 根因三：相对路径假设错误

问题：

- 提示层写了“项目态命令优先 `ops/bin/openclaw-project.sh`”
- 但 agent 执行时 cwd 是 workspace 目录，不是仓库根目录

后果：

- agent 会把“脚本不存在”误判成“系统异常”
- 这是结构性问题，会反复复发

### 根因四：评测层本身不稳定

问题：

- 我们最初的 harness 默认走 gateway
- 一旦 gateway connect challenge timeout 或 session lock 争用，harness 自己就先失败

后果：

- agent 可能没坏，但评测先坏了
- 容易基于失真信号错误调整系统

这和文章里“先修评测，再改 Agent”完全一致。

### 根因五：模型本身外部不稳定

问题：

- `stepfun/step-3.5-flash:free` 会出现：
  - rate limit
  - network error
  - reasoning-only
  - 偶发长超时

后果：

- 前台表现会有随机性
- 单靠 prompt 调整无法根治

## 已落地修复

### 1. 把 workspace 中的项目脚本入口改成绝对路径

已修改：

- [BOOTSTRAP.md](/Users/wizout/op/openclaw/.openclaw-state/workspaces/main/BOOTSTRAP.md)
- [TOOLS.md](/Users/wizout/op/openclaw/.openclaw-state/workspaces/main/TOOLS.md)
- [HEARTBEAT.md](/Users/wizout/op/openclaw/.openclaw-state/workspaces/main/HEARTBEAT.md)
- [BOOTSTRAP.md](/Users/wizout/op/openclaw/.openclaw-state/workspaces/automation/BOOTSTRAP.md)
- [TOOLS.md](/Users/wizout/op/openclaw/.openclaw-state/workspaces/automation/TOOLS.md)

核心变化：

- 从 `ops/bin/openclaw-project.sh`
- 改为 `/Users/wizout/op/openclaw/ops/bin/openclaw-project.sh`

### 2. 给各 workspace 增加 `ops` 符号链接

已补：

- `.openclaw-state/workspaces/*/ops -> /Users/wizout/op/openclaw/ops`

这意味着即使未来某层提示词重新退化成相对路径，workspace 里也能找到脚本。

### 3. 给 agent 默认配置补 `repoRoot`

已补：

- [.openclaw-state/openclaw.json](/Users/wizout/op/openclaw/.openclaw-state/openclaw.json)

作用：

- 明确告诉运行时仓库根目录在哪里

### 4. 强化 health-check

已补：

- [health-check.sh](/Users/wizout/op/openclaw/ops/bin/health-check.sh)

新增检查：

- `workspace ops symlink present`

这样以后这种问题会在日常巡检里先暴露，而不是等飞书用户踩到。

### 5. 修正 harness 结构

已补：

- [run_openclaw_harness.js](/Users/wizout/op/openclaw/ops/harness/run_openclaw_harness.js)

关键变化：

- 默认使用 `--local`
- 避免把 gateway connect timeout 和 session lock 噪音误算成 agent 本身失败
- 增加 harness watchdog，防止评测进程自己挂死

### 6. 清理被污染的 `main` 会话

已再次轮转：

- `agent:main:main`

避免当前错误上下文继续污染下一轮真实前台消息。

## 为什么这次说“找到根因”了

因为今天这次不是只看到“模型没回复”，而是抓到了真正会反复复发的结构性触发器：

- 错误 cwd + 相对脚本路径

这类问题和模型、网络、渠道都没关系，只要路径继续这样写，就迟早会再犯。

## 为什么还不能说“永不出错”

因为仍有两个外部不稳定面：

1. `stepfun/step-3.5-flash:free` 作为外部 provider，仍可能 rate-limit / timeout
2. 全局 runtime patch 仍然存在于 `/opt/homebrew/lib/node_modules/openclaw/dist/`，它已经不完全受仓库版本管理

也就是说：

- 这次把“会反复误判系统状态”的结构性坑堵住了
- 但“外部模型服务自身抖动”仍然会造成性能波动

## 后续治理建议

### 必做

1. 前台 `main` 只服务真实用户请求
不要再让它承载 canary、debug、memory flush 测试。

2. 所有项目脚本一律绝对路径或 workspace symlink
不要再依赖 cwd 假设。

3. harness 默认 local，health-check 才测 gateway
把评测噪音和运行时噪音分开。

4. 每次真实线上失败，优先转成 harness case
不要只写进记忆。

### 建议做

1. 给全局 runtime patch 建仓库内补丁清单
否则将来很难知道当前行为到底来自配置还是来自临时补丁。

2. 给 `main` 加更激进的 session hygiene
例如状态类请求、canary 类请求、异常 fallback 后自动换新 session。

3. 给 `step3.5` 单独做 provider 健康统计
把：
- timeout
- reasoning-only
- rate-limit
- empty-reply salvage
拆开记。

## 当前状态判断

现在系统不是“完全坏了”，而是：

- gateway 正常
- Feishu 通道正常
- 主要的复发性误判根因已定位并修正
- 但主模型仍受外部 provider 稳定性影响

一句话总结：

`这次反复出现的根因已经不再是“模型偶发不稳定”那么简单，而是“前台主链路缺少稳定边界”。今天我们把最会反复复发的那个结构性坑——workspace 相对路径误判——堵上了。`
