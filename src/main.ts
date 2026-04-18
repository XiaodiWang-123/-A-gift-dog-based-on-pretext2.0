import './style.css'
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext'

type ScreenName = 'home' | 'world' | 'notes' | 'diary' | 'little'
type MessageSender = 'dog' | 'user' | 'system'
type Language = 'en' | 'zh'

type NoteCard = {
  index: string
  title: string
  items: string[]
}

type DiaryEntry = {
  day: string
  title: string
  body: string
}

type TranslatedChatToken =
  | { kind: 'raw'; value: string }
  | { kind: 'intro'; index: number }
  | { kind: 'postTreat'; index: number }
  | { kind: 'proud'; index: number }
  | { kind: 'chatUserHowAreYou' }
  | { kind: 'chatDogHowAreYou' }
  | { kind: 'chatUserStay' }
  | { kind: 'chatDogStay' }
  | { kind: 'chatUserProud' }
  | { kind: 'chatLate' }
  | { kind: 'chatMorning' }
  | { kind: 'stayed1' }
  | { kind: 'stayed2' }
  | { kind: 'treatUser'; treat: string }

type ChatMessage = {
  id: string
  sender: MessageSender
  token: TranslatedChatToken
}

type TranslationSet = {
  brandEyebrow: string
  brandTitle: string
  navHome: string
  navWorld: string
  navNotes: string
  navDiary: string
  navLittle: string
  langButton: string
  modeDay: string
  modeNight: string
  dogBadgeDay: string
  dogBadgeNight: string

  homeEyebrow: string
  homeTitle: string
  homeSub: string
  enter: string
  lookAround: string
  missionLabel: string
  missionText: string
  dogLabel: string
  dogEmojiAwake: string
  dogEmojiSleepy: string
  dogCaptionAwake: string
  dogCaptionSleepy: string
  tinyNote: string

  chatTitle: string
  chatSub: string
  reminderTitle: string
  reminderSub: string
  reminder1: string
  reminder2: string
  reminder3: string
  secretTitle: string
  secretSub: string
  secretButton: string
  secretPlaceholder: string
  cycleTitle: string
  cycleSub: string
  cycleDayLabel: string
  cycleDayText: string
  cycleNightLabel: string
  cycleNightText: string

  treatTitle: string
  treat1: string
  treat2: string
  treat3: string
  btnHowAreYou: string
  btnStay: string
  btnProud: string

  notesEyebrow: string
  notesTitle: string
  notesSub: string
  notesFooter: string

  diaryEyebrow: string
  diaryTitle: string
  diarySub: string

  littleEyebrow: string
  littleTitle: string
  littleSub: string

  littleCards: {
    tag: string
    title: string
    text: string
    hidden: string
    mode: 'hover' | 'click'
  }[]

  noteCards: NoteCard[]
  diaryEntries: DiaryEntry[]

  introScript: string[]
  postTreatLines: string[]
  proudLines: string[]
  specialLines: string[]
  earSecrets: string[]

  chatUserHowAreYou: string
  chatDogHowAreYou: string
  chatUserStay: string
  chatDogStay: string
  chatUserProud: string
  chatLate: string
  chatMorning: string
  stayed1: string
  stayed2: string

  treatUserPrefix: string
  toastPrefix: string
  stayedToast: string
}

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

    treatUserPrefix: 'gave you a treat',
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
      '我，希望你，心情很好，什么都好，而且一直好！”',
      '还有',
      '我觉得我等你等得很辛苦',
      '所以我应该得到一点奖励！',
      '我等得非常有耐心（其实没有）',
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

    treatUserPrefix: '给了你一个',
    toastPrefix: '小惊喜：',
    stayedToast: '你停留了一会儿，这会让小狗开心。',
  },
}

const PRETEXT_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif'
const PRETEXT_SIZE = 15
const PRETEXT_LINE_HEIGHT = 24
const BUBBLE_PAD_X = 32
const BUBBLE_PAD_Y = 28
const BUBBLE_MIN_WIDTH = 132
const BUBBLE_MAX_WIDTH = 290
const CARD_TEXT_FONT = `500 14px ${PRETEXT_FONT}`

const preparedCache = new Map<string, ReturnType<typeof prepareWithSegments>>()

