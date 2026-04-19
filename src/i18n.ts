import copy from './copy'
import { state } from './state'
import type { TranslatedChatToken, TranslationSet } from './types'

export function t(): TranslationSet {
  return copy[state.currentLanguage]
}

export function resolveChatText(token: TranslatedChatToken): string {
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

export function getDogAvatar(): string {
  return '🐶'
}

export function getStatusMetaText(): string {
  const locale = state.currentLanguage === 'zh' ? 'zh-CN' : 'en-US'
  const timeText = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())

  const secondsLeft = Math.max(0, Math.ceil((state.nextModeSwitchAt - Date.now()) / 1000))
  const switchText = state.currentLanguage === 'zh'
    ? `${secondsLeft}秒后切换`
    : `switches in ${secondsLeft}s`

  return `${timeText} · ${switchText}`
}