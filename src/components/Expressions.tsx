import { expressions } from '../data'
import type { LightboxItem } from './Lightbox'

export function Expressions({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section section-alt" id="expressions">
      <div className="section-head">
        <div>
          <p className="en-label">Expressions</p>
          <h2>表情集</h2>
        </div>
        <p className="lede">点开每一张脸。少爷负责装没事，可丽负责把情绪写在眼睛上。</p>
      </div>
      <div className="expr-grid">
        {expressions.map((item) => (
          <button
            key={item.src}
            type="button"
            className="card tile"
            onClick={() =>
              onOpen({
                src: item.src,
                alt: `${item.who}：${item.name}`,
                caption: `${item.who} · ${item.name} / ${item.en}`,
              })
            }
          >
            <img src={item.src} alt={`${item.who} ${item.name}`} />
            <span className="cap">
              <b>{item.name}</b>
              {item.who} · {item.en}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
