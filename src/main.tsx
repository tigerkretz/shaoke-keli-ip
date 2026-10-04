import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CursorPaw } from './components/CursorPaw'
import { bootCssPawCursor } from './cursorPaw'
import { ThemeProvider } from './theme'
import { applyTheme, readThemePref, resolveTheme } from './themeApply'

const pref = readThemePref()
applyTheme(pref)
bootCssPawCursor(resolveTheme(pref))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CursorPaw />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
