export const PAW_FILL = '#F6E9D2'
export const PAW_PAD = '#E9A0A0'
export const PAW_HEART = '#E25B5B'
export const PAW_WHITE = '#FFF6EC'
export const PAW_CUFF = '#6B4A35'
export const PAW_STROKE_LIGHT = '#6B4A35'
export const PAW_STROKE_DARK = '#F3E3CC'

export const PAW_FILE_DEFAULT = '/shaoke-keli-ip/assets/cursor/paw-default.svg'
export const PAW_FILE_HEART = '/shaoke-keli-ip/assets/cursor/paw-heart.svg'

export const HOTSPOT = {
  default: { x: 7, y: 6 },
  heart: { x: 16, y: 3 },
} as const

export type PawKind = 'default' | 'heart'

function defaultMarkup(stroke: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16.4" cy="28.4" rx="8.8" ry="2.35" fill="${stroke}" opacity="0.16"/><circle cx="7.3" cy="10.4" r="4.15" fill="${PAW_FILL}" stroke="${stroke}" stroke-width="1.3"/><circle cx="16" cy="7.7" r="4.35" fill="${PAW_FILL}" stroke="${stroke}" stroke-width="1.3"/><circle cx="24.7" cy="10.4" r="4.15" fill="${PAW_FILL}" stroke="${stroke}" stroke-width="1.3"/><path d="M8.1 17.1c1.45-3.25 4.7-5.05 7.9-5.05s6.45 1.8 7.9 5.05c1.65 3.65.45 7.85-2.75 9.9-2.25 1.45-5.3 1.85-7.95 1.85s-5.7-.4-7.95-1.85c-3.2-2.05-4.4-6.25-2.75-9.9Z" fill="${PAW_FILL}" stroke="${stroke}" stroke-width="1.35" stroke-linejoin="round"/><ellipse cx="16" cy="21.35" rx="5.35" ry="4.25" fill="${PAW_PAD}"/><circle cx="7.3" cy="10.5" r="1.7" fill="${PAW_PAD}"/><circle cx="16" cy="7.8" r="1.8" fill="${PAW_PAD}"/><circle cx="24.7" cy="10.5" r="1.7" fill="${PAW_PAD}"/></svg>`
}

function heartMarkup(stroke: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><ellipse cx="16.6" cy="28.9" rx="7.1" ry="2.05" fill="${stroke}" opacity="0.16"/><path d="M16.1 1.7c.52-1.02 1.96-1.02 2.46.1.26.62-.16 1.16-.6 1.54L16.1 5.15 14.24 3.34c-.44-.38-.86-.92-.6-1.54.5-1.12 1.94-1.12 2.46-.1Z" fill="${PAW_HEART}"/><path d="M10.3 23.15 16.1 20.7l5.8 2.45-1.6 4.85-4.2-2.15-4.2 2.15z" fill="${PAW_CUFF}"/><ellipse cx="14.35" cy="14.7" rx="7.05" ry="7.35" fill="${PAW_WHITE}" stroke="${stroke}" stroke-width="1.35"/><circle cx="22.55" cy="13.35" r="3.55" fill="${PAW_WHITE}" stroke="${stroke}" stroke-width="1.3"/><circle cx="19.15" cy="14.35" r="2.9" fill="${PAW_WHITE}"/><path d="M15.05 11.15c1.02-1.12 2.78-1.12 3.75.14 1.02 1.28.3 2.62-.52 3.42l-2.18 2.12-2.08-1.88c-.82-.8-1.54-2.14-.52-3.42.97-1.26 2.73-1.26 3.55-.14Z" fill="${PAW_PAD}"/></svg>`
}

export function pawDataUri(kind: PawKind, stroke: string) {
  const svg = kind === 'default' ? defaultMarkup(stroke) : heartMarkup(stroke)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function pawInlineSvg(kind: PawKind, stroke: string) {
  return kind === 'default' ? defaultMarkup(stroke) : heartMarkup(stroke)
}

export const CLICKABLE =
  'a,button,[role="button"],[role="tab"],summary,label,.seg-btn,.tile,.merch-card,.archive-link,.text-link,.dl-media,.dl-btn,.dl-tab,.portrait-btn,.pose-btn,.panel-btn,.lightbox-close,.lightbox-nav,.lightbox,.chip,.nav-toggle,.footer-link-btn,.rel-card,.btn,.hero-frame'

export const TEXT_FIELDS =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]),textarea,select,[contenteditable="true"]'

export function strokeForTheme(theme: string | undefined) {
  return theme === 'dark' ? PAW_STROKE_DARK : PAW_STROKE_LIGHT
}

export function isTextField(el: Element | null) {
  return !!el?.closest(TEXT_FIELDS)
}

export function isClickable(el: Element | null) {
  if (!el || isTextField(el)) return false
  if (el.closest(CLICKABLE)) return true
  const cursor = getComputedStyle(el).cursor
  return cursor === 'pointer'
}

export function prefersFineDesktopCursor() {
  return (
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(min-width: 721px)').matches
  )
}

const STYLE_ID = 'sk-paw-cursor-css'

export function applyCssCursorFallback(theme: 'light' | 'dark') {
  const stroke = strokeForTheme(theme)
  const def = pawDataUri('default', stroke)
  const heart = pawDataUri('heart', stroke)
  const hx = HOTSPOT.default.x
  const hy = HOTSPOT.default.y
  const ix = HOTSPOT.heart.x
  const iy = HOTSPOT.heart.y
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = `
@media (pointer: fine) and (min-width: 721px) {
  html.paw-css,
  html.paw-css * {
    cursor: url("${def}") ${hx} ${hy}, url("${PAW_FILE_DEFAULT}") ${hx} ${hy}, auto;
  }
  html.paw-css ${CLICKABLE} {
    cursor: url("${heart}") ${ix} ${iy}, url("${PAW_FILE_HEART}") ${ix} ${iy}, pointer;
  }
  html.paw-css ${TEXT_FIELDS} {
    cursor: text !important;
  }
}
html.paw-dom,
html.paw-dom * {
  cursor: none;
}
html.paw-dom ${TEXT_FIELDS} {
  cursor: text !important;
}
`
}

export function bootCssPawCursor(theme: 'light' | 'dark') {
  applyCssCursorFallback(theme)
  if (prefersFineDesktopCursor()) {
    document.documentElement.classList.add('paw-css')
  }
}
