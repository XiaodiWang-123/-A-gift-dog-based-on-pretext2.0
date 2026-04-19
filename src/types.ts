export type ScreenName = 'home' | 'world' | 'notes' | 'diary' | 'little'
export type MessageSender = 'dog' | 'user' | 'system'
export type Language = 'en' | 'zh'

export type NoteCard = {
  index: string
  title: string
  items: string[]
}

export type DiaryEntry = {
  day: string
  title: string
  body: string
}

export type TranslatedChatToken =
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

export type ChatMessage = {
  id: string
  sender: MessageSender
  token: TranslatedChatToken
}

export type TranslationSet = {
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