let currentLanguage: Language = 'en'
let currentScreen: ScreenName = 'home'
let worldStarted = false
let chatRunning = false
let treatStepShown = false
let stayedMessageShown = false
let isNight = false
let cycleIntervalId: number | null = null
let messageCounter = 0
let toastTimeout: number | null = null

let cursorTargetX = window.innerWidth / 2
let cursorTargetY = window.innerHeight / 2
let cursorRenderX = cursorTargetX
let cursorRenderY = cursorTargetY

let pointerEffectsBound = false
let cursorAnimationStarted = false
let stayedTimerStarted = false

let chatHistory: ChatMessage[] = []

function getPrepared(text: string, font: string) {
  const key = `${font}__${text}`
  const cached = preparedCache.get(key)
  if (cached) return cached
  const prepared = prepareWithSegments(text, font)
  preparedCache.set(key, prepared)
  return prepared
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

function randomFrom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function t(): TranslationSet {
  return copy[currentLanguage]
}

function resolveChatText(token: TranslatedChatToken): string {
  const c = t()

  switch (token.kind) {
    case 'raw':
      return token.value
    case 'intro':
      return c.introScript[token.index] ?? ''
    case 'postTreat':
      return c.postTreatLines[token.index] ?? ''
    case 'proud':
      return c.proudLines[token.index] ?? ''
    case 'chatUserHowAreYou':
      return c.chatUserHowAreYou
    case 'chatDogHowAreYou':
      return c.chatDogHowAreYou
    case 'chatUserStay':
      return c.chatUserStay
    case 'chatDogStay':
      return c.chatDogStay
    case 'chatUserProud':
      return c.chatUserProud
    case 'chatLate':
      return c.chatLate
    case 'chatMorning':
      return c.chatMorning
    case 'stayed1':
      return c.stayed1
    case 'stayed2':
      return c.stayed2
    case 'treatUser':
      return `${c.treatUserPrefix} ${token.treat}`
    default:
      return ''
  }
}

function bubbleMetrics(text: string, maxWidth: number): { width: number; lineCount: number } {
  const font = `${PRETEXT_SIZE}px ${PRETEXT_FONT}`
  const prepared = getPrepared(text, font)
  const baseline = layoutWithLines(prepared, maxWidth - BUBBLE_PAD_X, PRETEXT_LINE_HEIGHT)
  const targetLineCount = baseline.lines.length

  let lo = BUBBLE_MIN_WIDTH
  let hi = maxWidth
  let best = maxWidth

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const layout = layoutWithLines(prepared, mid - BUBBLE_PAD_X, PRETEXT_LINE_HEIGHT)
    if (layout.lines.length <= targetLineCount) {
      best = mid
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  const finalLayout = layoutWithLines(prepared, best - BUBBLE_PAD_X, PRETEXT_LINE_HEIGHT)
  return { width: best, lineCount: finalLayout.lines.length }
}

function renderApp(): void {
  const c = t()

  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en'

  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) throw new Error('#app not found')

  app.innerHTML = `
    <div class="ambient" aria-hidden="true">
      <div class="blob b1"></div>
      <div class="blob b2"></div>
      <div class="blob b3"></div>
      <div class="stars" id="stars"></div>
    </div>

    <div class="cursor-dog" id="cursorDog" aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20L8 8L24 15L16 20Z" fill="var(--dog-ear)"/>
        <path d="M48 20L56 8L40 15L48 20Z" fill="var(--dog-ear)"/>
        <circle cx="32" cy="31" r="18" fill="var(--dog)"/>
        <ellipse cx="32" cy="39" rx="11" ry="9" fill="var(--dog-snout)"/>
        <circle cx="25.5" cy="30" r="2.2" fill="#1E1714"/>
        <circle cx="38.5" cy="30" r="2.2" fill="#1E1714"/>
        <ellipse cx="32" cy="36" rx="3.4" ry="2.6" fill="var(--dog-nose)"/>
        <path d="M29 41C30.4 42.8 33.6 42.8 35 41" stroke="#6E4A32" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-badge" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="34" height="34">
              <path d="M16 20L8 8L24 15L16 20Z" fill="var(--dog-ear)"/>
              <path d="M48 20L56 8L40 15L48 20Z" fill="var(--dog-ear)"/>
              <circle cx="32" cy="31" r="18" fill="var(--dog)"/>
              <ellipse cx="32" cy="39" rx="11" ry="9" fill="var(--dog-snout)"/>
              <circle cx="25.5" cy="30" r="2.2" fill="#1E1714"/>
              <circle cx="38.5" cy="30" r="2.2" fill="#1E1714"/>
              <ellipse cx="32" cy="36" rx="3.4" ry="2.6" fill="var(--dog-nose)"/>
              <path d="M29 41C30.4 42.8 33.6 42.8 35 41" stroke="#6E4A32" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="brand-copy">
            <p class="eyebrow">${escapeHtml(c.brandEyebrow)}</p>
            <p class="brand-title">${escapeHtml(c.brandTitle)}</p>
          </div>
        </div>

        <div class="topbar-right">
          <button class="lang-btn" id="langBtn">${escapeHtml(c.langButton)}</button>
        </div>
      </header>

      <section class="screen ${currentScreen === 'home' ? 'active' : ''}" id="screen-home">
        <div class="hero-card repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.homeEyebrow)}</p>
          <h1 class="hero-title" data-repel>${escapeHtml(c.homeTitle)}</h1>
          <p class="hero-sub" data-repel>${escapeHtml(c.homeSub)}</p>

          <div class="hero-actions">
            <button class="primary-btn" id="enterWorldBtn">${escapeHtml(c.enter)}</button>
            <button class="ghost-btn" id="jumpNotesBtn">${escapeHtml(c.lookAround)}</button>
          </div>

          <div class="quote-ribbon" data-repel>
            <strong>${escapeHtml(c.missionLabel)}</strong><br>
            ${escapeHtml(c.missionText)}
          </div>
        </div>

        <div class="hero-side">
          <div class="panel dog-stage">
            <div class="dog-card">
              <div class="dog-label">${escapeHtml(c.dogLabel)}</div>
              <div class="dog-svg-wrap" id="dogSvgWrap">
                <span class="ear-spark left" aria-hidden="true"></span>
                <span class="ear-spark right" aria-hidden="true"></span>

                <button class="ear-hit left" id="leftEarHit" aria-label="left ear"></button>
                <button class="ear-hit right" id="rightEarHit" aria-label="right ear"></button>

                <svg viewBox="0 0 360 360" width="100%" height="100%">
                  <defs>
                    <radialGradient id="dogGlow" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stop-color="rgba(255,235,212,0.85)"></stop>
                      <stop offset="100%" stop-color="rgba(255,235,212,0)"></stop>
                    </radialGradient>
                  </defs>
                  <circle cx="180" cy="200" r="132" fill="url(#dogGlow)"></circle>
                  <path d="M100 140L62 70L138 108L100 140Z" fill="var(--dog-ear)"></path>
                  <path d="M260 140L298 70L222 108L260 140Z" fill="var(--dog-ear)"></path>
                  <circle cx="180" cy="188" r="96" fill="var(--dog)"></circle>
                  <ellipse cx="180" cy="230" rx="68" ry="52" fill="var(--dog-snout)"></ellipse>
                  <ellipse cx="150" cy="180" rx="11" ry="14" fill="#211714"></ellipse>
                  <ellipse cx="210" cy="180" rx="11" ry="14" fill="#211714"></ellipse>
                  <ellipse cx="180" cy="214" rx="18" ry="13" fill="var(--dog-nose)"></ellipse>
                  <path id="dogMouthPath" d="M166 248C172 255 188 255 194 248" stroke="#744D36" stroke-width="7" stroke-linecap="round"></path>
                  <g id="sleepMarks" opacity="${isNight ? '1' : '0'}">
                    <text x="248" y="108" font-size="28" fill="var(--accent)" font-family="Georgia, serif">z</text>
                    <text x="268" y="86" font-size="22" fill="var(--accent)" font-family="Georgia, serif">z</text>
                    <text x="286" y="66" font-size="18" fill="var(--accent)" font-family="Georgia, serif">z</text>
                  </g>
                </svg>
              </div>
              <div class="dog-emoji" id="heroDogEmoji">${escapeHtml(isNight ? c.dogEmojiSleepy : c.dogEmojiAwake)}</div>
              <div class="dog-caption" id="heroDogCaption">${escapeHtml(isNight ? c.dogCaptionSleepy : c.dogCaptionAwake)}</div>
            </div>
          </div>

          <div class="panel tiny-note">${escapeHtml(c.tinyNote)}</div>
        </div>
      </section>

      <section class="screen ${currentScreen === 'world' ? 'active' : ''}" id="screen-world">
        <div class="chat-shell">
          <div class="chat-head">
            <div>
              <h2 class="chat-head-title">${escapeHtml(c.chatTitle)}</h2>
              <p class="chat-head-sub">${escapeHtml(c.chatSub)}</p>
            </div>
            <div class="dog-status-badge" id="dogStatusBadge">${escapeHtml(isNight ? c.dogBadgeNight : c.dogBadgeDay)}</div>
          </div>

          <div class="chat-scroll" id="chatScroll"></div>

          <div>
            <div class="treat-box ${treatStepShown ? 'active' : ''}" id="treatBox">
              <p class="treat-title">${escapeHtml(c.treatTitle)}</p>
              <div class="treat-row">
                <button class="treat-btn" data-treat="🍖">${escapeHtml(c.treat1)}</button>
                <button class="treat-btn" data-treat="🦴">${escapeHtml(c.treat2)}</button>
                <button class="treat-btn" data-treat="🍗">${escapeHtml(c.treat3)}</button>
              </div>
            </div>

            <div class="chat-actions">
              <button class="mini-pill" id="howAreYouBtn">${escapeHtml(c.btnHowAreYou)}</button>
              <button class="mini-pill" id="stayABitBtn">${escapeHtml(c.btnStay)}</button>
              <button class="mini-pill" id="proudBtn">${escapeHtml(c.btnProud)}</button>
            </div>
          </div>
        </div>

        <div class="sticky-side">
          <div class="sticky-box">
            <div class="sticky-head">
              <div>
                <h3>${escapeHtml(c.reminderTitle)}</h3>
                <p class="sticky-text">${escapeHtml(c.reminderSub)}</p>
              </div>
            </div>
            <div class="sticky-column">
              <div class="sticky-chip">${escapeHtml(c.reminder1)}</div>
              <div class="sticky-chip">${escapeHtml(c.reminder2)}</div>
              <div class="sticky-chip">${escapeHtml(c.reminder3)}</div>
            </div>
          </div>

          <div class="sticky-box">
            <div class="sticky-head">
              <div>
                <h3>${escapeHtml(c.secretTitle)}</h3>
                <p class="sticky-text">${escapeHtml(c.secretSub)}</p>
              </div>
            </div>
            <div class="sticky-column">
              <button class="surprise-btn" id="specialLineBtn">${escapeHtml(c.secretButton)}</button>
              <div class="sticky-chip" id="specialLineBox">${escapeHtml(c.secretPlaceholder)}</div>
            </div>
          </div>

          <div class="sticky-box">
            <div class="sticky-head">
              <div>
                <h3>${escapeHtml(c.cycleTitle)}</h3>
                <p class="sticky-text">${escapeHtml(c.cycleSub)}</p>
              </div>
            </div>
            <div class="sticky-column">
              <div class="sticky-chip"><strong>${escapeHtml(c.cycleDayLabel)}</strong> ${escapeHtml(c.cycleDayText)}</div>
              <div class="sticky-chip"><strong>${escapeHtml(c.cycleNightLabel)}</strong> ${escapeHtml(c.cycleNightText)}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="screen ${currentScreen === 'notes' ? 'active' : ''}" id="screen-notes">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.notesEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.notesTitle)}</h2>
          <p data-repel>${escapeHtml(c.notesSub)}</p>
        </div>
        <div class="notes-grid" id="notesGrid"></div>
        <div class="footer-note">${escapeHtml(c.notesFooter)}</div>
      </section>

      <section class="screen ${currentScreen === 'diary' ? 'active' : ''}" id="screen-diary">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.diaryEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.diaryTitle)}</h2>
          <p data-repel>${escapeHtml(c.diarySub)}</p>
        </div>
        <div class="diary-grid" id="diaryGrid"></div>
      </section>

      <section class="screen ${currentScreen === 'little' ? 'active' : ''}" id="screen-little">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.littleEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.littleTitle)}</h2>
          <p data-repel>${escapeHtml(c.littleSub)}</p>
        </div>
        <div class="little-grid" id="littleGrid"></div>
      </section>

      <div class="bottom-nav">
        <button class="nav-btn ${currentScreen === 'home' ? 'active' : ''}" data-screen="home">${escapeHtml(c.navHome)}</button>
        <button class="nav-btn ${currentScreen === 'world' ? 'active' : ''}" data-screen="world">${escapeHtml(c.navWorld)}</button>
        <button class="nav-btn ${currentScreen === 'notes' ? 'active' : ''}" data-screen="notes">${escapeHtml(c.navNotes)}</button>
        <button class="nav-btn ${currentScreen === 'diary' ? 'active' : ''}" data-screen="diary">${escapeHtml(c.navDiary)}</button>
        <button class="nav-btn ${currentScreen === 'little' ? 'active' : ''}" data-screen="little">${escapeHtml(c.navLittle)}</button>
      </div>
    </div>

    <div class="site-toast" id="siteToast"></div>
  `

  renderLittleCards()
  renderNotes()
  renderDiary()
  bindEvents()
  initStars()
  initPointerEffects()
  initCursorDog()
  initRevealCards()
  restoreChatDom()
}

function renderLittleCards(): void {
  const grid = document.querySelector<HTMLDivElement>('#littleGrid')
  if (!grid) return

  grid.innerHTML = t().littleCards.map(card => `
    <article class="little-card ${card.mode === 'hover' ? 'hover-talk' : 'reveal-on-click'}">
      <p class="little-tag">${escapeHtml(card.tag)}</p>
      <h3>${escapeHtml(card.title)}</h3>
      <p class="little-text">${escapeHtml(card.text)}</p>
      <span class="hidden-line">${escapeHtml(card.hidden)}</span>
    </article>
  `).join('')
}

function renderNotes(): void {
  const notesGrid = document.querySelector<HTMLDivElement>('#notesGrid')
  if (!notesGrid) return

  notesGrid.innerHTML = ''
  const availableWidth = 300

  for (const note of t().noteCards) {
    const card = document.createElement('article')
    card.className = 'note-card'
    card.setAttribute('data-repel', '')

    const listItems = note.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')
    card.innerHTML = `
      <p class="note-index">${escapeHtml(note.index)}</p>
      <h3>${escapeHtml(note.title)}</h3>
      <ul class="note-list">${listItems}</ul>
    `

    const allText = `${note.title}\n${note.items.join('\n')}`
    const prepared = getPrepared(allText, CARD_TEXT_FONT)
    const layout = layoutWithLines(prepared, availableWidth - 40, 24)
    card.style.minHeight = `${layout.lines.length * 24 + 110}px`

    notesGrid.appendChild(card)
  }
}

function renderDiary(): void {
  const diaryGrid = document.querySelector<HTMLDivElement>('#diaryGrid')
  if (!diaryGrid) return

  diaryGrid.innerHTML = ''
  const availableWidth = 300

  for (const entry of t().diaryEntries) {
    const card = document.createElement('article')
    card.className = 'diary-card'
    card.setAttribute('data-repel', '')

    card.innerHTML = `
      <p class="diary-day">${escapeHtml(entry.day)}</p>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="diary-text">${escapeHtml(entry.body)}</p>
    `

    const prepared = getPrepared(`${entry.title}\n${entry.body}`, CARD_TEXT_FONT)
    const layout = layoutWithLines(prepared, availableWidth - 40, 24)
    card.style.minHeight = `${layout.lines.length * 24 + 104}px`

    diaryGrid.appendChild(card)
  }
}

function initStars(): void {
  const stars = document.querySelector<HTMLDivElement>('#stars')
  if (!stars || stars.childElementCount > 0) return

  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = `${Math.random() * 100}%`
    star.style.top = `${Math.random() * 45}%`
    star.style.animationDelay = `${Math.random() * 3}s`
    star.style.animationDuration = `${2.8 + Math.random() * 2.8}s`
    stars.appendChild(star)
  }
}

