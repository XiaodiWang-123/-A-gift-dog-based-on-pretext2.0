import { appendMessage, addDogLine, handleHowAreYou, handleProud, handleStayABit, handleTreat, runIntroScript } from './chat'
import { getStatusMetaText, t } from './i18n'
import { state } from './state'
import { randomFrom } from './utils'

export function showToast(text: string, options?: { position?: 'top' | 'bottom' }): void {
  const siteToast = document.querySelector<HTMLDivElement>('#siteToast')
  if (!siteToast) return

  siteToast.classList.remove('show', 'mobile-top')

  const isMobile = window.matchMedia('(max-width: 500px)').matches
  if (options?.position === 'top' && isMobile) {
    siteToast.classList.add('mobile-top')
  }

  siteToast.innerHTML = `<strong>${t().toastPrefix}</strong><br>${text}`
  siteToast.classList.add('show')

  if (state.toastTimeout !== null) {
    window.clearTimeout(state.toastTimeout)
  }

  state.toastTimeout = window.setTimeout(() => {
    siteToast.classList.remove('show', 'mobile-top')
  }, 2600)
}

export function updateStatusClock(): void {
  const statusSub = document.querySelector<HTMLDivElement>('#dogStatusSub')
  if (statusSub) {
    statusSub.textContent = getStatusMetaText()
  }
}

export function triggerEarEffect(side: 'left' | 'right'): void {
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

export function updateNightState(): void {
  document.body.classList.toggle('night', state.isNight)

  const heroDogEmoji = document.querySelector<HTMLDivElement>('#heroDogEmoji')
  const heroDogCaption = document.querySelector<HTMLDivElement>('#heroDogCaption')
  const sleepMarks = document.querySelector<SVGGElement>('#sleepMarks')
  const dogMouthPath = document.querySelector<SVGPathElement>('#dogMouthPath')
  const dogStatusMain = document.querySelector<HTMLDivElement>('#dogStatusMain')

  if (heroDogEmoji) heroDogEmoji.textContent = state.isNight ? t().dogEmojiSleepy : t().dogEmojiAwake
  if (heroDogCaption) heroDogCaption.textContent = state.isNight ? t().dogCaptionSleepy : t().dogCaptionAwake
  if (sleepMarks) sleepMarks.setAttribute('opacity', state.isNight ? '1' : '0')
  if (dogMouthPath) {
    dogMouthPath.setAttribute('d', state.isNight ? 'M168 248C175 250 185 250 192 248' : 'M166 248C172 255 188 255 194 248')
  }
  if (dogStatusMain) {
    dogStatusMain.textContent = state.isNight ? t().dogBadgeNight : t().dogBadgeDay
  }

  updateStatusClock()
}

export function setNightMode(nextNight: boolean): void {
  if (state.isNight === nextNight) return
  state.isNight = nextNight
  updateNightState()

  if (state.worldStarted) {
    appendMessage('system', nextNight ? { kind: 'chatLate' } : { kind: 'chatMorning' })
  }
}

export function startCycle(): void {
  if (state.cycleIntervalId !== null) return

  state.nextModeSwitchAt = Date.now() + 60_000

  state.cycleIntervalId = window.setInterval(() => {
    setNightMode(!state.isNight)
    state.nextModeSwitchAt = Date.now() + 60_000
    updateStatusClock()
  }, 60_000)
}

export function startModeClock(): void {
  if (state.modeClockIntervalId !== null) return
  updateStatusClock()

  state.modeClockIntervalId = window.setInterval(() => {
    updateStatusClock()
  }, 1000)
}

export function setScreen(screen: 'home' | 'world' | 'notes' | 'diary' | 'little'): void {
  state.currentScreen = screen

  document.querySelectorAll<HTMLElement>('.screen').forEach(el => {
    el.classList.remove('active')
  })

  const target = document.querySelector<HTMLElement>(`#screen-${screen}`)
  if (target) target.classList.add('active')

  document.querySelectorAll<HTMLButtonElement>('.nav-btn[data-screen]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen)
  })
}

export function startWorld(): void {
  if (state.worldStarted) return
  state.worldStarted = true
  runIntroScript().catch(console.error)
}

export function startStayedTimer(): void {
  if (state.stayedTimerStarted) return
  state.stayedTimerStarted = true

  window.setTimeout(async () => {
    if (state.stayedMessageShown) return
    state.stayedMessageShown = true

    if (!state.worldStarted) {
      showToast(t().stayedToast)
      return
    }

    await addDogLine({ kind: 'stayed1' }, 420)
    await addDogLine({ kind: 'stayed2' }, 420)
  }, 30_000)
}

export function bindEvents(hydrate: () => void): void {
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
      state.currentLanguage = state.currentLanguage === 'en' ? 'zh' : 'en'
      hydrate()
    }
  }

  document.querySelectorAll<HTMLButtonElement>('.nav-btn[data-screen]').forEach(btn => {
    btn.onclick = () => {
      const screen = btn.dataset.screen as 'home' | 'world' | 'notes' | 'diary' | 'little'
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

  const earHandler = (side: 'left' | 'right') => {
    triggerEarEffect(side)
    showToast(randomFrom(t().earSecrets), { position: 'top' })
  }

  if (leftEarHit) leftEarHit.onclick = () => earHandler('left')
  if (rightEarHit) rightEarHit.onclick = () => earHandler('right')

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
      const treat = button.dataset.treat ?? '🥩'
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