import { useEffect, useState } from 'react'
import { images } from '../asset'

/**
 * 品牌开场：奶油底 → 爪印+双猫剪影浮现 → 标题渐显 → 整体上滑揭开首页。
 * 2.4s 总长；点击任意处立即进入；sessionStorage 记录后本次会话不再播放；
 * prefers-reduced-motion 用户直接跳过（CSS 层面关闭动画 + 立即卸载）。
 */
const TOTAL_MS = 2400

export function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), TOTAL_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, 700) // match .intro-leave duration
    return () => clearTimeout(t)
  }, [leaving, onDone])

  useEffect(() => {
    const skip = () => setLeaving(true)
    window.addEventListener('pointerdown', skip)
    return () => window.removeEventListener('pointerdown', skip)
  }, [])

  return (
    <div
      className={leaving ? 'intro intro-leave' : 'intro'}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro-inner">
        <div className="intro-paws" aria-hidden="true">
          <span>🐾</span>
          <span>🐾</span>
        </div>
        <div className="intro-cats">
          <img src={images.cutoutShaoye} alt="" loading="eager" decoding="async" />
          <img src={images.cutoutKeli} alt="" loading="eager" decoding="async" />
        </div>
        <h1 className="intro-title">少爷 × 可丽</h1>
        <p className="intro-en">Always together</p>
      </div>
      <p className="intro-skip">点击任意处进入</p>
    </div>
  )
}

