import { images } from '../asset'

type Props = {
  onTouch: (who: 'shaoye' | 'keli') => void
  touched: { shaoye: boolean; keli: boolean }
}

export function Hero({ onTouch, touched }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <img
          className="hero-duo"
          src={images.hero}
          alt="少爷与可丽双人主视觉：长毛白棕少爷与金色英短可丽坐在一起"
        />
        <div className="hero-greet">
          <button
            type="button"
            className="chip chip-gold"
            aria-pressed={touched.shaoye}
            onClick={() => onTouch('shaoye')}
          >
            ♔ 和少爷打个招呼
          </button>
          <button
            type="button"
            className="chip chip-rose"
            aria-pressed={touched.keli}
            onClick={() => onTouch('keli')}
          >
            ❀ 和可丽打个招呼
          </button>
        </div>
      </div>
      <div className="hero-copy">
        <p className="kicker">Duo Cat IP · Brand Bible</p>
        <h1>少爷 × 可丽</h1>
        <p className="tagline">有你在，就是家。</p>
        <p className="subline">
          最好的陪伴，是和你在一起。Shào Yé &amp; Kě Lì — cool and clingy, timid and
          braver-together.
        </p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#characters">
            认识他们
          </a>
          <a className="btn btn-ghost" href="#sheets">
            完整设定表
          </a>
        </div>
        <p className="hint">分别点一下少爷和可丽，他们会给你看「一直在一起」的瞬间。</p>
      </div>
    </section>
  )
}
