import { Segmented } from './Segmented'
import { useTheme, type ThemePref } from '../theme'

const options = [
  { id: 'system' as const, label: '系统' },
  { id: 'light' as const, label: '浅色' },
  { id: 'dark' as const, label: '夜晚' },
]

export function ThemeToggle() {
  const { pref, setPref } = useTheme()
  return (
    <Segmented<ThemePref>
      className="theme-toggle"
      ariaLabel="主题"
      value={pref}
      onChange={setPref}
      options={options}
    />
  )
}
