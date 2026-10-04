export type ThemePref = 'system' | 'light' | 'dark'
export type ThemeResolved = 'light' | 'dark'

export const STORAGE_KEY = 'sk-theme'

export function systemTheme(): ThemeResolved {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveTheme(pref: ThemePref): ThemeResolved {
  return pref === 'system' ? systemTheme() : pref
}

export function readThemePref(): ThemePref {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    /* private mode */
  }
  return 'system'
}

export function applyTheme(pref: ThemePref) {
  const resolved = resolveTheme(pref)
  document.documentElement.dataset.theme = resolved
  document.documentElement.dataset.themePref = pref
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', resolved === 'dark' ? '#1f1915' : '#f7eee4')
}
