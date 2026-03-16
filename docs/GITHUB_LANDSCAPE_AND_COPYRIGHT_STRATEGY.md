# 改命剧场 GitHub 发布与版权策略调研

更新日期：2026-03-16

## 结论先行

如果你现在要做一个能尽快破圈、又能保护版权边界的 MVP，那么最合适的公开路线不是：

- 直接公开知名影视小说 IP 改编 Demo
- 直接做 Steam 商业首发
- 先做一个很重的 Agent 大系统

而是：

1. 公开一个 `GitHub + GitHub Pages` 可玩的 Web Demo
2. 公开的是 `原创或公版题材` 的多节点改命玩法
3. 把真正的“影视/小说改命”留在私测或授权后版本
4. 把你的核心资产拆成：
   - `玩法引擎`
   - `公开示例剧本`
   - `私有高风险灵感池`

一句话：

`公开发布的是玩法，不是侵权风险。`

## 一、GitHub 上这个领域都在怎么做

我把相关项目大致分成四类。

### 1. 互动叙事脚本层

代表：

- [inkle/ink](https://github.com/inkle/ink)
- [YarnSpinnerTool/YarnSpinner](https://github.com/YarnSpinnerTool/YarnSpinner)

这类项目解决的问题是：

- 怎么写分支剧情
- 怎么写选择节点
- 怎么把对话和逻辑分开

`ink` 的定位非常清晰：它是互动叙事脚本语言，不是完整游戏引擎。仓库直接写明它适合高度分支叙事，并强调它可以接到自己的 UI 和游戏里。[来源](https://github.com/inkle/ink)

`Yarn Spinner` 的定位也非常明确：它是对话系统，采用接近剧本的格式，把“台词、选项、命令”交给游戏运行。[来源](https://github.com/YarnSpinnerTool/YarnSpinner)

这类项目的共同特点：

1. 定位一句话就能懂
2. README 第一屏就说清楚用途
3. 很强调“写作者友好”
4. 都不试图一开始包揽所有玩法

对你的启发：

`你的 MVP 也该先像一个“改命交互引擎”，而不是一个大而全的 AI 游戏宇宙。`

### 2. Web 视觉小说 / 互动小说引擎

代表：

- [Monogatari/Monogatari](https://github.com/Monogatari/Monogatari)
- [McFunkypants/CYOAwesome](https://github.com/McFunkypants/CYOAwesome)
- [Kirilllive/tuesday-js](https://github.com/Kirilllive/tuesday-js)
- [pistacchio/Dedalus](https://github.com/pistacchio/Dedalus)

这类项目的特点非常适合你现在：

1. 直接跑在浏览器
2. 适合 GitHub Pages 部署
3. 天然利于分享和试玩
4. 迭代成本远低于 Unity/Steam 首发

`Monogatari` 明确强调它的产品心智是“网页优先”。它支持响应式、PWA、存档等对 Web 传播极友好的能力。[来源](https://github.com/Monogatari/Monogatari)

`CYOAwesome` 则是另一种极简路线：README 上直接写“写一个故事，做一个游戏”，强调纯文本、多选项、上手快，甚至把在线 Demo 挂在非常显眼的位置。[来源](https://github.com/McFunkypants/CYOAwesome)

对你的启发：

`你现在最需要的是“能立刻玩”的网页 Demo，而不是先卷技术栈。`

### 3. Agent NPC / AI 世界模拟

代表：

- [a16z-infra/ai-town](https://github.com/a16z-infra/ai-town)
- [envy-ai/ai_rpg](https://github.com/envy-ai/ai_rpg)
- [IhateCreatingUserNames2/MaiMai](https://github.com/IhateCreatingUserNames2/MaiMai)

这类项目解决的是：

- NPC 如何有记忆
- 多角色如何持续活动
- 世界如何持续演化

它们很适合做你的第二阶段，但不适合现在承担 MVP 主叙事。

原因很现实：

1. 成本高
2. 响应不稳定
3. 系统复杂度高
4. 玩家第一印象未必更强

对你的启发：

`Agent 是你未来的壁垒，不是你第一天破圈的门票。`

### 4. 可公开传播的 Demo 仓库

我在 GitHub 上看下来，能获得更多关注的游戏类仓库，往往有这些共性：

1. README 首屏就有一句话定位
2. 第一屏就有 Demo 链接或 Play Now
3. 有图、有 GIF、最好有 30 秒视频
4. 安装和试玩步骤极短
5. 有明确 License
6. 有 Releases
7. 有截图能一眼看出“这个东西是什么”

这一点在 `CYOAwesome`、`Theodoric` 这类带在线试玩链接的项目里非常明显。[来源 1](https://github.com/McFunkypants/CYOAwesome) [来源 2](https://github.com/tlmader/theodoric)

## 二、GitHub 作为 MVP 首发渠道，值不值得

值。

但你要清楚它的作用。

GitHub 不会自动给你带来大众用户，但非常适合做三件事：

1. 建立“这是个真项目”的可信度
2. 承载试玩链接、版本记录和开发叙事
3. 吸引开发者、设计师、内容作者和早期传播者

GitHub 官方文档说明，`GitHub Pages` 可以直接把仓库里的 HTML、CSS、JavaScript 发布成网站。[来源](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

同时，`Releases` 可以把某个可用版本包装出来，附上说明和可下载资源。[来源](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

所以正确姿势不是：

- 只放源码

而是：

- `仓库` 负责叙事、可信度、版本管理
- `GitHub Pages` 负责试玩
- `Releases` 负责“这是一版可传播的作品”

## 三、GitHub 上最适合你的技术路线

### 最优路线

`静态 Web Demo + GitHub Pages + 结构化剧本数据`

理由：

1. 最省钱
2. 最快上线
3. 最易传播
4. 最容易做截图和录屏
5. 最容易 A/B 测试不同剧本和节点

### 当前不建议的路线

#### 1. Unity + Steam 先行

不适合你现在。

因为你不是卡在“做不出图形”，你是卡在：

- 玩法是否打动人
- 剧本是否能传播
- 节点设计是否能引发争论

#### 2. 纯 LLM 驱动开放式对话

不适合第一版。

因为第一版最重要的是：

- 情绪命中率
- 剧情节奏
- 结果可控

完全开放的 LLM 容易把这些打散。

### 第二阶段可接入的路线

如果第一版验证有效，可以逐步加：

1. `ink` 或 `Yarn Spinner` 作为正式剧本层
2. Agent 作为 NPC 记忆和长线关系层
3. Unity / Godot 作为更强视觉载体

## 四、公开仓库应该长什么样

你的 GitHub 仓库首页不能像开发备忘录，应该像“一个可以立刻理解和试玩的作品页”。

建议结构：

### 仓库名称

建议不要直接叫 `openclaw-something`。

建议像产品名：

- `gaiming-theater`
- `rewrite-the-scene`
- `if-that-night`

### README 首屏必须有的内容

1. 一句话卖点
2. 在线试玩链接
3. 一张主视觉图或 GIF
4. 30 秒玩法说明
5. 当前剧本列表
6. 路线图
7. 许可证说明
8. 版权边界说明

README 开头建议长这样：

```md
# 改命剧场

在那些你最不甘心的节点里，亲手改写结局。

Play now: https://yourname.github.io/gaiming-theater/

这是一个“从关键节点切入”的互动叙事原型。玩家进入一场本该意难平的戏，做出不同选择，观察角色关系、命运走向与结局评分如何改变。
```

### 仓库目录建议

```text
/docs
  PRODUCT.md
  COPYRIGHT_POLICY.md
  STORY_BIBLE.md
/public-demo
  index.html
  assets/
/stories
  maicheng_qianye.json
  xueye_licheng.json
/engine
  state-machine.js
  scoring.js
  npc-reactor.js
/assets
  /public-domain
  /original
  CREDITS.md
  ASSET_LICENSES.md
LICENSE
README.md
```

## 五、版权边界怎么守

这个点必须严肃一点，因为你已经明确说要兼顾版权和灵感。

我先说最关键的：

`公开仓库和公开 Demo，不要直接使用仍受版权保护的影视、电视剧、小说角色、台词、剧照、设定名。`

原因不是保守，而是风险客观存在。

美国版权局 FAQ 明确写到，创作他人作品的新版本或改编版本，是版权人的专有权利；未经同意，不能因为“改了很多”就当然拥有权利。[来源](https://www.copyright.gov/help/faq/faq-fairuse.html)

美国版权局对 derivative work 的说明也很直接：基于既有作品进行改写、小说改编剧本、虚构化、缩写、重写等，都属于 derivative works 的范畴。[来源](https://www.copyright.gov/eco/help-limitation.html)

这意味着：

### 可以公开做的

1. 公版题材
   - 三国
   - 水浒
   - 红楼梦
   - 莎士比亚
   - 希腊神话
   - 历史人物与历史事件
2. 原创角色与原创剧本
3. 只借鉴“情感结构”，不借具体角色与表达

### 不建议公开做的

1. 直接把热播剧主角搬进来
2. 直接复刻剧中名台词
3. 使用剧照、海报、官方角色形象
4. 用“某某电视剧互动改命版”作为公开标题

### 我给你的实操建议

公开层面做两套资产隔离：

#### 公开资产

- 原创文案
- 原创 UI
- 自制图标
- 公版题材剧本
- 可商用授权素材

#### 私有灵感资产

- 你收集的影视桥段拆解
- 角色关系模板
- 情绪结构参考
- “这段戏到底为什么让人意难平”的分析

也就是：

`灵感来源可以私下研究，公开产品不要直接照搬。`

## 六、如何既保灵感又不直接踩线

你真正要保护的，不是“我看了哪些作品”，而是：

- 你的节点设计方法
- 你的改命结构
- 你的评分逻辑
- 你的角色状态系统

所以你完全可以建立一个内部方法库，而不把原作品内容原样公开。

我建议你内部这样拆：

### A. 灵感卡片

只记录抽象层：

- 原场景功能：诀别 / 误会 / 牺牲 / 揭秘 / 迟到
- 情感机制：嘴硬、错认、无法兼顾、立场相斥
- 可改命点：提前说真相 / 换路线 / 不顾大局 / 求援 / 留证据

### B. 公版重写卡片

把上面的结构变成原创或公版题材：

- “诀别”变成“城门离别”
- “误会”变成“密信误判”
- “牺牲”变成“伏杀换刀”

这样你保住的是设计方法，而不是具体侵权表达。

## 七、应该选什么 License

这里要分开。

### 代码

如果你想吸引开发者协作，建议：

- `MIT`
或
- `Apache-2.0`

原因：

1. 宽松
2. GitHub 上最容易被接受
3. 对前期传播友好

### 剧本与美术

不要和代码混在一个 License 里。

建议分层：

1. `代码`
   - MIT
2. `原创剧本内容`
   - All Rights Reserved
   - 或 CC BY-NC
3. `第三方素材`
   - 按素材原始许可证单独列出

Creative Commons 官方也明确强调，只有你拥有授权权利时，才适合给作品加 CC License。[来源](https://creativecommons.org/choose/)

### 你最该做的不是“一个总 License”

而是这三个文件：

1. `LICENSE`
2. `COPYRIGHT_POLICY.md`
3. `ASSET_LICENSES.md`

## 八、我建议你公开的第一个 Demo 题材

为了兼顾传播和版权，我最推荐：

### 《麦城前夜》

原因：

1. 足够耳熟能详
2. 公版 / 历史题材相对安全
3. 天然适合多重选择
4. 争议性强，评论区容易吵起来
5. “如果那一夜你来决策”一句话就能让人懂

这个比你直接公开某部热门影视剧的魔改要稳太多。

## 九、GitHub 上的内容应该怎么发

我建议分三层发。

### 第一层：仓库首页

目标是让人 15 秒内理解：

1. 这是什么
2. 为什么好玩
3. 去哪里玩

### 第二层：Pages 可玩 Demo

目标是让人 2 分钟内玩出第一次结局。

### 第三层：Release

每次发布一版，就写清楚：

1. 新增了什么剧本
2. 新增了什么结局
3. 修了什么问题
4. 下一版想做什么

GitHub Releases 很适合做这个版本叙事。[来源](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

## 十、你现在最适合的公开策略

### Phase 1

公开：

- 一个 GitHub 仓库
- 一个 GitHub Pages Demo
- 一个公版题材剧本
- 一套非常清楚的 README

不要公开：

- 高风险 IP 剧本
- 影视角色名
- 剧照与官方视觉
- 你的完整灵感库

### Phase 2

在 GitHub 上逐步增加：

1. 第二个公版剧本
2. 玩家结局分享图
3. 更清楚的剧情状态图
4. 开放 issue 收集“你最想改哪场戏”

### Phase 3

再考虑：

1. 私测 IP 改命版
2. 找授权合作
3. 上 Steam Demo 或 itch.io

## 十一、我对你当前项目的明确建议

如果你现在只能赌一把，我建议赌在这条线上：

`GitHub + Pages + 公版经典节点改命 Demo + 短视频传播`

不是赌在：

- 大而全的 Agent 平台
- 高风险 IP 公开发布
- Steam 首发幻想

## 十二、下一步可直接执行的事项

我建议你接下来马上做三件事：

1. 把当前原型重构成 `麦城前夜` 公版 Demo
2. 给仓库补上：
   - `README.md`
   - `COPYRIGHT_POLICY.md`
   - `ASSET_LICENSES.md`
3. 配 GitHub Pages，形成第一条公开试玩链接

如果只做一件事，优先是：

`先把公开题材和版权边界定死。`

这样你后面的宣发、二创、找合作、发社区，才不会一直带着定时炸弹。

## 参考来源

- GitHub Pages 官方文档：[What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- GitHub Releases 官方文档：[About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- ink GitHub 仓库：[inkle/ink](https://github.com/inkle/ink)
- Yarn Spinner GitHub 仓库：[YarnSpinnerTool/YarnSpinner](https://github.com/YarnSpinnerTool/YarnSpinner)
- Monogatari GitHub 仓库：[Monogatari/Monogatari](https://github.com/Monogatari/Monogatari)
- CYOAwesome GitHub 仓库：[McFunkypants/CYOAwesome](https://github.com/McFunkypants/CYOAwesome)
- AI Town GitHub 仓库：[a16z-infra/ai-town](https://github.com/a16z-infra/ai-town)
- U.S. Copyright Office FAQ：[Fair Use (FAQ)](https://www.copyright.gov/help/faq/faq-fairuse.html)
- U.S. Copyright Office eCO Help：[Limitation of Claim](https://www.copyright.gov/eco/help-limitation.html)
- Creative Commons：[Choose a License](https://creativecommons.org/choose/)
