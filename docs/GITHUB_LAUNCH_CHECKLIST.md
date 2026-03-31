# GitHub 首发清单

## 推送前

1. 确认仓库名简洁、像产品名
2. 确认 `README.md` 首屏可读
3. 确认 `LICENSE`、`COPYRIGHT_POLICY.md`、`ASSET_LICENSES.md` 已存在
4. 确认 Demo 在本地能打开
5. 确认没有把高风险 IP 内容一起推上去

## 首次推送后

1. 打开仓库 `Settings -> Pages`
2. 选择 `Source: GitHub Actions`
3. 等待 `pages` 工作流完成
4. 打开试玩链接，确认静态资源正常加载

## 仓库展示面

1. 设置仓库描述
2. 设置 Topics，例如：
   - `interactive-fiction`
   - `narrative-game`
   - `game-design`
   - `web-game`
   - `historical-fiction`
3. 设置 Website 为 GitHub Pages 链接
4. 设置 Social preview，优先使用：
   - `products/gaiming-juchang/assets/cover.svg`

## 首发内容建议

发出仓库时，最好同时带一段短说明：

```text
这是我在做的一个互动叙事游戏 MVP：把那些大家最不甘心的经典节点做成“可改命”的多选择体验。
第一支公开 Demo 是《麦城前夜》。
如果你能在那一夜接管决策，你会让更多人活下来，还是让传奇更像传奇？
```

## 发版后第一波观察

重点盯：

1. 有多少人真的点开试玩
2. 有多少人会重开不同结局
3. 有多少人会在 issue 或评论里提交“下一个想改的节点”
4. 评论区更在乎：
   - 玩法
   - 历史题材
   - 角色命运
   - 还是传播性

## 如果首发效果一般

优先改：

1. 第一屏标题
2. 第一个节点的痛感
3. 结局差异是否足够大
4. 分享文案是否足够容易转发

不要立刻改：

1. 整个技术栈
2. 大而全的 Agent 架构
3. 多平台发布
