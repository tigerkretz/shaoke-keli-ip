import { AssetImg } from '../AssetImg'
import { images } from '../asset'

type Props = {
  onTouch: (who: 'shaoye' | 'keli') => void
  touched: { shaoye: boolean; keli: boolean }
}

export function Hero({ onTouch, touched }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="kicker">Always together</p>
        <h1>少爷 × 可丽</h1>
        <p className="tagline">有你在，就是家。</p>
        <p className="subline">傲娇的长毛少爷，和把全世界缩成一只猫的可丽。</p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#characters">
            认识他们
          </a>
          <a className="btn btn-ghost" href="#relationship">
            他们怎么相处
          </a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="hero-frame">
          <AssetImg
            className="hero-duo"
            src={images.duoPair}
            alt="少爷与可丽挨在一起：长毛白棕少爷，金渐层短毛可丽"
            w={1600}
            h={1389}
            sizes="(max-width: 980px) 92vw, 52vw"
            eager
          />
        </div>
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
    </section>
  )
}
