import type { Language, TranslationSet } from './types'

const copy: Record<Language, TranslationSet> = {
  en: {
    brandEyebrow: 'little dog',
    brandTitle: 'a warm little place with a tiny bit of missing you',
    navHome: 'Home',
    navWorld: 'Chat',
    navNotes: 'Notes',
    navDiary: 'little logs',
    navLittle: 'come!',
    langButton: '中文',
    modeDay: 'day mode · full of energy',
    modeNight: 'night mode · sooo sleepy(yawning)',
    dogBadgeDay: 'awake · tail wagging',
    dogBadgeNight: 'sleepy · about to cause trouble',

    homeEyebrow: 'okay okay listen up!!',
    homeTitle: 'i made a little place for you.',
    homeSub:
      'it’s not anything big. just a small place you can come to, so you don’t feel alone.\n\nit’s not loud or overwhelming. just warm, a little silly, and kinda cute. whenever you feel like coming, it’ll be here.',
    enter: 'Enter',
    lookAround: 'Look around a bit',
    missionLabel: 'ahem!! attention please!!!',
    missionText: 'i might not be there with you right now, but at least there’s a little dog here keeping you company(hehe).',
    dogLabel: 'companion mode',
    dogEmojiAwake: '🐶 way too energetic(don’t find me annoying pls)',
    dogEmojiSleepy: '😴 extremely sleepy(emotionally unstable)',
    dogCaptionAwake:
      'a warm dog with terrible self-control around treats, but excellent instincts when it comes to staying near someone.',
    dogCaptionSleepy:
      'it’s probably getting sleepy… also a reminder for you to rest early!',
    tinyNote:
      'ZOEEE what did you even make???:\nrelax! this is a quiet, cozy place—no chaos allowed. i’ve got a little talking dog here. it’s kind, cute, and… i think it really likes you.(it’s also the smartest dog in the entire world)',

    chatTitle: 'the dog has something to say again',
    chatSub: 'she’s probably missing you again, so go talk to her rn!',
    reminderTitle: 'dog reminders',
    reminderSub: 'not nagging, these are actually very important things',
    reminder1: 'drink water!!',
    reminder2: 'please don’t skip meals!!',
    reminder3: 'resting is not being lazy!!',
    secretTitle: 'little secret lines',
    secretSub: 'a few small lines quietly left here.',
    secretButton: 'maybe click and see?',
    secretPlaceholder: 'nothing here… stop looking…',
    cycleTitle: 'mood cycle(why is it switching??)',
    cycleSub: 'why is time moving so fast here?? it just got dark??(1 min later)wait… now it’s daytime again??',
    cycleDayLabel: 'day:',
    cycleDayText: 'soft, bright, awake',
    cycleNightLabel: 'night:',
    cycleNightText: 'quieter, dimmer, sleepy',

    treatTitle: 'i’ve been waiting here this whole time, i deserve a reward!',
    treat1: 'give steak',
    treat2: 'give bone',
    treat3: 'some water',
    btnHowAreYou: 'heyy, how have you been?',
    btnStay: 'this is nice, i’ll stay a bit longer',
    btnProud: 'i want some encouragement!',

    notesEyebrow: 'Notes for you',
    notesTitle: 'some small things i wanted to tell you',
    notesSub:
      'take it easy, i’ve got you, just slow down a bit.',
    notesFooter:
      'just wanna tell u: eat well, rest well, take a deep breath, and keep moving forward.',

    diaryEyebrow: 'Dog diary',
    diaryTitle: 'i have too much to say, so… diary it is',
    diarySub:
      'woofwoofwoofwoofwoof',

    littleEyebrow: 'Fun little interactions',
    littleTitle: 'follow the prompts!',
    littleSub: 'hover, click, pause. this page is trying to feel nice to be inside.',

    littleCards: [
      {
        tag: 'Hover',
        title: 'hover here',
        text: 'she is trying to get your attention.',
        hidden: 'the dog scooted forward a little… but pretended nothing happened.',
        mode: 'hover',
      },
      {
        tag: 'Click',
        title: 'click me!!!',
        text: 'only care about people who treat you gently',
        hidden: 'you don’t have to be perfect to deserve kindness.',
        mode: 'click',
      },
      {
        tag: 'Pause',
        title: 'stay a second',
        text: 'there is no rush in here.',
        hidden: 'the dog believes sitting quietly together counts as a real activity.',
        mode: 'hover',
      },
      {
        tag: 'Click',
        title: 'hey, i care!',
        text: 'i like coke, and sprite, and coke, and sprite.',
        hidden: 'the waiting was not 100% patient, but it was emotionally sincere.',
        mode: 'click',
      },
      {
        tag: 'Hover',
        title: 'good energy checkpoint',
        text: 'progress does not always look shiny from the inside.',
        hidden: 'you’re doing better than you think.',
        mode: 'hover',
      },
      {
        tag: 'Click',
        title: 'pocket-sized comfort',
        text: 'it’s okay to just be a person today.',
        hidden: 'the dog has officially approved your existence.',
        mode: 'click',
      },
    ],

    noteCards: [
      {
        index: 'note1',
        title: 'take care of yourself!',
        items: ['go to bed earlier', 'don’t stay hungry for too long', 'relax your shoulders a bit', 'being tired is not failure'],
      },
      {
        index: 'note2',
        title: 'for hard days',
        items: ['small progress still counts', 'resting is allowed', 'you don’t have to be perfect to deserve kindness', 'today can be simple'],
      },
      {
        index: 'note3',
        title: 'from the dog',
        items: ['i’m proud of you', 'i miss you and i care about you', 'please imagine one approving tail wag', 'you are very keepable'],
      },
      {
        index: 'note4',
        title: 'gentle rules',
        items: ['no being mean to yourself before lunch', 'music helps more than doomscrolling', 'a snack is a strategy', 'you can start again later'],
      },
    ],

    diaryEntries: [
      {
        day: 'day 12',
        title: 'i feel a little tired',
        body: 'not an overwhelming kind of tired… just a quiet heaviness. i probably need some stillness. also, i miss you.',
      },
      {
        day: 'day 18',
        title: 'i had a really genuine laugh today',
        body: 'it was short, but real. worth writing down. some moments are meant to be kept, just to stay warm for a bit. still thinking of you.',
      },
      {
        day: 'day 23',
        title: 'so many things i can’t really say out loud',
        body: 'sometimes there’s just more inside than what comes out. maybe it’s time for some tea, a snack, and a long nap.',
      },
      {
        day: 'day 31',
        title: 'mission update',
        body: 'current plan remains the same: cherish what i have, stay present, as always.',
      },
    ],

    introScript: [
      'i missed you again (woof woof)',
      'like really missed you. seriously!!',
      'and then i was like',
      'what if you show up here',
      'and YOU DID',
      'okay that’s actually kinda cool',
      'how was your day today?',
      'i miss you',
      'don’t forget to text me!',
      'and say you miss me too!',
      'as for me',
      '“i just hope you’re feeling good, everything’s good, and it stays that way',
      'also',
      'i deserve a treat for waiting!',
      'i waited VERY patiently(this is not true)',
    ],

    postTreatLines: [
      'hehe',
      'yayyyyyy',
      'i got fed again!',
      'by the way, are you tired?',
      'you can stay here a bit longer if you want',
      'i won’t talk too much(i might talk a little)',
    ],

    proudLines: [
      'hey come on!!!',
      'you’re doing way better than you think',
      'and i’m kinda proud of you!',
    ],

    specialLines: [
      'honestly: i made this place hoping it would make you smile!',
      'small truth: warmth can actually be made on purpose (just like... this page!).',
      'the dog secretly thinks: being near you would probably fix at least 14% of everything.',
    ],

    earSecrets: [
      'wait how did you find this?? reward: i hope today is kind to you.',
      'dog confession: the ears are sensitive, the loyalty is permanent.',
      'special message unlocked: this page is gentle on purpose.',
    ],

    chatUserHowAreYou: 'how have you been lately?',
    chatDogHowAreYou: "i'm fine. just thinking about you.",
    chatUserStay: 'i think i’ll stay a bit longer',
    chatDogStay: 'that hits exactly… you have no idea how lonely it gets when you’re not here.',
    chatUserProud: 'i need some encouragement',
    chatLate: "hey… it’s getting kinda late.\nyou should probably rest a bit.",
    chatMorning: "GOOD MORNING!\ni’m awake again!",
    stayed1: 'yeahhh you actually stayed!',
    stayed2: 'i’m so soooooo happyyyyyyy!',

    treatUserPrefix: 'here u gooo',
    toastPrefix: 'little surprise:',
    stayedToast: 'you stayed. that makes the dog happy.',
  },

  zh: {
    brandEyebrow: '小狗狗',
    brandTitle: '一个温暖又带着一点想念的小地方',
    navHome: '首页',
    navWorld: '聊天',
    navNotes: 'notes',
    navDiary: '小日志',
    navLittle: '来！',
    langButton: 'EN',
    modeDay: '白天模式 · 完全活力四射',
    modeNight: '夜晚模式 · 困困困困（打哈欠）',
    dogBadgeDay: '清醒 · 尾巴在线',
    dogBadgeNight: '困困 · 开始骚扰',

    homeEyebrow: '注意了注意了！',
    homeTitle: '我给你做了个小地方。',
    homeSub:
      '这也不是什么很大的东西。\n只是一个小小的地方，觉得孤单的时候永远可以来这儿。\n\n这也不闹腾，也不会很吵。暖暖地，笨笨地，还有点可爱。你想来的时候，它都在。',
    enter: '进入',
    lookAround: '随便先看看',
    missionLabel: '咳咳咳咳！注意了注意了！！！',
    missionText: '虽然现在不在你身边，好在这里还有一只小狗子陪着你（嘿嘿）',
    dogLabel: '狗子状态',
    dogEmojiAwake: '🐶 精神死了（别嫌我吵）',
    dogEmojiSleepy: '😴 困死了（情绪不稳定中）',
    dogCaptionAwake:
      '这是一只对零食毫无抵抗力、但不会被轻易拐走的乖狗子。',
    dogCaptionSleepy:
      '它估计是有点儿困了，也顺便提醒你要早点休息！',
    tinyNote:
      '王晓迪你到底做了个什么玩意？？？：\n\n别急！这是个非常安静温馨的地方，不许吵吵。\n我在这养了一只会讲话的小狗，它很善良很可爱而且我发现它好像很喜欢你！（这是一只全世界无敌聪明的小狗子）',

    chatTitle: '狗子又要讲话了',
    chatSub: '它肯定是又想你了，快来和它说说话吧',
    reminderTitle: '狗子关心',
    reminderSub: '真不是唠叨，这些确实是非常非常重要的事。',
    reminder1: '记得喝水！',
    reminder2: '千万别不吃饭，哪怕吃一点呢！',
    reminder3: '休息可不是偷懒，我觉得你现在就得睡会儿！',
    secretTitle: '神秘小句子',
    secretSub: '这里有几句小小的、偷偷放着的话。',
    secretButton: '不妨点一下试试？',
    secretPlaceholder: '啥也没有别看了。。。',
    cycleTitle: '情绪光线（什么玩意儿一会亮一会暗）',
    cycleSub: '这里时间过的怎么这么快！怎么天黑了？（一分钟后）诶好像天又白天了！',
    cycleDayLabel: '大白天：',
    cycleDayText: '狗子我醒着呢！感觉现在有点精力过盛',
    cycleNightLabel: '夜晚总是黑咕隆咚：',
    cycleNightText: '好安静、困困的。。。',

    treatTitle: '狗子我一直等你来，没有功劳也有苦劳，申请奖励',
    treat1: '给肉排',
    treat2: '给骨头',
    treat3: '给点水喝',
    btnHowAreYou: '小狗儿你最近怎么样啊',
    btnStay: '这儿真好，我决定多待会儿',
    btnProud: '我想听点鼓励的话！',

    notesEyebrow: '给你的小纸条',
    notesTitle: '一些要说给你听的小话！',
    notesSub:
      '其实就是顺手留在这里的纸条。别浮躁了，我帮你安静下来。',
    notesFooter:
      '只是想说：按时吃饭、好好休息、深呼吸，然后继续往前走。',

    diaryEyebrow: '小狗日记',
    diaryTitle: '狗子我表达欲真旺盛，还得写日记',
    diarySub:
      '汪汪汪汪汪汪汪。',

    littleEyebrow: '好玩小互动嘿嘿嘿',
    littleTitle: '快按照提示做！',
    littleSub: '停一下、点一下、看一下。呆在这绝对不无聊哈哈哈哈',

    littleCards: [
      {
        tag: '悬停',
        title: '把鼠标放这里',
        text: '我就在这待着，能怎么着',
        hidden: '小狗往前挪了一点，但假装什么也没发生。',
        mode: 'hover',
      },
      {
        tag: '点击',
        title: '点一下！！！',
        text: '只在意能够温柔接住你的人！',
        hidden: '你不需要把一切都处理得很好，才值得被温柔对待。',
        mode: 'click',
      },
      {
        tag: '停留',
        title: '在这里待一下',
        text: '这儿可不能急。',
        hidden: '小狗觉得能安静地待着，本来就是一件很重要的事。',
        mode: 'hover',
      },
      {
        tag: '点击',
        title: '狗子我在意！',
        text: '喜欢喝可乐雪碧可乐雪碧。',
        hidden: '它等得并不算耐心，但感情上很真诚。',
        mode: 'click',
      },
      {
        tag: '悬停',
        title: '狗子我嗅觉灵敏，让我检查一下你的状态',
        text: '不错不错！有些进步，不过从里面看不一定很闪亮。',
        hidden: '其实你做得比自己想的要好。',
        mode: 'hover',
      },
      {
        tag: '点击',
        title: '口袋大小的安慰',
        text: '今天只是当一个普通人，也完全可以。',
        hidden: '天空飘来五个字儿”那都不是事“。',
        mode: 'click',
      },
    ],

    noteCards: [
      {
        index: '纸条1',
        title: '照顾好自己！',
        items: ['早睡觉', '不要空着肚子太久', '快给肩膀放松一下', '累不是失败'],
      },
      {
        index: '纸条2',
        title: '又觉得不顺心了？',
        items: ['活着就是进步', '谁敢不让你休息', '你不用先变得完美才值得被温柔对待', '今天简单一点，当然没关系'],
      },
      {
        index: '纸条3',
        title: '来自小狗',
        items: ['我确实有点为你骄傲', '我会想你', '想象一下有只哈巴狗在冲你摇尾巴', '你很值得被喜欢'],
      },
      {
        index: '纸条4',
        title: '温柔规则',
        items: ['早起不来就继续睡吧，我的经验是下午再开始做事才高效', '听点歌绝对比刷太多东西有用', '吃点好好也是策略', '你存在，真好（狗子对你讲）'],
      },
    ],

    diaryEntries: [
      {
        day: '第 12 天',
        title: '我感觉有点累',
        body: '不是那种很夸张的累，就是感觉有点沉，需要点安静。哎哟，想你。',
      },
      {
        day: '第 18 天',
        title: '今天笑的真开心',
        body: '今天有一个很短但很真的笑。值得记录！因为有些瞬间，就是应该被好好留下来，暖一会儿。依旧想你。',
      },
      {
        day: '第 23 天',
        title: '感觉自己好多说不出的话',
        body: '竟然有时候自己心里装着的事比说出来的要多。是时候给自己安排：热茶、点心、还有一场很长的觉。',
      },
      {
        day: '第 31 天',
        title: '任务进度',
        body: '目前计划没有变化：永远珍惜拥有的东西，活在当下。',
      },
    ],

    introScript: [
      '狗子我又想你了（汪汪汪）',
      '就是想就是想就是想！实打实！！！',
      '然后我就期待着你能来这看看我',
      '我就想着，万一你真来这儿了呢',
      '结果你真的来了！！！',
      '这简直太酷了！',
      '你今天过的怎么样呀？',
      '我好想你啊',
      '记得给我发个消息！',
      '记得说你也想我！',
      '我呢',
      '我，希望你，心情很好，什么都好，而且一直好！',
      '还有',
      '我觉得我等你等得很辛苦',
      '所以我应该得到一点奖励！',
      '我等得非常有耐心（实则不然）',
    ],

    postTreatLines: [
      '嘿嘿',
      '耶耶耶耶耶',
      '又被投喂了！',
      '对了，你累吗？',
      '其实你可以在这儿再多待一会儿',
      '我不会说很多话（实则不然）'
    ],

    proudLines: [
      '拜托大姐！！！',
      '你其实做得比自己想的好特别特别多',
      '而且，其实，我真的有一点点为你骄傲',
    ],

    specialLines: [
      '实话栏目：做这个地方呢，就是希望你打开的时候会稍微开心一点。',
      '一个很小的事实：其实温暖是可以被认真做出来的（比如这个页面哈哈哈哈哈哈）。',
      '小狗偷偷想：如果能待在你旁边，很多事情可能都会变得稍微好一点。',
    ],

    earSecrets: [
      '哇塞你怎么知道这有彩蛋？？奖励：一句很轻的话“希望今天对你温柔一点”',
      '小狗自白：耳朵很敏感，忠诚是永久的。',
      '哈哈哈哈！隐藏句子解锁：这个弹窗的温柔不是意外，是故意的。',
    ],

    chatUserHowAreYou: '你最近怎么样呀',
    chatDogHowAreYou: '我最近挺好的，但，就是有点想你。',
    chatUserStay: '我计划再待一会儿',
    chatDogStay: '你这句话完全说我点上了，你都不知道你不在的时候我有多孤单。',
    chatUserProud: '我想听点鼓励的话',
    chatLate: '诶，天好像有点晚了。\n看来你该休息一下了',
    chatMorning: '嘿嘿早啊！\n我又醒啦！',
    stayed1: 'yeahhh你竟然留下来了。',
    stayed2: '我好开心好开心！',

    treatUserPrefix: '给你点',
    toastPrefix: '小惊喜：',
    stayedToast: '你停留了一会儿，这会让小狗开心。',
  },
}

export default copy