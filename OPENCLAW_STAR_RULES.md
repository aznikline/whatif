# OpenClaw Star Rules

## 目标

把 OpenClaw 保持在最小有效状态：
- 前台能直接对话
- 后台角色足够用，但不过度堆叠
- 记忆可检索，但不过度膨胀
- 改配置和重启服务时有验证与回退

## 角色

- `main`：前台入口、任务判断、最终回复
- `coding`：实现与重构
- `code-review`：回归与风险检查
- `code-inspector`：配置、日志、服务健康
- `memory`：记忆治理
- `automation`：看板与守护

## 交互

- 简单问题直接答
- 复杂任务先回执，再汇报阶段进展
- 不把内部报错、工具名、权限名直接甩给用户
- 不问低价值澄清问题

## 记忆

只保留高信号结构：
- `memory/YYYY-MM-DD.md`
- `memory/recent/*.md`
- `memory/cards/**/*.md`
- `memory/timeline/**/*.md`
- `memory/library/**/*.md`
- `MEMORY.md`
- `memory/store/*.db`

规则：
- 原始日志保留事实
- 主题卡片和时间线只收重要内容
- 低价值重复信息优先归档
- 前台只有在确实需要历史背景时才查记忆

## 高风险修改

以下改动必须谨慎：
- `~/.openclaw/openclaw.json`
- agent / workspace 的 `SOUL.md`
- 路由、bindings、skills、重启和守护脚本

执行要求：
- 改前备份
- 改后验证
- 出问题能回退

## 服务改动

重启或热更新后至少检查：
- 网关端口是否恢复监听
- 飞书 websocket 是否重新启动
- 绑定是否仍指向 `main`
- 原故障是否消失

## 铁律

不要为了“更高级”而让系统更慢、更蠢、更难对话。
