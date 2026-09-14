import { images } from '../asset'

const socials = [
  { href: 'https://tigerkretz.github.io/shaoke-keli-ip/', label: '官网' },
] as const

/**
 * 占位：账号矩阵定稿后把真实链接填进 socials。
 * 商务合作走 mailto，避免暴露个人微信。
 */
export function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={images.logo} alt="少爷 × 可丽" />
      <p>
        <strong>少爷 × 可丽</strong>
      </p>
      <p className="footer-note">有你在，世界没那么可怕。</p>
      <nav className="footer-social" aria-label="社交媒体">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
        <a href="mailto:tigerkretz@example.com?subject=少爷×可丽 商务合作">商务合作</a>
      </nav>
    </footer>
  )
}
