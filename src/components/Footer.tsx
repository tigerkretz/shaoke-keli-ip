import { images } from '../asset'

export function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={images.logo} alt="少爷 × 可丽" />
      <p className="en-label">Cats make a brighter day</p>
      <p>
        <strong>少爷 × 可丽</strong>
      </p>
      <p>有你在，世界没那么可怕的日常。</p>
    </footer>
  )
}
