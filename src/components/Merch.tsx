import { AssetImg } from '../AssetImg'
import { merch, merchBoard } from '../data'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

export function Merch({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const gallery: LightboxItem[] = merch.map((item) => ({
    src: item.src,
    alt: item.name,
    caption: `${item.name} / ${item.en} — ${item.note}`,
  }))

  return (
    <SectionFrame
      id="merch"
      index="07"
      label="MERCH"
      title="可以带回家的"
      lede="抱枕、立牌、杯子。一对才算完整。"
    >
      <div className="merch-grid">
        {merch.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="merch-card hover-zoom"
            onClick={() => onOpen(gallery, index)}
          >
            <span className="merch-media">
              <AssetImg src={item.src} alt={item.name} w={800} h={1000} sizes="(max-width: 640px) 92vw, 28vw" />
            </span>
            <span className="merch-copy">
              <b>
                {item.name} <span className="card-arrow">→</span>
              </b>
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
            onOpen([
              {
                src: merchBoard.src,
                alt: merchBoard.name,
                caption: `${merchBoard.name} / ${merchBoard.en} — ${merchBoard.note}`,
              },
            ])
          }
        >
          想看整板再打开 <span className="card-arrow">→</span>
        </button>
      </p>
    </SectionFrame>
  )
}
