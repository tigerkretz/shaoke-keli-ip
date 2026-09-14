import { AssetImg } from '../AssetImg'
import { merch, merchBoard } from '../data'
import type { LightboxItem } from './Lightbox'

export function Merch({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section" id="merch">
      <div className="section-head">
        <div>
          <p className="en-label">In the room</p>
          <h2>可以带回家的</h2>
        </div>
        <p className="lede">抱枕、立牌、杯子。一对才算完整。</p>
      </div>
      <div className="merch-grid">
        {merch.map((item) => (
          <button
            key={item.src}
            type="button"
            className="merch-card"
            onClick={() =>
              onOpen({ src: item.src, alt: item.name, caption: `${item.name} / ${item.en} — ${item.note}` })
            }
          >
            <span className="merch-media">
              <AssetImg src={item.src} alt={item.name} w={800} h={1000} sizes="(max-width: 640px) 92vw, 28vw" />
            </span>
            <span className="merch-copy">
              <b>{item.name}</b>
              <em>{item.en}</em>
              <p>{item.note}</p>
            </span>
          </button>
        ))}
      </div>
      <p className="quiet-link">
        <button
          type="button"
          className="text-link"
          onClick={() =>
            onOpen({
              src: merchBoard.src,
              alt: merchBoard.name,
              caption: `${merchBoard.name} / ${merchBoard.en} — ${merchBoard.note}`,
            })
          }
        >
          想看整板再打开 →
        </button>
      </p>
    </section>
  )
}
