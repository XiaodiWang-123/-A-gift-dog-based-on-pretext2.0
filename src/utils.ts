import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext'
import {
  BUBBLE_MAX_WIDTH,
  BUBBLE_MIN_WIDTH,
  BUBBLE_PAD_X,
  PRETEXT_FONT,
  PRETEXT_LINE_HEIGHT,
  PRETEXT_SIZE,
} from './constants'
import { preparedCache } from './state'

export function getPrepared(text: string, font: string) {
  const key = `${font}__${text}`
  const cached = preparedCache.get(key)
  if (cached) return cached
  const prepared = prepareWithSegments(text, font)
  preparedCache.set(key, prepared)
  return prepared
}

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

export function randomFrom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function bubbleMetrics(text: string, maxWidth: number): { width: number; lineCount: number } {
  const font = `${PRETEXT_SIZE}px ${PRETEXT_FONT}`
  const prepared = getPrepared(text, font)
  const baseline = layoutWithLines(prepared, maxWidth - BUBBLE_PAD_X, PRETEXT_LINE_HEIGHT)
  const targetLineCount = baseline.lines.length

  let lo = BUBBLE_MIN_WIDTH
  let hi = Math.min(maxWidth, BUBBLE_MAX_WIDTH)
  let best = Math.min(maxWidth, BUBBLE_MAX_WIDTH)

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