function handlePointerMove(event: MouseEvent): void {
  cursorTargetX = event.clientX
  cursorTargetY = event.clientY

  const items = document.querySelectorAll<HTMLElement>('[data-repel]')
  items.forEach(item => {
    const rect = item.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = cx - event.clientX
    const dy = cy - event.clientY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxDist = 140

    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 8
      const ox = (dx / Math.max(dist, 1)) * strength
      const oy = (dy / Math.max(dist, 1)) * strength
      item.style.transform = `translate(${ox}px, ${oy}px)`
    } else {
      item.style.transform = 'translate(0px, 0px)'
    }
  })
}

function initPointerEffects(): void {
  if (pointerEffectsBound) return
  pointerEffectsBound = true
  document.addEventListener('mousemove', handlePointerMove, { passive: true })
}

function initCursorDog(): void {
  if (window.matchMedia('(max-width: 500px)').matches) return
  if (cursorAnimationStarted) return

  const cursorDog = document.querySelector<HTMLDivElement>('#cursorDog')
  if (!cursorDog) return

  cursorAnimationStarted = true

  const frame = () => {
    const liveCursorDog = document.querySelector<HTMLDivElement>('#cursorDog')
    if (liveCursorDog) {
      cursorRenderX += (cursorTargetX - cursorRenderX) * 0.24
      cursorRenderY += (cursorTargetY - cursorRenderY) * 0.24
      liveCursorDog.style.transform = `translate3d(${cursorRenderX - 21}px, ${cursorRenderY - 21}px, 0)`
    }
    requestAnimationFrame(frame)
  }
  frame()
}

