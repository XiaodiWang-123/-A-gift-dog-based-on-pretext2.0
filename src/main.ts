import './style.css'
import { layoutWithLines } from '@chenglou/pretext'
import { CARD_TEXT_FONT } from './constants'
import { t, resolveChatText, getDogAvatar } from './i18n'
import { state } from './state'
import { bubbleMetrics, escapeHtml, getPrepared, randomFrom, wait } from './utils'
import type { ChatMessage, MessageSender, ScreenName, TranslatedChatToken } from './types'

function nextMessageId(): string {
  return `m${state.messageCounter++}`
}

function scrollChatToBottom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return
  chatScroll.scrollTop = chatScroll.scrollHeight
}

function showToast(text: string, options?: { mobileTop?: boolean }): void {
  const siteToast = document.querySelector<HTMLDivElement>('#siteToast')
  if (!siteToast) return

  siteToast.classList.remove('show', 'mobile-top')
  if (options?.mobileTop) {
    siteToast.classList.add('mobile-top')
  }

  siteToast.innerHTML = `<strong>${escapeHtml(t().toastPrefix)}</strong><br>${escapeHtml(text)}`
  siteToast.classList.add('show')

  if (state.toastTimeout !== null) {
    window.clearTimeout(state.toastTimeout)
  }

  state.toastTimeout = window.setTimeout(() => {
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

function createBubble(message: ChatMessage): HTMLElement {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) throw new Error('#chatScroll not found')

  const text = resolveChatText(message.token)

  const row = document.createElement('div')
  row.className = `bubble-row ${message.sender === 'user' ? 'user' : ''}`

  if (message.sender !== 'user') {
    const avatar = document.createElement('div')
    avatar.className = 'bubble-avatar'
    avatar.textContent = message.sender === 'system' ? (state.isNight ? '🌙' : '☀️') : getDogAvatar()
    row.appendChild(avatar)
  }

  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  bubble.textContent = text

  const sideGap = message.sender === 'user' ? 48 : 90
  const widthLimit = Math.min(290, Math.max(180, chatScroll.clientWidth - sideGap))
  const metrics = bubbleMetrics(text, widthLimit)
  bubble.style.width = `${metrics.width}px`
  bubble.style.minHeight = `${metrics.lineCount * 24 + 28}px`

  row.appendChild(bubble)
  return row
}

function createTypingBubble(): HTMLElement {
  const row = document.createElement('div')
  row.className = 'bubble-row'

  const avatar = document.createElement('div')
  avatar.className = 'bubble-avatar'
  avatar.textContent = getDogAvatar()

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

function appendMessage(sender: MessageSender, token: TranslatedChatToken): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  const message: ChatMessage = {
    id: nextMessageId(),
    sender,
    token,
  }

  state.chatHistory.push(message)
  chatScroll.appendChild(createBubble(message))
  scrollChatToBottom()
}

function restoreChatDom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  chatScroll.innerHTML = ''
  for (const msg of state.chatHistory) {
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
  if (state.chatRunning) return
  state.chatRunning = true

  for (let index = 0; index < t().introScript.length; index++) {
    await addDogLine({ kind: 'intro', index }, 420 + (index % 3) * 140)

    if (index === t().introScript.length - 1) {
      state.treatStepShown = true
      const treatBox = document.querySelector<HTMLDivElement>('#treatBox')
      if (treatBox) treatBox.classList.add('active')
    }
  }

  state.chatRunning = false
}

async function handleTreat(treat: string): Promise<void> {
  if (!state.treatStepShown) return
  state.treatStepShown = false

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
  state.cursorTargetX = event.clientX
  state.cursorTargetY = event.clientY

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
  if (state.pointerEffectsBound) return
  state.pointerEffectsBound = true
  document.addEventListener('mousemove', handlePointerMove, { passive: true })
}

function initCursorDog(): void {
  if (window.matchMedia('(max-width: 500px)').matches) return
  if (state.cursorAnimationStarted) return

  state.cursorAnimationStarted = true

  const frame = () => {
    const liveCursorDog = document.querySelector<HTMLDivElement>('#cursorDog')
    if (liveCursorDog) {
      state.cursorRenderX += (state.cursorTargetX - state.cursorRenderX) * 0.24
      state.cursorRenderY += (state.cursorTargetY - state.cursorRenderY) * 0.24
      liveCursorDog.style.transform = `translate3d(${state.cursorRenderX - 21}px, ${state.cursorRenderY - 21}px, 0)`
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

function updateNightState(): void {
  document.body.classList.toggle('night', state.isNight)

  const heroDogEmoji = document.querySelector<HTMLDivElement>('#heroDogEmoji')
  const heroDogCaption = document.querySelector<HTMLDivElement>('#heroDogCaption')
  const sleepMarks = document.querySelector<SVGGElement>('#sleepMarks')
  const dogMouthPath = document.querySelector<SVGPathElement>('#dogMouthPath')
  const dogStatusBadge = document.querySelector<HTMLDivElement>('#dogStatusBadge')

  if (heroDogEmoji) {
    heroDogEmoji.textContent = state.isNight ? t().dogEmojiSleepy : t().dogEmojiAwake
  }

  if (heroDogCaption) {
    heroDogCaption.textContent = state.isNight ? t().dogCaptionSleepy : t().dogCaptionAwake
  }

  if (sleepMarks) {
    sleepMarks.setAttribute('opacity', state.isNight ? '1' : '0')
  }

  if (dogMouthPath) {
    dogMouthPath.setAttribute(
      'd',
      state.isNight
        ? 'M168 248C175 250 185 250 192 248'
        : 'M166 248C172 255 188 255 194 248'
    )
  }

  if (dogStatusBadge) {
    dogStatusBadge.textContent = state.isNight ? t().dogBadgeNight : t().dogBadgeDay
  }

  updateStatusClock()
}

function updateStatusClock(): void {
  const dogModeTimer = document.querySelector<HTMLDivElement>('#dogModeTimer')
  if (!dogModeTimer) return

  const secondsLeft = Math.max(0, Math.ceil((state.nextModeSwitchAt - Date.now()) / 1000))
  dogModeTimer.textContent =
    state.currentLanguage === 'zh'
      ? `${secondsLeft}秒`
      : `${secondsLeft}s`
}

function setNightMode(nextNight: boolean): void {
  if (state.isNight === nextNight) return
  state.isNight = nextNight
  updateNightState()

  if (state.worldStarted) {
    appendMessage('system', nextNight ? { kind: 'chatLate' } : { kind: 'chatMorning' })
  }
}

function startCycle(): void {
  if (state.cycleIntervalId !== null) return
  state.nextModeSwitchAt = Date.now() + 60_000

  state.cycleIntervalId = window.setInterval(() => {
    setNightMode(!state.isNight)
    state.nextModeSwitchAt = Date.now() + 60_000
    updateStatusClock()
  }, 60_000)
}

function startModeClock(): void {
  if (state.modeClockIntervalId !== null) return
  updateStatusClock()

  state.modeClockIntervalId = window.setInterval(() => {
    updateStatusClock()
  }, 1000)
}

function setScreen(screen: ScreenName): void {
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

function startWorld(): void {
  if (state.worldStarted) return
  state.worldStarted = true
  runIntroScript().catch(console.error)
}

function startStayedTimer(): void {
  if (state.stayedTimerStarted) return
  state.stayedTimerStarted = true

  window.setTimeout(() => {
    if (state.stayedMessageShown) return
    state.stayedMessageShown = true

    showToast(t().stayedToast, {
      mobileTop: window.matchMedia('(max-width: 500px)').matches,
    })
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
      state.currentLanguage = state.currentLanguage === 'en' ? 'zh' : 'en'
      renderApp()
      updateNightState()
      updateStatusClock()
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

  if (leftEarHit) {
    leftEarHit.onclick = () => {
      triggerEarEffect('left')
      showToast(randomFrom(t().earSecrets), {
        mobileTop: window.matchMedia('(max-width: 500px)').matches,
      })
    }
  }

  if (rightEarHit) {
    rightEarHit.onclick = () => {
      triggerEarEffect('right')
      showToast(randomFrom(t().earSecrets), {
        mobileTop: window.matchMedia('(max-width: 500px)').matches,
      })
    }
  }

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

function renderApp(): void {
  const c = t()
  document.documentElement.lang = state.currentLanguage === 'zh' ? 'zh-CN' : 'en'

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

      <section class="screen ${state.currentScreen === 'home' ? 'active' : ''}" id="screen-home">
        <div class="hero-card repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.homeEyebrow)}</p>
          <h1 class="hero-title" data-repel>${escapeHtml(c.homeTitle)}</h1>
          <p class="hero-sub" data-repel>${escapeHtml(c.homeSub)}</p>

          <div class="hero-actions">
            <button class="ghost-btn" id="enterWorldBtn">${escapeHtml(c.enter)}</button>
            <button class="ghost-btn" id="jumpNotesBtn">${escapeHtml(c.lookAround)}</button>
          </div>

          <div class="quote-ribbon" data-repel>
            <strong>${escapeHtml(c.missionLabel)}</strong><br>
            ${escapeHtml(c.missionText)}
          </div>
        </div>

        <div class="hero-side">
          <div class="panel dog-stage">
            <div class="dog-mode-timer" id="dogModeTimer"></div>

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
                  <g id="sleepMarks" opacity="${state.isNight ? '1' : '0'}">
                    <text x="248" y="108" font-size="28" fill="var(--accent)" font-family="Georgia, serif">z</text>
                    <text x="268" y="86" font-size="22" fill="var(--accent)" font-family="Georgia, serif">z</text>
                    <text x="286" y="66" font-size="18" fill="var(--accent)" font-family="Georgia, serif">z</text>
                  </g>
                </svg>
              </div>

              <div class="dog-emoji" id="heroDogEmoji">${escapeHtml(state.isNight ? c.dogEmojiSleepy : c.dogEmojiAwake)}</div>
              <div class="dog-caption" id="heroDogCaption">${escapeHtml(state.isNight ? c.dogCaptionSleepy : c.dogCaptionAwake)}</div>
            </div>
          </div>

          <div class="panel tiny-note">${escapeHtml(c.tinyNote)}</div>
        </div>
      </section>

      <section class="screen ${state.currentScreen === 'world' ? 'active' : ''}" id="screen-world">
        <div class="chat-shell">
          <div class="chat-head">
            <div>
              <h2 class="chat-head-title">${escapeHtml(c.chatTitle)}</h2>
              <p class="chat-head-sub">${escapeHtml(c.chatSub)}</p>
            </div>

            <div class="dog-status-badge" id="dogStatusBadge">
              ${escapeHtml(state.isNight ? c.dogBadgeNight : c.dogBadgeDay)}
            </div>
          </div>

          <div class="chat-scroll" id="chatScroll"></div>

          <div>
            <div class="treat-box ${state.treatStepShown ? 'active' : ''}" id="treatBox">
              <p class="treat-title">${escapeHtml(c.treatTitle)}</p>
              <div class="treat-row">
                <button class="treat-btn" data-treat="🥩">${escapeHtml(c.treat1)}</button>
                <button class="treat-btn" data-treat="🦴">${escapeHtml(c.treat2)}</button>
                <button class="treat-btn" data-treat="💧">${escapeHtml(c.treat3)}</button>
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

      <section class="screen ${state.currentScreen === 'notes' ? 'active' : ''}" id="screen-notes">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.notesEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.notesTitle)}</h2>
          <p data-repel>${escapeHtml(c.notesSub)}</p>
        </div>

        <div class="notes-grid" id="notesGrid"></div>
        <div class="footer-note">${escapeHtml(c.notesFooter)}</div>
      </section>

      <section class="screen ${state.currentScreen === 'diary' ? 'active' : ''}" id="screen-diary">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.diaryEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.diaryTitle)}</h2>
          <p data-repel>${escapeHtml(c.diarySub)}</p>
        </div>

        <div class="diary-grid" id="diaryGrid"></div>
      </section>

      <section class="screen ${state.currentScreen === 'little' ? 'active' : ''}" id="screen-little">
        <div class="page-head repel-zone">
          <p class="eyebrow" data-repel>${escapeHtml(c.littleEyebrow)}</p>
          <h2 data-repel>${escapeHtml(c.littleTitle)}</h2>
          <p data-repel>${escapeHtml(c.littleSub)}</p>
        </div>

        <div class="little-grid" id="littleGrid"></div>
      </section>

      <div class="bottom-nav">
        <button class="nav-btn ${state.currentScreen === 'home' ? 'active' : ''}" data-screen="home">${escapeHtml(c.navHome)}</button>
        <button class="nav-btn ${state.currentScreen === 'world' ? 'active' : ''}" data-screen="world">${escapeHtml(c.navWorld)}</button>
        <button class="nav-btn ${state.currentScreen === 'notes' ? 'active' : ''}" data-screen="notes">${escapeHtml(c.navNotes)}</button>
        <button class="nav-btn ${state.currentScreen === 'diary' ? 'active' : ''}" data-screen="diary">${escapeHtml(c.navDiary)}</button>
        <button class="nav-btn ${state.currentScreen === 'little' ? 'active' : ''}" data-screen="little">${escapeHtml(c.navLittle)}</button>
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
  updateNightState()
  updateStatusClock()
}

document.fonts.ready.then(() => {
  renderApp()
  updateNightState()
  updateStatusClock()
  startStayedTimer()
  startCycle()
  startModeClock()
})