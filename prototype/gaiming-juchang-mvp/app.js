const scripts = {
  maicheng: {
    id: 'maicheng',
    title: '麦城前夜',
    teaser: '如果你能在麦城前夜接管决策，你会让更多人活下来，还是让传奇更像传奇？',
    traits: ['悲剧改命', '高情绪浓度', '保人 vs 保名'],
    hiddenEndings: 1,
    summary:
      '荆州已失，援军难至，麦城将陷。你将从三个关键节点切入，试着改写关羽、关平与残部的命运。',
    hook:
      '最适合传播的问题是：麦城前夜，活下来更重要，还是传奇更重要？',
    shareQuestion:
      '麦城前夜，活下来更重要，还是传奇更重要？',
    scoreLabels: {
      fate: '改命度',
      honor: '名节保全',
      survival: '生还概率',
      impact: '传播张力'
    },
    verdicts: {
      high: '这是一轮明显跳出了命运惯性的改命。',
      mid: '这是一轮带着代价的改命，已经足够让人争起来。',
      low: '这轮更像是看清了命运的惯性，而不是彻底逃开它。'
    },
    entries: [
      {
        id: 'news',
        label: '失荆州消息初到',
        blurb: '军心未散，但最坏的消息已经到了帐中。你还有时间决定接下来要保什么。'
      },
      {
        id: 'maicheng',
        label: '麦城前夜',
        blurb: '围势渐成，粮尽兵疲。此时的一纸命令，可能决定次日所有人的生死。'
      },
      {
        id: 'breakout',
        label: '突围前一刻',
        blurb: '天色将白，马已备好。是突围、议和、分兵，还是守最后的名节？'
      }
    ],
    npcs: [
      {
        id: 'guanyu',
        name: '关羽',
        role: '主将',
        bio: '武名极盛，也因此更难低头。你做的每个选择，都会碰到他的名望与底线。',
        stats: { trust: 62, leverage: 34, pressure: 58 }
      },
      {
        id: 'guanping',
        name: '关平',
        role: '宗亲与副手',
        bio: '更愿意保住父亲与残部，但也最容易被拖进不可逆的败局。',
        stats: { trust: 55, leverage: 40, pressure: 51 }
      },
      {
        id: 'liaohua',
        name: '廖化',
        role: '奔援之将',
        bio: '比谁都清楚局势正在塌，但也最愿意替你争出一条活路。',
        stats: { trust: 52, leverage: 47, pressure: 45 }
      }
    ],
    score: {
      fate: 30,
      honor: 60,
      survival: 32,
      impact: 24
    },
    reactions: {
      split: [
        '弹幕：这结局不够燃，但真的像一个在救人而不是在演史书的人。',
        '评论：终于不是所有人都得陪着名节一起死。',
        '热评：最刀的是你明知道这更对，却也知道这不再好看。'
      ],
      command: [
        '弹幕：这版最像高手接管了决策，而不是只会跟着情绪走。',
        '评论：不神化，也不摆烂，这才是我最想反复刷的线。',
        '热评：这是那种会让我二周目继续试更优解的结局。'
      ],
      escape: [
        '弹幕：我就想看他们活下来，这次终于活下来了。',
        '评论：丢面子换人命，值不值？我觉得太值了。',
        '热评：这才是真正的改命，不是把遗憾改得更帅。'
      ],
      legend: [
        '弹幕：最燃的一条，也是最让我无力的一条。',
        '评论：这就是命运惯性，你明知不对还是会被它吸进去。',
        '热评：如果是传播，这条最爆；如果是改命，这条最痛。'
      ],
      shadow: [
        '弹幕：这条线最阴，但也最像真正想活下来的人会做的。',
        '评论：不体面到极致，却可能是最有效的骗杀线。'
      ]
    },
    scenes: {
      news: {
        tag: '关键节点',
        step: 1,
        title: '失荆州的消息传进大帐',
        body:
          '荆州失守的消息让帐中一下子静了。有人主张立刻收拢兵力北返，有人坚持先守住体面再谋后路。原本的命运里，局势一步步滑向麦城。现在，你有机会在崩盘之前，先决定到底要保什么。',
        choices: [
          {
            label: '立刻缩线撤军，先保住主力',
            text: '你承认局势已经变了，不再执着于之前的部署。',
            effects: {
              score: { fate: 14, honor: -8, survival: 16, impact: 8 },
              npcs: {
                guanyu: { trust: -6, leverage: 12, pressure: -4 },
                guanping: { trust: 8, leverage: 10, pressure: 6 },
                liaohua: { trust: 10, leverage: 8, pressure: 8 }
              }
            },
            next: 'maicheng'
          },
          {
            label: '派廖化抢求援军，同时封锁败讯',
            text: '你试图拖住崩势，赌援军能在大局彻底坏掉前赶到。',
            effects: {
              score: { fate: 10, honor: 6, survival: 6, impact: 10 },
              npcs: {
                guanyu: { trust: 6, pressure: 8 },
                guanping: { trust: 4, leverage: 2 },
                liaohua: { trust: 10, leverage: 4, pressure: 10 }
              }
            },
            next: 'reinforce'
          },
          {
            label: '承认失地，直接准备南向突围',
            text: '你决定不再守名分叙事，而是把命留在下一步里。',
            effects: {
              score: { fate: 18, honor: -14, survival: 18, impact: 12 },
              npcs: {
                guanyu: { trust: -10, leverage: 10, pressure: -10 },
                guanping: { trust: 10, leverage: 12 },
                liaohua: { trust: 8, leverage: 10, pressure: 6 }
              }
            },
            next: 'breakout'
          }
        ]
      },
      maicheng: {
        tag: '围城已成',
        step: 2,
        title: '麦城前夜，火光照不进城头',
        body:
          '城中粮尽，城外路断。关羽还在犹豫是守住声名，还是承认这一局已经输了。关平担心再拖就连一条退路都没有了，廖化则一遍遍确认援军是不是还可能赶到。你现在的命令，会决定明天是一次有组织的撤离，还是一场注定被写进史书的败亡。',
        choices: [
          {
            label: '分兵护送家眷与残部先走',
            text: '你接受主将未必能全身而退，但至少不让所有人一起陪葬。',
            effects: {
              score: { fate: 16, honor: -6, survival: 18, impact: 10 },
              npcs: {
                guanyu: { trust: -8, leverage: 6, pressure: -6 },
                guanping: { trust: 12, leverage: 12, pressure: 8 },
                liaohua: { trust: 8, leverage: 10, pressure: 6 }
              }
            },
            next: 'ending-split'
          },
          {
            label: '强压全军，拂晓统一突围',
            text: '你要赌一次最整齐、也最像翻盘的行动。',
            effects: {
              score: { fate: 12, honor: 8, survival: 8, impact: 16 },
              npcs: {
                guanyu: { trust: 10, leverage: 4, pressure: 8 },
                guanping: { trust: 4, leverage: 4, pressure: 4 },
                liaohua: { trust: 6, leverage: 4, pressure: 8 }
              }
            },
            next: 'breakout'
          },
          {
            label: '试探议和，只求换一夜生机',
            text: '你不是相信对方，而是想用一夜时间换回部署空间。',
            effects: {
              score: { fate: 14, honor: -12, survival: 14, impact: 8 },
              npcs: {
                guanyu: { trust: -12, leverage: 8, pressure: -12 },
                guanping: { trust: 6, leverage: 8 },
                liaohua: { trust: 4, leverage: 6, pressure: 2 }
              }
            },
            next: 'negotiation'
          }
        ]
      },
      reinforce: {
        tag: '外援变量',
        step: 2,
        title: '援军可能来，也可能永远不会来',
        body:
          '廖化已经出发，关平仍主张尽快做撤离准备。关羽则不愿在尚有转机时承认败局。你面前的问题，不再是谁对谁错，而是你愿意把多大的赌注压在还没出现的援军身上。',
        choices: [
          {
            label: '等半日，若无援军立刻突围',
            text: '你给希望最后一次机会，但不让它无限吞掉生机。',
            effects: {
              score: { fate: 14, honor: 4, survival: 10, impact: 10 },
              npcs: {
                guanyu: { trust: 8, pressure: 6 },
                guanping: { trust: 6, leverage: 8 },
                liaohua: { trust: 10, pressure: 8 }
              }
            },
            next: 'breakout'
          },
          {
            label: '不等了，立刻放弃重围中的体面',
            text: '你承认任何拖延都在拿真实的人命换声名。',
            effects: {
              score: { fate: 18, honor: -10, survival: 18, impact: 12 },
              npcs: {
                guanyu: { trust: -8, leverage: 10, pressure: -8 },
                guanping: { trust: 10, leverage: 12, pressure: 8 },
                liaohua: { trust: 8, leverage: 10 }
              }
            },
            next: 'ending-escape'
          }
        ]
      },
      negotiation: {
        tag: '刀口借时',
        step: 3,
        title: '你决定用议和赌一段喘息',
        body:
          '试探性的使者已经出去，城内外都在观望。议和或许只是拖延，也可能让士气更快崩掉。你必须决定这段换来的时间是拿来整军突围，还是拿来保全最重要的人。',
        choices: [
          {
            label: '借这一夜整理退路，只保核心人物',
            text: '你彻底接受不能全拿，只保最值钱的命。',
            effects: {
              score: { fate: 20, honor: -8, survival: 20, impact: 12 },
              npcs: {
                guanyu: { leverage: 10, pressure: -6 },
                guanping: { trust: 10, leverage: 14 },
                liaohua: { trust: 8, leverage: 10 }
              }
            },
            next: 'ending-escape'
          },
          {
            label: '借这一夜布疑阵，次日强行冲阵',
            text: '你宁可让结局险一点，也想把声势与胜算一起抢回来。',
            effects: {
              score: { fate: 16, honor: 6, survival: 8, impact: 18 },
              npcs: {
                guanyu: { trust: 8, pressure: 10 },
                guanping: { trust: 4, leverage: 4 },
                liaohua: { trust: 6, pressure: 8 }
              }
            },
            next: 'ending-command'
          }
        ]
      },
      breakout: {
        tag: '决断时刻',
        step: 3,
        title: '天亮前，最后一次下令',
        body:
          '马已经备好，追兵的火把在山道外游动。关羽仍想带着名望冲出去，关平更看重能不能活着出去，廖化则盯着你，等一句真正能改变结果的命令。现在这一句，就是整个 Demo 的核心一刀。',
        choices: [
          {
            label: '让关羽亲率小队断后，主力分路撤',
            text: '你知道这会改写英雄叙事，但可能救更多人。',
            effects: {
              score: { fate: 18, honor: -10, survival: 18, impact: 14 },
              npcs: {
                guanyu: { trust: -10, leverage: -4, pressure: -6 },
                guanping: { trust: 10, leverage: 12, pressure: 8 },
                liaohua: { trust: 8, leverage: 10 }
              }
            },
            next: 'ending-split'
          },
          {
            label: '关羽与关平同走密道，放弃辎重与旗号',
            text: '你把面子扔下，只为把最关键的人带出去。',
            effects: {
              score: { fate: 22, honor: -18, survival: 24, impact: 12 },
              npcs: {
                guanyu: { trust: -14, leverage: 16, pressure: -14 },
                guanping: { trust: 12, leverage: 16, pressure: 8 },
                liaohua: { trust: 10, leverage: 12, pressure: 6 }
              }
            },
            next: 'ending-escape'
          },
          {
            label: '全军一体突围，宁折不散',
            text: '你选择最符合原典气质的一条路，也选择了最大的风险。',
            effects: {
              score: { fate: 8, honor: 16, survival: -4, impact: 20 },
              npcs: {
                guanyu: { trust: 12, pressure: 12 },
                guanping: { trust: 4, leverage: -4, pressure: 6 },
                liaohua: { trust: 6, leverage: -2, pressure: 8 }
              }
            },
            next: 'ending-legend'
          },
          {
            label: '弃旗换道，先放出诈降消息再反折北返',
            text: '你决定连传奇的外壳也一起丢掉，只换一个更脏但更有效的活路。',
            effects: {
              score: { fate: 20, honor: -22, survival: 22, impact: 16 },
              npcs: {
                guanyu: { trust: -18, leverage: 14, pressure: -8 },
                guanping: { trust: 12, leverage: 14, pressure: 6 },
                liaohua: { trust: 8, leverage: 12, pressure: 4 }
              }
            },
            next: 'ending-shadow'
          }
        ]
      },
      'ending-split': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你保住了更多人，却保不住原本那种英雄叙事',
        body:
          '这一次，不是所有人都陪着名望一起坠落。关平与部分残部活下来了，后续火种没有全断，但你也亲手改写了那个最容易被后人歌颂的姿态。你救下的是更多真实的人命，而不是最好看的结局。',
        endingKey: 'split',
        badges: ['高生还', '高争议'],
        nextTry: '下一轮试试「全军一体突围，宁折不散」，你会看到最像原典惯性的那条线。'
      },
      'ending-command': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你把败局改成了一次有组织的撤离与反制',
        body:
          '你没有神话般翻盘，却第一次让这场原本只会越走越窄的局面出现了第二条路。关羽的声名受损有限，关平和残部保住了更多生机，而最重要的是，这次不再只是被史书裹挟着走向同一个答案。',
        endingKey: 'command',
        badges: ['最稳', '高手感'],
        nextTry: '下一轮试试「关羽与关平同走密道，放弃辎重与旗号」，那条线会更反意难平。'
      },
      'ending-escape': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你把最该活下来的几个人，从原本的结局里硬拽了出来',
        body:
          '这是最不体面的改命，也是最像活人会做的改命。旗号、辎重、声势、面子都被你丢在了身后，但关羽、关平与几名关键人物真正获得了生机。这不是最传奇的结局，却是最反意难平的结局。',
        endingKey: 'escape',
        badges: ['最反意难平', '保人优先'],
        nextTry: '下一轮试试「分兵护送家眷与残部先走」，看更多人活下来会换掉什么。'
      },
      'ending-legend': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你守住了传奇的姿态，也几乎走回了原本的败局',
        body:
          '这一版结局最像原典的气口。它会让观众热血，会让评论区高呼不愧名将，但从改命的角度看，你其实并没有真正逃出命运的惯性。你得到的是最有戏剧感的答案，不是最有效的答案。',
        endingKey: 'legend',
        badges: ['最燃', '最像原典'],
        nextTry: '下一轮试试「让关羽亲率小队断后，主力分路撤」，你会得到一条更像在救人的线。'
      },
      'ending-shadow': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你连“关羽该怎么输”这件事都一起改写了',
        body:
          '这条线最不体面，也最颠覆。你不是正面把命抢回来，而是干脆把“名将该如何退场”的脚本一并撕掉。诈降、换道、弃旗，这一切都足够让后人骂，但也足够把原本必死的一局撕开一条更脏更活的缝。',
        endingKey: 'shadow',
        badges: ['最阴', '最颠覆'],
        nextTry: '下一轮试试「关羽与关平同走密道，放弃辎重与旗号」，比较“脏赢”和“硬保人”的差别。'
      }
    }
  },
  hongmen: {
    id: 'hongmen',
    title: '鸿门宴前席',
    teaser: '如果你能在鸿门宴前席接管决策，你会先杀刘邦，还是先稳住天下人心？',
    traits: ['权谋博弈', '高策略感', '下刀 vs 保名义'],
    hiddenEndings: 1,
    summary:
      '项伯夜访、范增催杀、樊哙闯帐。你将从三个关键节点切入，决定这场宴局是立刻改写天下，还是放虎归山。',
    hook:
      '最适合传播的问题是：鸿门宴前席，先杀最危险的对手，还是先守住人心与名义？',
    shareQuestion:
      '鸿门宴前席，先杀对手更重要，还是先稳住天下人心更重要？',
    scoreLabels: {
      fate: '改命度',
      control: '霸业掌控',
      survival: '关键人物生还',
      impact: '传播张力'
    },
    verdicts: {
      high: '这是一轮足以改写楚汉秩序的强改命。',
      mid: '这是一轮典型的高收益高代价选择，够让评论区吵起来。',
      low: '这轮更像看清鸿门宴的两难，而不是彻底压住它。'
    },
    entries: [
      {
        id: 'nightvisit',
        label: '项伯夜访',
        blurb: '有人要先递一个活路，也有人想立刻把活路堵死。夜还没过去，杀意已经上桌。'
      },
      {
        id: 'banquet',
        label: '宴席未开',
        blurb: '刘邦将至，范增已经等不及，项羽还在犹豫名义与结果哪一个更重要。'
      },
      {
        id: 'fankuai',
        label: '樊哙闯帐前',
        blurb: '局面已经接近失控。现在的一句命令，决定这是绝杀，还是放虎归山。'
      }
    ],
    npcs: [
      {
        id: 'xiangyu',
        name: '项羽',
        role: '宴局之主',
        bio: '锋芒最盛，却也最容易在杀伐与名义之间犹疑。',
        stats: { trust: 58, leverage: 62, pressure: 46 }
      },
      {
        id: 'fanzeng',
        name: '范增',
        role: '谋主',
        bio: '比谁都清楚这顿饭该不该吃，也比谁都清楚错过一刀会怎样。',
        stats: { trust: 64, leverage: 56, pressure: 54 }
      },
      {
        id: 'liubang',
        name: '刘邦',
        role: '最危险的客人',
        bio: '看似低头求活，实际上每一次活下来都会让后面的局更难收。',
        stats: { trust: 22, leverage: 48, pressure: 62 }
      }
    ],
    score: {
      fate: 26,
      control: 58,
      survival: 50,
      impact: 28
    },
    reactions: {
      sever: [
        '弹幕：一刀下去是爽了，但后面的天下真能稳吗？',
        '评论：这是最直接的改命，也是最容易反噬的一条线。',
        '热评：你赢了眼前，未必赢了后面的诸侯。'
      ],
      trap: [
        '弹幕：这条线最像真正的局中高手，既不是犹豫，也不是硬莽。',
        '评论：比直接杀更高级，问题是你能不能控住后续。',
        '热评：这是那种会让我不断刷最优解的策略线。'
      ],
      release: [
        '弹幕：放他走真的太难受了，但这条线最像在保天下名义。',
        '评论：你保住了脸面，也把最大的后患放走了。',
        '热评：最文明的一条，也是最让人后背发凉的一条。'
      ],
      rupture: [
        '弹幕：局面炸了，所有人都知道这场宴再也收不回来了。',
        '评论：这条线最适合传播，因为每一步都在失控。',
        '热评：看得我只想说，鸿门宴最怕的不是动手，是动手不成。'
      ],
      oath: [
        '弹幕：这条线最毒，不是杀，而是把人活着钉在你设的笼子里。',
        '评论：比一刀杀掉更像真正的帝王手段。'
      ]
    },
    scenes: {
      nightvisit: {
        tag: '关键节点',
        step: 1,
        title: '项伯夜访，杀机和人情一起到了帐前',
        body:
          '夜还没亮，项伯已经先一步去给刘邦递话。范增知道这意味着什么，项羽也知道，但还没有真正拍板。原本的命运里，这一夜的犹疑最终被写成了“放虎归山”的起点。现在，你可以提前把这一层人情、杀意和名义重新排一次。',
        choices: [
          {
            label: '默许项伯通气，但布下明早的反手局',
            text: '你不堵死人情，但也不打算让它白白发生。',
            effects: {
              score: { fate: 12, control: 10, survival: 4, impact: 8 },
              npcs: {
                xiangyu: { trust: 6, leverage: 8 },
                fanzeng: { trust: 4, pressure: 8 },
                liubang: { leverage: 6, pressure: -6 }
              }
            },
            next: 'banquet'
          },
          {
            label: '直接压项伯，今夜就切断刘邦退路',
            text: '你决定把这场局从“饭桌”提前变成“绞索”。',
            effects: {
              score: { fate: 18, control: 14, survival: -6, impact: 14 },
              npcs: {
                xiangyu: { trust: -4, leverage: 10, pressure: 6 },
                fanzeng: { trust: 12, leverage: 8, pressure: 6 },
                liubang: { leverage: -8, pressure: 12 }
              }
            },
            next: 'ending-sever'
          },
          {
            label: '顺着项伯的人情，改成一场控场试探',
            text: '你想先看清刘邦到底是装怂，还是真怂。',
            effects: {
              score: { fate: 8, control: 6, survival: 10, impact: 8 },
              npcs: {
                xiangyu: { trust: 8, pressure: -2 },
                fanzeng: { trust: -8, pressure: 10 },
                liubang: { leverage: 8, pressure: -6 }
              }
            },
            next: 'banquet'
          }
        ]
      },
      banquet: {
        tag: '局势上桌',
        step: 2,
        title: '宴席未开，所有人的心思都比酒先上来了',
        body:
          '刘邦已经快到帐前。范增一心要你当场下刀，项羽却还在衡量诸侯观感与眼前威势。你知道，一旦这顿饭真的按原来的样子吃下去，后面的天下就会变成另一种麻烦。你现在不是决定一顿饭怎么吃，而是在决定以后谁有资格坐在桌边。',
        choices: [
          {
            label: '让范增布杀局，但要求项羽保留转圜名义',
            text: '你想两头都拿：动手，又不显得像赤裸裸的屠局。',
            effects: {
              score: { fate: 16, control: 16, survival: -4, impact: 14 },
              npcs: {
                xiangyu: { trust: 6, leverage: 10, pressure: 4 },
                fanzeng: { trust: 12, leverage: 10 },
                liubang: { leverage: -6, pressure: 8 }
              }
            },
            next: 'fankuai'
          },
          {
            label: '先礼后兵，逼刘邦公开交出关中姿态',
            text: '你要先抢叙事位置，再决定要不要动刀。',
            effects: {
              score: { fate: 12, control: 10, survival: 6, impact: 12 },
              npcs: {
                xiangyu: { trust: 8, leverage: 8 },
                fanzeng: { trust: -4, pressure: 8 },
                liubang: { trust: -4, pressure: 4 }
              }
            },
            next: 'fankuai'
          },
          {
            label: '干脆给出下台阶，换一个暂时可控的天下名义',
            text: '你不想在这里一刀定生死，而是想把后手留给更大的盘面。',
            effects: {
              score: { fate: 10, control: -4, survival: 16, impact: 10 },
              npcs: {
                xiangyu: { trust: 6, pressure: -4 },
                fanzeng: { trust: -12, pressure: 12 },
                liubang: { leverage: 12, pressure: -10 }
              }
            },
            next: 'ending-release'
          }
        ]
      },
      fankuai: {
        tag: '失控边缘',
        step: 3,
        title: '樊哙将入帐，整场宴局都快被撕开了',
        body:
          '樊哙一旦进来，这顿饭就再也不只是“宴席”了。项羽的迟疑会被看见，范增的急切也会被看见，刘邦的生路只会越来越多。你必须在“立刻杀”“留一线”“假放真控”之间做最后选择。',
        choices: [
          {
            label: '趁乱速决，直接把局做死',
            text: '你决定不再让这顿饭继续制造更大的变量。',
            effects: {
              score: { fate: 22, control: 18, survival: -12, impact: 18 },
              npcs: {
                xiangyu: { trust: 4, leverage: 10, pressure: 10 },
                fanzeng: { trust: 14, leverage: 12 },
                liubang: { leverage: -20, pressure: 16 }
              }
            },
            next: 'ending-sever'
          },
          {
            label: '表面放归，路上再做无名之局',
            text: '你不想脏了这一桌名义，却也不想真的放他走。',
            effects: {
              score: { fate: 18, control: 14, survival: 2, impact: 16 },
              npcs: {
                xiangyu: { trust: 6, leverage: 8 },
                fanzeng: { trust: 10, leverage: 8, pressure: 6 },
                liubang: { leverage: 4, pressure: 8 }
              }
            },
            next: 'ending-trap'
          },
          {
            label: '顺势放走，换取当前诸侯观感',
            text: '你承认这顿饭已经不适合动刀，转而保住名义和外部观感。',
            effects: {
              score: { fate: 8, control: -8, survival: 16, impact: 12 },
              npcs: {
                xiangyu: { trust: 4, pressure: -4 },
                fanzeng: { trust: -16, pressure: 12 },
                liubang: { leverage: 14, pressure: -10 }
              }
            },
            next: 'ending-release'
          },
          {
            label: '既不杀也不放，硬拖成彻底失控的局',
            text: '你想再等一个更好的时机，但所有人都已经在看你迟疑。',
            effects: {
              score: { fate: 10, control: -12, survival: 8, impact: 20 },
              npcs: {
                xiangyu: { trust: -8, leverage: -6, pressure: 12 },
                fanzeng: { trust: -10, pressure: 14 },
                liubang: { leverage: 10, pressure: 6 }
              }
            },
            next: 'ending-rupture'
          },
          {
            label: '逼刘邦当席立誓、留下人质，再放他离席',
            text: '你决定不在这里下刀，而是把这顿饭改成一纸未来的绞索。',
            effects: {
              score: { fate: 20, control: 16, survival: 8, impact: 18 },
              npcs: {
                xiangyu: { trust: 8, leverage: 10, pressure: 2 },
                fanzeng: { trust: 10, leverage: 10, pressure: 4 },
                liubang: { leverage: -2, pressure: 12 }
              }
            },
            next: 'ending-oath'
          }
        ]
      },
      'ending-sever': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你提前斩断了未来最大的变数，也把天下推进更冷的一种秩序',
        body:
          '这是一条最直接的改命线。刘邦没能从鸿门宴活着走出去，楚汉后续的天平被你硬生生提早打碎。但越是这样，越要面对另一个问题：失去了这个最大对手之后，项羽能不能真的稳住后面的天下人心？',
        endingKey: 'sever',
        badges: ['最狠', '短期最强'],
        nextTry: '下一轮试试「表面放归，路上再做无名之局」，那条线会更阴也更稳。'
      },
      'ending-trap': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你把鸿门宴从一场明杀，改成了一张更深的后手网',
        body:
          '这条线最像真正的局中高手。你没有让所有人当场撕破脸，也没有真的把刘邦完整放回去。鸿门宴没有一刀见血，却被你改成了一场更长、更冷、更有后手的绞杀。',
        endingKey: 'trap',
        badges: ['最像高手', '后手局'],
        nextTry: '下一轮试试「顺势放走，换取当前诸侯观感」，你会看到最文明也最危险的线。'
      },
      'ending-release': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你保住了名义与外部观感，也把最大的后患完整放了出去',
        body:
          '这条线最“好看”，也最让人后背发凉。你没有让鸿门宴变成赤裸裸的屠局，诸侯观感和当下名义都稳住了，但刘邦带着完整的生路离席。后面的天下，等于被你亲手延长成另一种更难收的战场。',
        endingKey: 'release',
        badges: ['最体面', '后患最大'],
        nextTry: '下一轮试试「趁乱速决，直接把局做死」，你会看到最彻底的改命线。'
      },
      'ending-rupture': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你最怕的不是杀，而是杀不成；最怕的不是放，而是拖成彻底失控',
        body:
          '这是一条最适合传播、最不适合掌控的线。鸿门宴从试探拖成了失控，所有人都看见项羽的迟疑、范增的失望和刘邦的生路。你没有改成一个干净的结局，而是把这场局炸成了更大的后患。',
        endingKey: 'rupture',
        badges: ['传播爆点', '最失控'],
        nextTry: '下一轮试试「让范增布杀局，但要求项羽保留转圜名义」，看能不能两头都拿。'
      },
      'ending-oath': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你没有杀刘邦，却把他活着钉进了你设的笼子里',
        body:
          '这条线最阴柔，也最像帝王局。你没有把鸿门宴做成一场血局，而是当席逼出誓言、人质与未来的束缚。短期里你既保住了名义，也没有让对手完整脱身，但这条线真正考验的是：你后面还能不能持续控住这个活着的威胁。',
        endingKey: 'oath',
        badges: ['最毒', '帝王手段'],
        nextTry: '下一轮试试「趁乱速决，直接把局做死」，比较“活着钉住”和“一刀了断”谁更值。'
      }
    }
  },
  shanmiao: {
    id: 'shanmiao',
    title: '风雪山神庙前夕',
    teaser: '如果你能在风雪山神庙前夕接管决策，你会让林冲当夜反杀，还是先留下能翻案的证据？',
    traits: ['冤屈反打', '高爽感', '先活命 vs 先留证'],
    hiddenEndings: 1,
    summary:
      '发配、陷害、风雪夜。你将从三个关键节点切入，决定林冲究竟是立刻断路反杀，还是先留证再翻案。',
    hook:
      '最适合传播的问题是：在风雪山神庙前夕，先活下来更重要，还是先把仇翻成一份说得清的证据更重要？',
    shareQuestion:
      '风雪山神庙前夕，先活下来更重要，还是先把仇翻成一份说得清的证据更重要？',
    scoreLabels: {
      fate: '改命度',
      proof: '证据完整',
      survival: '生还概率',
      impact: '传播张力'
    },
    verdicts: {
      high: '这是一轮把屈辱真正掰回去的强改命。',
      mid: '这是一轮很有爽感，但代价依然明显的改命。',
      low: '这轮更像看见悲剧如何合围，而不是把它完全翻过去。'
    },
    entries: [
      {
        id: 'dispatch',
        label: '发配途中',
        blurb: '押解与暗算都已经开始，你还能提前决定林冲是忍、逃，还是记证。'
      },
      {
        id: 'warehouse',
        label: '草料场被逼前',
        blurb: '调令不对，天色又坏，所有人都知道今晚不对劲，只差谁先承认。'
      },
      {
        id: 'temple',
        label: '山神庙前夕',
        blurb: '雪更大了，庙更冷了，真正的杀意终于快要走到门外。'
      }
    ],
    npcs: [
      {
        id: 'linchong',
        name: '林冲',
        role: '局中之人',
        bio: '还想讲理，但这一夜之后，理可能再也不是最有用的东西。',
        stats: { trust: 60, leverage: 38, pressure: 64 }
      },
      {
        id: 'luqian',
        name: '陆谦',
        role: '旧识背刺者',
        bio: '比刀更恶心的是熟人递来的刀，他既是仇，也是诬陷链条里最脏的一环。',
        stats: { trust: 8, leverage: 44, pressure: 48 }
      },
      {
        id: 'guanfu',
        name: '官府线人',
        role: '制度之手',
        bio: '他们不一定直接下刀，但他们会让刀看起来像一场意外。',
        stats: { trust: 16, leverage: 52, pressure: 54 }
      }
    ],
    score: {
      fate: 28,
      proof: 30,
      survival: 42,
      impact: 26
    },
    reactions: {
      sever: [
        '弹幕：这条线最爽，林冲终于没有再把自己困在旧规矩里。',
        '评论：爽是爽，但也把后路一起烧了。'
      ],
      proof: [
        '弹幕：这条线最难，却最像真正把冤翻过来。',
        '评论：不是只图一刀痛快，而是把仇和证一起拿到手。'
      ],
      exile: [
        '弹幕：活下来了，但这种活法更像把痛拖长。',
        '评论：这是最现实的一条线，也是最憋屈的一条线。'
      ],
      ruin: [
        '弹幕：这一线就是经典悲剧惯性，看着人一步步被逼到墙角。',
        '评论：最气人的不是坏人狠，是好人总想再忍一次。'
      ],
      ghost: [
        '弹幕：这条线最怪也最妙，等于把人从原剧情里整个抹掉了。',
        '评论：不是翻案，也不是硬杀，而是把林冲从那条死线里偷出来。'
      ]
    },
    scenes: {
      dispatch: {
        tag: '关键节点',
        step: 1,
        title: '发配路上，恶意已经写在每一步里',
        body:
          '林冲还没有彻底认清所有人都想把他推进死局，但押解、调令和沿途的眼色都在说明：这不是一趟正常的发配。你可以决定他是继续忍、先记、还是直接为自己找退路。',
        choices: [
          {
            label: '沿路记下所有不合规的调令与人名',
            text: '你不急着动手，先把这条冤线记成可以翻案的东西。',
            effects: {
              score: { fate: 10, proof: 16, survival: 6, impact: 8 },
              npcs: {
                linchong: { trust: 8, leverage: 8, pressure: -2 },
                luqian: { leverage: -4, pressure: 6 },
                guanfu: { leverage: -4, pressure: 4 }
              }
            },
            next: 'warehouse'
          },
          {
            label: '提前找好暗路和落脚点，只保自己活下来',
            text: '你判断今晚一定会出事，先把逃生线准备好。',
            effects: {
              score: { fate: 12, proof: -4, survival: 16, impact: 8 },
              npcs: {
                linchong: { leverage: 12, pressure: -6 },
                luqian: { leverage: 2, pressure: 2 },
                guanfu: { leverage: 4, pressure: 4 }
              }
            },
            next: 'temple'
          },
          {
            label: '继续忍下去，赌规矩里还有一线公道',
            text: '你还没有彻底放弃“只要不先越线，就还有转圜”的念头。',
            effects: {
              score: { fate: 4, proof: 4, survival: -4, impact: 10 },
              npcs: {
                linchong: { trust: 4, pressure: 10 },
                luqian: { leverage: 8, pressure: -2 },
                guanfu: { leverage: 8, pressure: -2 }
              }
            },
            next: 'warehouse'
          }
        ]
      },
      warehouse: {
        tag: '火线将起',
        step: 2,
        title: '草料场的调令不对，雪夜也不对',
        body:
          '越接近那座草料场，今晚的局越像早就写好。林冲已经能感觉到不对，只是还没决定是先查证，还是先下手。你知道，一旦等火真正烧起来，很多选择都会被缩成只剩一刀。',
        choices: [
          {
            label: '先潜回去看，确认今晚到底是谁要动手',
            text: '你要先看清仇人的脸，再决定这一刀怎么下。',
            effects: {
              score: { fate: 12, proof: 14, survival: 6, impact: 10 },
              npcs: {
                linchong: { leverage: 8, pressure: -2 },
                luqian: { pressure: 8, leverage: -4 },
                guanfu: { pressure: 6, leverage: -4 }
              }
            },
            next: 'temple'
          },
          {
            label: '不等了，先断他们的退路',
            text: '你决定把这一夜从“被人围猎”改成“先下手的人不是他们”。',
            effects: {
              score: { fate: 18, proof: -6, survival: 14, impact: 14 },
              npcs: {
                linchong: { leverage: 12, pressure: -8 },
                luqian: { leverage: -10, pressure: 10 },
                guanfu: { leverage: -8, pressure: 10 }
              }
            },
            next: 'ending-sever'
          },
          {
            label: '先把命保住，今晚不跟他们拼',
            text: '你承认眼下没有十足把握，先活过这一夜。',
            effects: {
              score: { fate: 8, proof: 6, survival: 14, impact: 8 },
              npcs: {
                linchong: { leverage: 10, pressure: -6 },
                luqian: { leverage: 6, pressure: 2 },
                guanfu: { leverage: 6, pressure: 2 }
              }
            },
            next: 'ending-exile'
          }
        ]
      },
      temple: {
        tag: '雪夜见真',
        step: 3,
        title: '山神庙前，终于轮到真相自己走进来',
        body:
          '雪压得很重，风也很重。庙外那些人的话只要再近一点，这场陷害就会彻底落到实处。你已经走到最经典的那个节点：是让林冲当夜反杀、留下证据，还是再忍一步，把自己推回更深的悲剧里。',
        choices: [
          {
            label: '听完他们的话再动手，把仇和证一起拿下',
            text: '你要的不只是杀意的出口，而是之后谁都赖不掉的证据。',
            effects: {
              score: { fate: 20, proof: 20, survival: 10, impact: 14 },
              npcs: {
                linchong: { leverage: 12, pressure: -10 },
                luqian: { leverage: -12, pressure: 12 },
                guanfu: { leverage: -10, pressure: 10 }
              }
            },
            next: 'ending-proof'
          },
          {
            label: '趁他们未备，一口气反杀断局',
            text: '你不再给这条冤线任何继续往前走的机会。',
            effects: {
              score: { fate: 22, proof: -4, survival: 18, impact: 18 },
              npcs: {
                linchong: { leverage: 16, pressure: -12 },
                luqian: { leverage: -16, pressure: 14 },
                guanfu: { leverage: -10, pressure: 10 }
              }
            },
            next: 'ending-sever'
          },
          {
            label: '还是先退，活着等别的机会',
            text: '你压住这一夜的刀，把命留给后面的流亡。',
            effects: {
              score: { fate: 8, proof: 4, survival: 12, impact: 10 },
              npcs: {
                linchong: { leverage: 8, pressure: -4 },
                luqian: { leverage: 8, pressure: -2 },
                guanfu: { leverage: 8, pressure: -2 }
              }
            },
            next: 'ending-exile'
          },
          {
            label: '再忍一步，赌他们不会真做到绝',
            text: '这是最像原本悲剧惯性的那一步。',
            effects: {
              score: { fate: 2, proof: 2, survival: -8, impact: 16 },
              npcs: {
                linchong: { pressure: 14, leverage: -6 },
                luqian: { leverage: 10, pressure: -4 },
                guanfu: { leverage: 10, pressure: -4 }
              }
            },
            next: 'ending-ruin'
          },
          {
            label: '借火势做假死，彻底脱出官府视线',
            text: '你不再追求当夜报仇，而是让林冲从这条被写好的死线里消失。',
            effects: {
              score: { fate: 18, proof: 8, survival: 22, impact: 18 },
              npcs: {
                linchong: { leverage: 14, pressure: -12 },
                luqian: { leverage: 6, pressure: 4 },
                guanfu: { leverage: 8, pressure: 2 }
              }
            },
            next: 'ending-ghost'
          }
        ]
      },
      'ending-sever': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '这一夜你让林冲终于不再只做那个被逼的人',
        body:
          '你把这一夜从“被围猎”改成了“先断局”。仇人当夜就被反杀，林冲不再继续被旧规矩牵着走。最爽，也最直接，但证据链并不完整，后面要面对的是“活下来之后，怎么解释这一刀”。',
        endingKey: 'sever',
        badges: ['最爽', '高风险'],
        nextTry: '下一轮试试「听完他们的话再动手，把仇和证一起拿下」，那条线会更像把冤翻过来。'
      },
      'ending-proof': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你没有只拿到一刀痛快，还把这桩冤攥成了说得清的证',
        body:
          '这是最难的一条线。你先把真相听全，再让这一刀落下，于是林冲拿到的不只是复仇，还有之后谁都难赖掉的证据。这条线没那么纯粹地爽，却更像真正把屈辱翻过来了。',
        endingKey: 'proof',
        badges: ['最完整', '翻案线'],
        nextTry: '下一轮试试「趁他们未备，一口气反杀断局」，看纯粹爽感会带来什么代价。'
      },
      'ending-exile': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你保住了命，却把刀和恨一起拖到了更远的地方',
        body:
          '这条线最现实，也最憋。林冲活下来了，但没有在这一夜真正把这桩仇翻过去。你保住的是后面的可能性，失去的是这一夜就能断开的干净感。',
        endingKey: 'exile',
        badges: ['最现实', '最憋屈'],
        nextTry: '下一轮试试「先潜回去看，确认今晚到底是谁要动手」，那条线更容易把仇和证一起拿到。'
      },
      'ending-ruin': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你又忍了一次，而悲剧最喜欢的就是这种再忍一次',
        body:
          '这是最像原典悲剧惯性的一条线。你没有在该动手的时候动手，也没有在该留证的时候留证，结果就是一切继续沿着最坏的方式推进。它最气人，也最能让人明白为什么这个节点值得反复改。',
        endingKey: 'ruin',
        badges: ['最气人', '悲剧惯性'],
        nextTry: '下一轮试试「不等了，先断他们的退路」，你会看到完全不同的情绪出口。'
      },
      'ending-ghost': {
        tag: '结局',
        step: 4,
        ending: true,
        title: '你没有让林冲赢回清白，而是先让他从这条死线里消失了',
        body:
          '这条线最像偷偷改命。你没有在这一夜把仇报干净，也没有拿到足够的证据翻案，而是借火、借雪、借混乱，把林冲整个人从官府预设好的结局里抹掉。它不像“赢”，却是一种更彻底的逃出生天。',
        endingKey: 'ghost',
        badges: ['最诡', '偷命线'],
        nextTry: '下一轮试试「听完他们的话再动手，把仇和证一起拿下」，比较“偷命”与“翻案”的差别。'
      }
    }
  }
};