function initRevealCards(): void {
  document.querySelectorAll<HTMLElement>('.reveal-on-click').forEach(card => {
    card.onclick = () => {
      card.classList.toggle('revealed')
    }
  })
}

function showToast(text: string, options?: { mobileTop?: boolean }): void {
  const siteToast = document.querySelector<HTMLDivElement>('#siteToast')
  if (!siteToast) return

  siteToast.classList.remove('show', 'mobile-top')
  if (options?.mobileTop) siteToast.classList.add('mobile-top')

  siteToast.innerHTML = `<strong>${escapeHtml(t().toastPrefix)}</strong><br>${escapeHtml(text)}`
  siteToast.classList.add('show')

  if (toastTimeout !== null) {
    window.clearTimeout(toastTimeout)
  }

  toastTimeout = window.setTimeout(() => {
    siteToast.classList.remove('show', 'mobile-top')
  }, 2600)
}

function triggerEarEffect(side: 'left' | 'right'): void {
  const wrap = document.querySelector<HTMLDivElement>('#dogSvgWrap')
  if (!wrap) return

  const className = side === 'left' ? 'ear-left-active' : 'ear-right-active'
  wrap.classList.remove('ear-left-active', 'ear-right-active')
  void wrap.offsetWidth
  wrap.classList.add(className)

  window.setTimeout(() => {
    wrap.classList.remove(className)
  }, 720)
}

