import { images } from '../asset'

export function EasterEgg({ onClose }: { onClose: () => void }) {
  return (
    <div className="egg" role="dialog" aria-modal="true" aria-labelledby="egg-title">
      <div>
        <img src={images.duoPair} alt="少爷和可丽一直在一起" />
        <p className="en-label">Always together</p>
        <h2 id="egg-title">最好的陪伴，是和你在一起。</h2>
        <p>少爷 × 可丽。同一张设定表，同一段日常。</p>
        <button className="btn btn-gold" type="button" onClick={onClose}>
          把这一页收好
        </button>
      </div>
    </div>
  )
}