const STORAGE_KEY = 'gaiming-juchang-archive-v1';

const state = {
  currentScriptId: 'maicheng',
  activeEntry: null,
  currentSceneId: null,
  npcs: structuredClone(scripts.maicheng.npcs),
  score: structuredClone(scripts.maicheng.score),
  path: [],
  labels: [],
  archive: loadArchive()
};

const el = {
  start: document.querySelector('#start-demo'),
  reset: document.querySelector('#reset-demo'),
  scriptTitle: document.querySelector('#script-title'),
  scriptSummary: document.querySelector('#script-summary'),
  scriptStats: document.querySelector('#script-stats'),
  scriptList: document.querySelector('#script-list'),
  entryList: document.querySelector('#entry-list'),
  audienceMode: document.querySelector('#audience-mode'),
  sceneTag: document.querySelector('#scene-tag'),
  sceneProgress: document.querySelector('#scene-progress'),
  sceneTitle: document.querySelector('#scene-title'),
  sceneBody: document.querySelector('#scene-body'),
  sceneEffects: document.querySelector('#scene-effects'),
  sceneHook: document.querySelector('#scene-hook'),
  choices: document.querySelector('#choices'),
  ending: document.querySelector('#ending'),
  npcList: document.querySelector('#npc-list'),
  scoreBars: document.querySelector('#score-bars'),
  archiveList: document.querySelector('#archive-list')
};

