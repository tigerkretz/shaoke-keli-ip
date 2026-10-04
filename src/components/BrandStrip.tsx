import { images } from '../asset'

export function BrandStrip() {
  return (
    <section className="frame closer" aria-label="收束">
      <p className="frame-label">09 / ALWAYS</p>
      <div className="closer-orb">
        <img src={images.duoPairSquare} alt="" />
      </div>
      <p className="en-label">Always together</p>
      <p className="closer-line">最好的陪伴，是和你在一起。</p>
    </section>
  )
}
