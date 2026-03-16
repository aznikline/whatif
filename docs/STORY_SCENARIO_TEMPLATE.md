# 剧本模板

这个模板用于给“改命剧场”增加新的公开剧本。

## 一个公开剧本至少要包含什么

1. `title`
2. `teaser`
3. `summary`
4. `hook`
5. `shareQuestion`
6. `scoreLabels`
7. `verdicts`
8. `entries`
9. `npcs`
10. `score`
11. `reactions`
12. `scenes`

## 设计原则

### 1. 一句话能讲清

玩家必须在 5 秒内明白：

- 这是什么节点
- 原本的遗憾是什么
- 我能改什么

### 2. 入口不要太长

一个剧本建议 3 个切入节点起步。

### 3. 选择要真冲突

不要出现明显正确答案。

好的选择应该像：

- 保人 vs 保名
- 现在动手 vs 留后手
- 局部救人 vs 全局翻盘
- 当下体面 vs 长远生机

### 4. 结局要层次分明

至少做 3 种：

1. 原典惯性更强的一条
2. 局部改命的一条
3. 彻底偏离原结局的一条

### 5. 要有一句最适合传播的问题

例如：

- 活下来更重要，还是传奇更重要？
- 先杀最大的对手，还是先稳住人心？

## 数据结构参考

```js
{
  id: 'scenario-id',
  title: '剧本标题',
  teaser: '一句话钩子',
  summary: '剧本简介',
  hook: '适合短视频和传播的场景问题',
  shareQuestion: '结局页的一句话争议问题',
  scoreLabels: {
    fate: '改命度',
    control: '局势掌控',
    survival: '核心人物生还',
    impact: '传播张力'
  },
  verdicts: {
    high: '高分结算判断',
    mid: '中分结算判断',
    low: '低分结算判断'
  },
  entries: [
    { id: 'node-a', label: '节点名', blurb: '节点说明' }
  ],
  npcs: [
    {
      id: 'npc-id',
      name: '角色名',
      role: '角色定位',
      bio: '角色简介',
      stats: { trust: 50, leverage: 50, pressure: 50 }
    }
  ],
  score: {
    fate: 30,
    control: 50,
    survival: 40,
    impact: 20
  },
  reactions: {
    endingKey: [
      '弹幕示例',
      '评论示例',
      '热评示例'
    ]
  },
  scenes: {
    'node-a': {
      tag: '关键节点',
      step: 1,
      title: '节点标题',
      body: '剧情正文',
      choices: [
        {
          label: '选项标题',
          text: '选项说明',
          effects: {
            score: { fate: 10, control: -4, survival: 6, impact: 8 },
            npcs: {
              'npc-id': { trust: 8, leverage: -2, pressure: 4 }
            }
          },
          next: 'ending-a'
        }
      ]
    },
    'ending-a': {
      tag: '结局',
      step: 3,
      ending: true,
      title: '结局标题',
      body: '结局描述',
      endingKey: 'endingKey'
    }
  }
}
```

## 当前最适合新增的公开题材

1. 长坂坡断后
2. 鸿门宴前席
3. 哈姆雷特决斗前夜
4. 风雪山神庙前夕
5. 特洛伊木马入城前夜

## 不建议作为公开首发的题材

1. 热播影视剧节点
2. 仍受版权保护的小说 / 动画 / 电视剧角色改编
3. 对原作台词高度复刻的内容