function updateNightState(): void {
  document.body.classList.toggle('night', isNight)

  const heroDogEmoji = document.querySelector<HTMLDivElement>('#heroDogEmoji')
  const heroDogCaption = document.querySelector<HTMLDivElement>('#heroDogCaption')
  const sleepMarks = document.querySelector<SVGGElement>('#sleepMarks')
  const dogMouthPath = document.querySelector<SVGPathElement>('#dogMouthPath')
  const dogStatusBadge = document.querySelector<HTMLDivElement>('#dogStatusBadge')

  if (heroDogEmoji) heroDogEmoji.textContent = isNight ? t().dogEmojiSleepy : t().dogEmojiAwake
  if (heroDogCaption) heroDogCaption.textContent = isNight ? t().dogCaptionSleepy : t().dogCaptionAwake
  if (sleepMarks) sleepMarks.setAttribute('opacity', isNight ? '1' : '0')
  if (dogMouthPath) {
    dogMouthPath.setAttribute('d', isNight ? 'M168 248C175 250 185 250 192 248' : 'M166 248C172 255 188 255 194 248')
  }
  if (dogStatusBadge) {
    dogStatusBadge.textContent = isNight ? t().dogBadgeNight : t().dogBadgeDay
  }
}

function setNightMode(nextNight: boolean): void {
  if (isNight === nextNight) return
  isNight = nextNight
  updateNightState()

  if (worldStarted) {
    appendMessage('system', nextNight ? { kind: 'chatLate' } : { kind: 'chatMorning' })
  }
}

