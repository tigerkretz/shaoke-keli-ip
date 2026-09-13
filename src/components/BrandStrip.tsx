import { images } from '../asset'

export function BrandStrip() {
  return (
    <section className="section brand-strip" aria-label="品牌横幅">
      <img src={images.og} alt="少爷 × 可丽 — 和你在一起，就是最好的日常" />
    </section>
  )
}
