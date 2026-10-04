import { AssetImg } from '../AssetImg'
import { expressions } from '../data'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

export function Expressions({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const gallery: LightboxItem[] = expressions.map((item) => ({
    src: item.src,
    alt: `${item.who}：${item.name}`,
    caption: `${item.who} · ${item.name} / ${item.en}`,
  }))

  return (
    <SectionFrame
      id="expressions"
      index="04"
      label="FACES"
      title="脸上藏不住"
      lede="点开看大一点。少爷装没事，可丽把情绪写在眼睛上。"
    >
      <div className="expr-grid">
        {expressions.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="tile hover-zoom"
            onClick={() => onOpen(gallery, index)}
          >
            <AssetImg src={item.src} alt={`${item.who} ${item.name}`} w={1200} h={1200} sizes="(max-width: 640px) 46vw, 18vw" />
            <span className="cap">
              <b>
                {item.name} <span className="card-arrow">→</span>
              </b>
              {item.who}
            </span>
          </button>
        ))}
      </div>
    </SectionFrame>
  )
}
