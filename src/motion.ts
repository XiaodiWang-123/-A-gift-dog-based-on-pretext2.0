import { state } from './state'
import { BUBBLE_MAX_WIDTH, BUBBLE_PAD_Y, PRETEXT_LINE_HEIGHT } from './constants'
import { getDogAvatar, resolveChatText, t } from './i18n'
import { bubbleMetrics, wait } from './utils'
import type { ChatMessage, MessageSender, TranslatedChatToken } from './types'

function nextMessageId(): string {
  return `m${state.messageCounter++}`
}

export function createBubble(message: ChatMessage): HTMLElement {
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

export function scrollChatToBottom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return
  chatScroll.scrollTop = chatScroll.scrollHeight
}

export function appendMessage(sender: MessageSender, token: TranslatedChatToken): void {
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

export function restoreChatDom(): void {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  chatScroll.innerHTML = ''
  for (const msg of state.chatHistory) {
    chatScroll.appendChild(createBubble(msg))
  }
  scrollChatToBottom()
}

export async function addDogLine(token: TranslatedChatToken, delayBefore = 480): Promise<void> {
  const chatScroll = document.querySelector<HTMLDivElement>('#chatScroll')
  if (!chatScroll) return

  const typing = createTypingBubble()
  chatScroll.appendChild(typing)
  scrollChatToBottom()

  await wait(delayBefore)
  typing.remove()
  appendMessage('dog', token)
}

export async function runIntroScript(): Promise<void> {
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

export async function handleTreat(treat: string): Promise<void> {
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

export async function handleHowAreYou(): Promise<void> {
  appendMessage('user', { kind: 'chatUserHowAreYou' })
  await wait(220)
  await addDogLine({ kind: 'chatDogHowAreYou' }, 420)
}

export async function handleStayABit(): Promise<void> {
  appendMessage('user', { kind: 'chatUserStay' })
  await wait(220)
  await addDogLine({ kind: 'chatDogStay' }, 420)
}

export async function handleProud(): Promise<void> {
  appendMessage('user', { kind: 'chatUserProud' })
  await wait(220)

  for (let index = 0; index < t().proudLines.length; index++) {
    await addDogLine({ kind: 'proud', index }, 340)
  }
}