function startCycle(): void {
  if (cycleIntervalId !== null) return
  cycleIntervalId = window.setInterval(() => {
    setNightMode(!isNight)
  }, 60_000)
}

function createBubble(message: ChatMessage): HTMLElement {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) throw new Error('#chatScroll not found')

  const text = resolveChatText(message.token)

  const row = document.createElement('div')
  row.className = `bubble-row ${message.sender === 'user' ? 'user' : ''}`

  if (message.sender !== 'user') {
    const avatar = document.createElement('div')
    avatar.className = 'bubble-avatar'
    avatar.textContent = message.sender === 'system' ? (isNight ? '🌙' : '☀️') : (isNight ? '😴' : '🐶')
    row.appendChild(avatar)
  }

  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  bubble.textContent = text

  const widthLimit = Math.min(BUBBLE_MAX_WIDTH, Math.max(220, chatScroll.clientWidth - 90))
  const metrics = bubbleMetrics(text, widthLimit)
  bubble.style.width = `${metrics.width}px`
  bubble.style.minHeight = `${metrics.lineCount * PRETEXT_LINE_HEIGHT + BUBBLE_PAD_Y}px`

  row.appendChild(bubble)
  return row
}

function createTypingBubble(): HTMLElement {
  const row = document.createElement('div')
  row.className = 'bubble-row'

  const avatar = document.createElement('div')
  avatar.className = 'bubble-avatar'
  avatar.textContent = isNight ? '😴' : '🐶'

  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  bubble.innerHTML = `
    <span class="typing" aria-label="typing">
      <span></span><span></span><span></span>
    </span>
  `
  row.append(avatar, bubble)
  return row
}

