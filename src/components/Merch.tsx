import { merch, merchBoard } from '../data'
import type { LightboxItem } from './Lightbox'

export function Merch({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section section-alt" id="merch">
      <div className="section-head">
        <div>
          <p className="en-label">IP applications</p>
          <h2>周边应用</h2>
        </div>
        <p className="lede">官方周边板：抱枕、立牌、杯、袋与小物。点开单品看裁切。</p>
      </div>
      <button
        type="button"
        className="card merch-board"
        onClick={() =>
          onOpen({
            src: merchBoard.src,
            alt: merchBoard.name,
            caption: `${merchBoard.name} / ${merchBoard.en} — ${merchBoard.note}`,
          })
        }
      >
        <img src={merchBoard.src} alt={merchBoard.name} />
        <div>
          <b>{merchBoard.name}</b>
          <div>
            {merchBoard.en} — {merchBoard.note}
          </div>
        </div>
      </button>
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
