import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  applyTheme,
  readThemePref,
  resolveTheme,
  STORAGE_KEY,
  type ThemePref,
  type ThemeResolved,
} from './themeApply'

export type { ThemePref, ThemeResolved }

type ThemeContextValue = {
  pref: ThemePref
  resolved: ThemeResolved
  setPref: (pref: ThemePref) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>(readThemePref)

  const setPref = useCallback((next: ThemePref) => {
    setPrefState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    applyTheme(next)
  }, [])

  useEffect(() => {
    applyTheme(pref)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (pref === 'system') applyTheme('system')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [pref])

  const resolved = resolveTheme(pref)
  const value = useMemo(() => ({ pref, resolved, setPref }), [pref, resolved, setPref])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
