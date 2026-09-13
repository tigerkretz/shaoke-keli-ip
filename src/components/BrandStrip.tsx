import { images } from '../asset'

export function BrandStrip() {
  return (
    <section className="closer" aria-label="收束">
      <div className="closer-orb">
        <img src={images.duoPair} alt="" />
      </div>
      <p className="en-label">Always together</p>
      <p className="closer-line">最好的陪伴，是和你在一起。</p>
    </section>
  )
}
