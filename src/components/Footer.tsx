import { useState } from 'react'
import { images } from '../asset'
import { DouyinCard } from './DouyinCard'

const socials = [
  { key: 'douyin', label: '抖音' },
] as const

/**
 * 账号矩阵：目前只有抖音（号 90890301968）。
 * 小红书/B站开号后在 socials 加条目 + 复用 DouyinCard 的弹卡模式即可。
 * 商务合作走 mailto，避免暴露个人微信。
 */
export function Footer() {
  const [qrOpen, setQrOpen] = useState(false)

  return (
    <footer className="footer">
      <img className="footer-logo" src={images.logo} alt="少爷 × 可丽" />
      <p>
        <strong>少爷 × 可丽</strong>
      </p>
      <p className="footer-note">有你在，世界没那么可怕。</p>
      <nav className="footer-social" aria-label="社交媒体">
        {socials.map((s) => (
          <button key={s.key} type="button" className="footer-link-btn" onClick={() => setQrOpen(true)}>
            {s.label}
          </button>
        ))}
        <a href="mailto:shaoye_keli@vip.qq.com?subject=少爷×可丽 商务合作">商务合作</a>
      </nav>
      {qrOpen ? <DouyinCard onClose={() => setQrOpen(false)} /> : null}
    </footer>
  )
}
