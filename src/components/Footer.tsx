import { images } from '../asset'

export function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={images.logo} alt="少爷 × 可丽" />
      <p>
        <strong>少爷 × 可丽</strong>
      </p>
      <p className="footer-note">有你在，世界没那么可怕。</p>
    </footer>
  )
}