function scrollChatToBottom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return
  chatScroll.scrollTop = chatScroll.scrollHeight
}

function appendMessage(sender: MessageSender, token: TranslatedChatToken): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  const message: ChatMessage = {
    id: `m${messageCounter++}`,
    sender,
    token,
  }
  chatHistory.push(message)

  const bubble = createBubble(message)
  chatScroll.appendChild(bubble)
  scrollChatToBottom()
}

function restoreChatDom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  chatScroll.innerHTML = ''
  for (const msg of chatHistory) {
    chatScroll.appendChild(createBubble(msg))
  }
  scrollChatToBottom()
}

async function addDogLine(token: TranslatedChatToken, delayBefore = 480): Promise<void> {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  const typing = createTypingBubble()
  chatScroll.appendChild(typing)
  scrollChatToBottom()
  await wait(delayBefore)
  typing.remove()
  appendMessage('dog', token)
}

async function runIntroScript(): Promise<void> {
  if (chatRunning) return
  chatRunning = true

  for (let index = 0; index < t().introScript.length; index++) {
    await addDogLine({ kind: 'intro', index }, 420 + (index % 3) * 140)

    if (index === t().introScript.length - 1) {
      treatStepShown = true
      const treatBox = document.querySelector<HTMLDivElement>('#treatBox')
      if (treatBox) treatBox.classList.add('active')
    }
  }

  chatRunning = false
}

async function handleTreat(treat: string): Promise<void> {
  if (!treatStepShown) return
  treatStepShown = false

  const treatBox = document.querySelector<HTMLDivElement>('#treatBox')
  if (treatBox) treatBox.classList.remove('active')

  appendMessage('user', { kind: 'treatUser', treat })
  await wait(220)

  for (let index = 0; index < t().postTreatLines.length; index++) {
    await addDogLine({ kind: 'postTreat', index }, 350)
  }
}

async function handleHowAreYou(): Promise<void> {
  appendMessage('user', { kind: 'chatUserHowAreYou' })
  await wait(220)
  await addDogLine({ kind: 'chatDogHowAreYou' }, 420)
}

async function handleStayABit(): Promise<void> {
  appendMessage('user', { kind: 'chatUserStay' })
  await wait(220)
  await addDogLine({ kind: 'chatDogStay' }, 420)
}