function getEndingCount(script) {
  return Object.values(script.scenes).filter((scene) => scene.ending).length;
}

function getCurrentScript() {
  return scripts[state.currentScriptId];
}

function loadArchive() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function saveArchive() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.archive));
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function escapeAttr(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderScripts() {
  const counts = state.archive.reduce((acc, item) => {
    acc[item.script] = (acc[item.script] || 0) + 1;
    return acc;
  }, {});
  el.scriptList.innerHTML = Object.values(scripts)
    .map(
      (script) => `
        <button class="entry-card script-choice ${state.currentScriptId === script.id ? 'is-active' : ''}" data-script="${script.id}">
          <strong>${script.title}</strong>
          <span>${script.teaser}</span>
          <div class="script-choice__traits">
            ${script.traits.map((trait) => `<span class="script-pill">${trait}</span>`).join('')}
          </div>
          <div class="script-choice__stats">
            <span class="script-choice__stat">${script.entries.length} 个切入点</span>
            <span class="script-choice__stat">${getEndingCount(script)} 个结局</span>
            <span class="script-choice__stat">${script.hiddenEndings} 个隐藏结局</span>
          </div>
          <div class="script-choice__meta">
            <span>已打出结局 ${counts[script.title] || 0} 次</span>
            <span>当前公开可玩</span>
          </div>
        </button>
      `
    )
    .join('');
}

function renderEntries() {
  const script = getCurrentScript();
  el.entryList.innerHTML = script.entries
    .map(
      (entry) => `
        <button class="entry-card ${state.activeEntry === entry.id ? 'is-active' : ''}" data-entry="${entry.id}">
          <strong>${entry.label}</strong>
          <span>${entry.blurb}</span>
        </button>
      `
    )
    .join('');
}

function renderNpcs() {
  el.npcList.innerHTML = state.npcs
    .map((npc) => {
      const meters = [
        ['信任', npc.stats.trust, 'meter__fill'],
        ['筹码', npc.stats.leverage, 'meter__fill meter__fill--teal'],
        ['压力', npc.stats.pressure, 'meter__fill meter__fill--red']
      ]
        .map(
          ([label, value, className]) => `
            <div>
              <div class="meter__row"><span>${label}</span><span>${value}</span></div>
              <div class="meter__track"><div class="${className}" style="width:${value}%"></div></div>
            </div>
          `
        )
        .join('');

      return `
        <article class="npc-card">
          <div class="npc-card__head">
            <div>
              <div class="npc-card__name">${npc.name}</div>
              <div class="npc-card__role">${npc.role}</div>
            </div>
          </div>
          <div class="npc-card__body">${npc.bio}</div>
          <div class="npc-meters">${meters}</div>
        </article>
      `;
    })
    .join('');
}

function renderScore() {
  const labels = getCurrentScript().scoreLabels;
  el.scoreBars.innerHTML = Object.entries(state.score)
    .map(
      ([key, value]) => `
        <div class="bar">
          <div class="bar__head"><span>${labels[key]}</span><span>${value}</span></div>
          <div class="meter__track"><div class="meter__fill" style="width:${value}%"></div></div>
        </div>
      `
    )
    .join('');
}

function renderArchive() {
  if (!state.archive.length) {
    el.archiveList.innerHTML = '<div class="archive-empty">你的结局会显示在这里，方便比较不同改命路线。</div>';
    return;
  }

  el.archiveList.innerHTML = state.archive
    .slice(0, 6)
    .map(
      (item) => `
        <article class="archive-card">
          <div class="archive-card__head">
            <strong>${item.script}</strong>
            <span>${item.total}/100</span>
          </div>
          <div class="archive-card__title">${item.ending}</div>
          <div class="archive-card__meta">${item.route}</div>
        </article>
      `
    )
    .join('');
}

function applyEffects(effects) {
  if (!effects) return;

  if (effects.score) {
    Object.entries(effects.score).forEach(([key, delta]) => {
      state.score[key] = clamp(state.score[key] + delta);
    });
  }

  if (effects.npcs) {
    Object.entries(effects.npcs).forEach(([npcId, stats]) => {
      const npc = state.npcs.find((item) => item.id === npcId);
      if (!npc) return;
      Object.entries(stats).forEach(([statKey, delta]) => {
        npc.stats[statKey] = clamp(npc.stats[statKey] + delta);
      });
    });
  }
}

function buildShareText(scene, total, topNpc) {
  const script = getCurrentScript();
  return [
    `我在《改命剧场》里打出的结局是：${script.title} / ${scene.title}`,
    `总评 ${total}/100。`,
    Object.entries(state.score)
      .map(([key, value]) => `${script.scoreLabels[key]} ${value}`)
      .join('，') + '。',
    `本轮最受影响的人物：${topNpc.name}。`,
    `我的决策路线：${state.labels.join(' -> ')}。`,
    `问题是：${script.shareQuestion}`
  ].join(' ');
}

function buildRouteSummary() {
  if (!state.labels.length) return '';
  return state.labels
    .map((label, index) => `<li><span class="route__index">${index + 1}</span><span>${label}</span></li>`)
    .join('');
}

function getVerdict(total) {
  const verdicts = getCurrentScript().verdicts;
  if (total >= 75) return verdicts.high;
  if (total >= 55) return verdicts.mid;
  return verdicts.low;
}

function storeEnding(scene, total) {
  state.archive.unshift({
    script: getCurrentScript().title,
    ending: scene.title,
    total,
    route: state.labels.join(' -> ')
  });
  state.archive = state.archive.slice(0, 10);
  saveArchive();
  renderArchive();
}

function buildEndingSummary(scene) {
  const script = getCurrentScript();
  const total = Math.round(
    Object.values(state.score).reduce((sum, value) => sum + value, 0) / Object.keys(state.score).length
  );

  const scoreLines = Object.entries(state.score)
    .map(([key, value]) => `<li>${script.scoreLabels[key]}：${value}</li>`)
    .join('');

  const topNpc = [...state.npcs].sort(
    (a, b) => b.stats.trust + b.stats.leverage - (a.stats.trust + a.stats.leverage)
  )[0];

  const audience = el.audienceMode.checked
    ? `<div class="ending__reactions"><strong>观众反响模拟</strong><br />${script.reactions[
        scene.endingKey
      ].join('<br />')}</div>`
    : '';

  const shareText = escapeAttr(buildShareText(scene, total, topNpc));
  const routeSummary = buildRouteSummary();
  const verdict = getVerdict(total);
  const badges = (scene.badges || [])
    .map((badge) => `<span class="ending__badge">${badge}</span>`)
    .join('');
  const nextTry = scene.nextTry
    ? `<div class="ending__next"><strong>下一轮建议：</strong>${scene.nextTry}</div>`
    : '';

  storeEnding(scene, total);

  return `
    <h3>${scene.title}</h3>
    <div class="ending__badges">${badges}</div>
    <p>${scene.body}</p>
    <p><strong>本轮总评：</strong>${total} / 100</p>
    <p><strong>结算判断：</strong>${verdict}</p>
    <ul>${scoreLines}</ul>
    <p><strong>本轮最受你选择影响的人物：</strong>${topNpc.name}</p>
    <div class="ending__route">
      <strong>你的决策路线</strong>
      <ol class="route">${routeSummary}</ol>
    </div>
    <p><strong>适合传播的一句话总结：</strong>${script.shareQuestion}</p>
    <div class="ending__actions">
      <button class="button button--small button--primary" data-copy-share="${shareText}">复制结果文案</button>
      <button class="button button--small button--ghost" data-restart="true">换个选择再试</button>
    </div>
    <div id="share-status" class="share-status">复制后就能直接发到 B 站动态、微博、小红书或群聊。</div>
    ${nextTry}
    ${audience}
  `;
}

function renderScene(sceneId, effectText = '') {
  const scene = getCurrentScript().scenes[sceneId];
  state.currentSceneId = sceneId;
  el.sceneTag.textContent = scene.tag;
  el.sceneProgress.textContent = `第 ${scene.step} 幕`;
  el.sceneTitle.textContent = scene.title;
  el.sceneBody.textContent = scene.body;
  el.sceneEffects.textContent = effectText;
  el.ending.classList.add('hidden');

  if (scene.ending) {
    el.choices.innerHTML = '';
    renderEnding(scene);
    return;
  }

  el.choices.innerHTML = scene.choices
    .map(
      (choice, index) => `
        <button class="choice" data-scene-choice="${index}">
          <strong>${choice.label}</strong>
          <span>${choice.text}</span>
        </button>
      `
    )
    .join('');
}

function renderEnding(scene) {
  el.ending.innerHTML = buildEndingSummary(scene);
  el.ending.classList.remove('hidden');
}

function setScript(scriptId) {
  state.currentScriptId = scriptId;
  resetDemo();
}

function startFromEntry(entryId) {
  state.activeEntry = entryId;
  state.path = [entryId];
  const entry = getCurrentScript().entries.find((item) => item.id === entryId);
  state.labels = entry ? [entry.label] : [];
  renderEntries();
  renderScene(entryId);
}

function handleChoice(index) {
  const scene = getCurrentScript().scenes[state.currentSceneId];
  const choice = scene.choices[index];
  const effectText = `你选择了「${choice.label}」，历史正在重新结算。`;
  applyEffects(choice.effects);
  renderNpcs();
  renderScore();
  state.path.push(choice.next);
  state.labels.push(choice.label);
  renderScene(choice.next, effectText);
}

function resetDemo() {
  const script = getCurrentScript();
  state.activeEntry = null;
  state.currentSceneId = null;
  state.path = [];
  state.labels = [];
  state.npcs = structuredClone(script.npcs);
  state.score = structuredClone(script.score);

  el.scriptTitle.textContent = script.title;
  el.scriptSummary.textContent = script.summary;
  document.querySelector('#script-question').textContent = script.shareQuestion;
  document.querySelector('#script-traits').innerHTML = script.traits
    .map((trait) => `<span class="script-pill">${trait}</span>`)
    .join('');
  el.scriptStats.innerHTML = `
    <div class="script-stat">
      <div class="script-stat__value">${script.entries.length}</div>
      <div class="script-stat__label">切入点</div>
    </div>
    <div class="script-stat">
      <div class="script-stat__value">${getEndingCount(script)}</div>
      <div class="script-stat__label">结局数</div>
    </div>
    <div class="script-stat">
      <div class="script-stat__value">${script.hiddenEndings}</div>
      <div class="script-stat__label">隐藏结局</div>
    </div>
  `;
  el.sceneTag.textContent = '初始节点';
  el.sceneProgress.textContent = '第 0 幕';
  el.sceneTitle.textContent = '请选择一个关键节点切入';
  el.sceneBody.textContent = '这个原型不追求世界观铺陈，只验证一件事：当玩家进入一个大家都熟悉、也都忍不住想改的节点时，会不会立刻产生“让我试一次”的冲动。';
  el.sceneEffects.textContent = '';
  el.sceneHook.textContent = script.hook;
  el.choices.innerHTML = '';
  el.ending.classList.add('hidden');
  renderScripts();
  renderEntries();
  renderNpcs();
  renderScore();
  renderArchive();
}

el.scriptList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-script]');
  if (!button) return;
  setScript(button.dataset.script);
});

el.entryList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-entry]');
  if (!button) return;
  startFromEntry(button.dataset.entry);
});

el.choices.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-scene-choice]');
  if (!choice) return;
  handleChoice(Number(choice.dataset.sceneChoice));
});

el.ending.addEventListener('click', async (event) => {
  const restart = event.target.closest('[data-restart]');
  if (restart) {
    resetDemo();
    return;
  }

  const copyShare = event.target.closest('[data-copy-share]');
  if (!copyShare) return;

  const status = document.querySelector('#share-status');
  try {
    await navigator.clipboard.writeText(copyShare.dataset.copyShare);
    if (status) status.textContent = '结果文案已复制，可以直接发出去。';
  } catch (error) {
    if (status) status.textContent = '浏览器未允许剪贴板复制，请手动复制结算文案。';
  }
});

el.start.addEventListener('click', () => {
  if (state.activeEntry) {
    renderScene(state.activeEntry);
    return;
  }
  startFromEntry(getCurrentScript().entries[0].id);
});

el.reset.addEventListener('click', resetDemo);

resetDemo();
