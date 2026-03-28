# OpenClaw Harness Guide

## 背景

《你不知道的 Agent：原理、架构与工程实践》里对 Harness 的定义很准确：

- 验收基线
- 执行边界
- 反馈信号
- 回退手段

当前仓库原有的 `promptfoo` 更像“模型与提示回归层”，还不是完整的 agent harness。这个文档把两者职责拆清楚，并补上仓库原生 harness。

## 现在的分层

### 1. Prompt / Model Harness

文件：

- `ops/promptfoo/promptfooconfig.yaml`
- `ops/bin/promptfoo-run.sh`

作用：

- 测提示词是否退化
- 测模型输出的基本质量
- 测一些基础禁忌项，比如协议泄漏、明显错误文本

不负责：

- 不走真实 OpenClaw agent runtime
- 不覆盖真实 gateway / session / memory / fallback 行为

### 2. Agent Harness

文件：

- `ops/harness/cases/main_smoke.json`
- `ops/harness/run_openclaw_harness.js`
- `ops/bin/openclaw-harness.sh`

作用：

- 走真实 `./ops/bin/openclaw-project.sh agent`
- 默认使用 `--local`，优先验证 agent runtime 与提示/工具行为，而不是 gateway 连通性
- 使用隔离的临时 state 目录，不污染生产态 `.openclaw-state`
- 测 `main` agent 的真实可见回复
- 测空回复、协议泄漏、误 heartbeat、基础响应正确性
- 每条 case 用独立 `session-id`，避免相互污染
- 输出结构化报告到 `ops/reports/harness-*/`

如需强制测 gateway 路径：

```bash
OPENCLAW_HARNESS_MODE=gateway ./ops/bin/openclaw-harness.sh
```

### 3. Runtime Health Harness

文件：

- `ops/bin/health-check.sh`
- `ops/bin/redeploy-gateway-clean.sh`

作用：

- 看服务是否活着
- 看 gateway / channel / plugin 是否可达
- 看 launchd 环境是否干净

### 4. Trace / Observability Harness

文件：

- `ops/langfuse/README.md`

作用：

- 后续把 OpenClaw 执行轨迹转成 Langfuse / trace 数据
- 用来解释“为什么失败”，不是只看 pass / fail

## 为什么要分成这四层

因为文章里说得很对：

- 只做 prompt 回归，不够
- 只做健康检查，也不够
- 只看最终失败率，更不够

一个能用的 Harness，至少要把下面几类问题拆开：

1. 模型是否变笨了
2. agent runtime 是否变坏了
3. 工具 / 插件 / gateway 是否挂了
4. 评测本身是不是失真了

## 当前仓库补上的短板

### 补上的部分

1. 从“只有 promptfoo”补成“prompt harness + agent harness”
2. agent harness 开始直接验证真实 `main` agent，而不是只测单轮模型输出
3. 用独立 session 运行 case，减少历史上下文干扰
4. 报告落盘到 `ops/reports/`，可用于后续趋势比对
5. `full-iteration.sh` 支持用 `OPENCLAW_RUN_HARNESS=1` 挂载 harness

### 还没补完的部分

1. 还没有 grader 分层
当前还是以字符串断言为主，适合 smoke，不适合复杂任务。

2. 还没有稳定的 pass^k / pass@k 统计
目前是单次 case pass/fail，还没有把多轮稳定性指标做进去。

3. 还没有“环境结果”型验收
比如文件是否真的修改、Feishu 是否真的收到、memory 是否真的写入，这些还需要 task-specific grader。

4. 还没有在线采样 harness
现在是离线/主动运行，还没接真实生产 trace 的抽样回放。

## 推荐怎么用

### 日常

```bash
npm run oc:harness
```

### 发版前

```bash
OPENCLAW_RUN_HARNESS=1 npm run oc:iterate
```

### 结果查看

看：

- `ops/reports/harness-*/agent-harness-report.json`
- `ops/reports/harness-*/agent-harness-report.md`

## 下一步建议

按文章的 Harness 思路，建议继续补三件事：

1. 增加任务级 grader
例子：
- Feishu 回复型任务：判“是否回了、是否有人类可见正文、是否无协议泄漏”
- 工程任务：判“文件是否改了、测试是否过了、日志是否恢复”

2. 增加多次运行指标
至少区分：
- Pass@k：能力上限
- Pass^k：稳定上线质量

3. 增加失败案例回灌
规则：
- 每次真实线上失败，优先转成 harness case
- 不要等“积累够了”再做

## 一句话总结

现在仓库里已经不再只有一个薄的 `promptfoo` 配置，而是有了一个最小可用的 agent harness 雏形。

它还不完整，但已经开始符合文章里说的方向：

不是只测模型说了什么，而是开始测真实 agent 在真实 runtime 里做成了什么。