async function handleProud(): Promise<void> {
  appendMessage('user', { kind: 'chatUserProud' })
  await wait(220)
  for (let index = 0; index < t().proudLines.length; index++) {
    await addDogLine({ kind: 'proud', index }, 340)
  }
}

function setScreen(screen: ScreenName): void {
  currentScreen = screen
  document.querySelectorAll<HTMLElement>('.screen').forEach(el => {
    el.classList.remove('active')
  })
  const target = document.querySelector<HTMLElement>(`#screen-${screen}`)
  if (target) target.classList.add('active')

  document.querySelectorAll<HTMLButtonElement>('.nav-btn[data-screen]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen)
  })
}

function startWorld(): void {
  if (worldStarted) return
  worldStarted = true
  runIntroScript().catch(console.error)
}

function startStayedTimer(): void {
  if (stayedTimerStarted) return
  stayedTimerStarted = true

  window.setTimeout(async () => {
    if (stayedMessageShown) return
    stayedMessageShown = true

    if (!worldStarted) {
      showToast(t().stayedToast)
      return
    }

    await addDogLine({ kind: 'stayed1' }, 420)
    await addDogLine({ kind: 'stayed2' }, 420)
  }, 30_000)
}

function bindEvents(): void {
  const langBtn = document.querySelector<HTMLButtonElement>('#langBtn')
  const enterWorldBtn = document.querySelector<HTMLButtonElement>('#enterWorldBtn')
  const jumpNotesBtn = document.querySelector<HTMLButtonElement>('#jumpNotesBtn')
  const leftEarHit = document.querySelector<HTMLButtonElement>('#leftEarHit')
  const rightEarHit = document.querySelector<HTMLButtonElement>('#rightEarHit')
  const howAreYouBtn = document.querySelector<HTMLButtonElement>('#howAreYouBtn')
  const stayABitBtn = document.querySelector<HTMLButtonElement>('#stayABitBtn')
  const proudBtn = document.querySelector<HTMLButtonElement>('#proudBtn')
  const specialLineBtn = document.querySelector<HTMLButtonElement>('#specialLineBtn')
  const specialLineBox = document.querySelector<HTMLDivElement>('#specialLineBox')

  if (langBtn) {
    langBtn.onclick = () => {
      currentLanguage = currentLanguage === 'en' ? 'zh' : 'en'
      renderApp()
      updateNightState()
    }
  }

  document.querySelectorAll<HTMLButtonElement>('.nav-btn[data-screen]').forEach(btn => {
    btn.onclick = () => {
      const screen = btn.dataset.screen as ScreenName
      setScreen(screen)
      if (screen === 'world') startWorld()
    }
  })

  if (enterWorldBtn) {
    enterWorldBtn.onclick = () => {
      setScreen('world')
      startWorld()
    }
  }

  if (jumpNotesBtn) {
    jumpNotesBtn.onclick = () => setScreen('notes')
  }

  const leftEarHandler = () => {
    triggerEarEffect('left')
    showToast(randomFrom(t().earSecrets), { mobileTop: true })
  }

  const rightEarHandler = () => {
    triggerEarEffect('right')
    showToast(randomFrom(t().earSecrets), { mobileTop: true })
  }

  if (leftEarHit) leftEarHit.onclick = leftEarHandler
  if (rightEarHit) rightEarHit.onclick = rightEarHandler

  if (howAreYouBtn) {
    howAreYouBtn.onclick = () => {
      handleHowAreYou().catch(console.error)
    }
  }

  if (stayABitBtn) {
    stayABitBtn.onclick = () => {
      handleStayABit().catch(console.error)
    }
  }

  if (proudBtn) {
    proudBtn.onclick = () => {
      handleProud().catch(console.error)
    }
  }

  document.querySelectorAll<HTMLButtonElement>('[data-treat]').forEach(button => {
    button.onclick = () => {
      const treat = button.dataset.treat ?? '🍖'
      handleTreat(treat).catch(console.error)
    }
  })

  if (specialLineBtn && specialLineBox) {
    specialLineBtn.onclick = () => {
      const line = randomFrom(t().specialLines)
      specialLineBox.textContent = line
      showToast(line)
    }
  }
}

document.fonts.ready.then(() => {
  renderApp()
  updateNightState()
  startStayedTimer()
  startCycle()
})