type Props = {
  onTouch: (who: 'shaoye' | 'keli') => void
  touched: { shaoye: boolean; keli: boolean }
}

export function Hero({ onTouch, touched }: Props) {
  return (
    <section className="hero" id="top">
      <div className="hero-stage float-l">
        <img
          className="hero-duo"
          src="/assets/crops/hero-duo.jpg"
          alt="少爷与可丽坐在一起：长毛白棕的少爷在左，金色英短可丽在右"
        />
        <div className="hero-hotspots">
          <button
            type="button"
            className="hotspot"
            aria-pressed={touched.shaoye}
            aria-label="和少爷打个招呼"
            onClick={() => onTouch('shaoye')}
          />
          <button
            type="button"
            className="hotspot"
            aria-pressed={touched.keli}
            aria-label="和可丽打个招呼"
            onClick={() => onTouch('keli')}
          />
        </div>
      </div>
      <div className="hero-copy float-r">
        <p className="kicker">Duo Cat IP · Brand Bible</p>
        <h1>少爷 × 可丽</h1>
        <p className="tagline">有你在，世界没那么可怕。</p>
        <p className="subline">
          Shào Yé &amp; Kě Lì. Cool and clingy, timid and braver-together.
          Cats make a brighter day.
        </p>
        <div className="hero-actions">
          <a className="btn btn-gold" href="#characters">
            认识他们
          </a>
          <a className="btn btn-ghost" href="#coming">
            后续素材
          </a>
        </div>
        <p className="hint">
          小互动：分别点一点左边的少爷、右边的可丽，他们会给你看「一直在一起」的瞬间。
        </p>
      </div>
    </section>
  )
}
