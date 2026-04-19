import { prepareWithSegments } from '@chenglou/pretext'
import type { ChatMessage, Language, ScreenName } from './types'

export const preparedCache = new Map<string, ReturnType<typeof prepareWithSegments>>()

export const state = {
  currentLanguage: 'en' as Language,
  currentScreen: 'home' as ScreenName,
  worldStarted: false,
  chatRunning: false,
  treatStepShown: false,
  stayedMessageShown: false,
  isNight: false,
  cycleIntervalId: null as number | null,
  modeClockIntervalId: null as number | null,
  nextModeSwitchAt: Date.now() + 60_000,
  messageCounter: 0,
  toastTimeout: null as number | null,

  cursorTargetX: window.innerWidth / 2,
  cursorTargetY: window.innerHeight / 2,
  cursorRenderX: window.innerWidth / 2,
  cursorRenderY: window.innerHeight / 2,

  pointerEffectsBound: false,
  cursorAnimationStarted: false,
  stayedTimerStarted: false,

  chatHistory: [] as ChatMessage[],
}