import { merch } from '../data'
import type { LightboxItem } from './Lightbox'

export function Merch({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section section-alt" id="merch">
      <div className="section-head">
        <div>
          <p className="en-label">IP applications</p>
          <h2>周边应用</h2>
        </div>
        <p className="lede">周边稿全部来自设定表裁切。悬停看边线，点开放大。</p>
      </div>
      <div className="merch-grid">
        {merch.map((item) => (
          <button
            key={item.src}
            type="button"
            className="card merch-card"
            onClick={() =>
              onOpen({ src: item.src, alt: item.name, caption: `${item.name} / ${item.en} — ${item.note}` })
            }
          >
            <img src={item.src} alt={item.name} />
            <div>
              <b>{item.name}</b>
              <div>{item.en}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
