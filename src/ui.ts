import { state } from './state'

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

export function initPointerEffects(): void {
  if (state.pointerEffectsBound) return
  state.pointerEffectsBound = true
  document.addEventListener('mousemove', handlePointerMove, { passive: true })
}

export function initCursorDog(): void {
  if (window.matchMedia('(max-width: 500px)').matches) return
  if (state.cursorAnimationStarted) return

  state.cursorAnimationStarted = true

  const frame = () => {
    const cursorDog = document.querySelector<HTMLDivElement>('#cursorDog')
    if (cursorDog) {
      state.cursorRenderX += (state.cursorTargetX - state.cursorRenderX) * 0.24
      state.cursorRenderY += (state.cursorTargetY - state.cursorRenderY) * 0.24
      cursorDog.style.transform = `translate3d(${state.cursorRenderX - 21}px, ${state.cursorRenderY - 21}px, 0)`
    }
    requestAnimationFrame(frame)
  }

  frame()
}

export function initStars(): void {
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

export function initRevealCards(): void {
  document.querySelectorAll<HTMLElement>('.reveal-on-click').forEach(card => {
    card.onclick = () => {
      card.classList.toggle('revealed')
    }
  })
}