import { AssetImg } from '../AssetImg'
import { expressions } from '../data'
import type { LightboxItem } from './Lightbox'

export function Expressions({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section" id="expressions">
      <div className="section-head">
        <div>
          <p className="en-label">Faces</p>
          <h2>脸上藏不住</h2>
        </div>
        <p className="lede">点开看大一点。少爷装没事，可丽把情绪写在眼睛上。</p>
      </div>
      <div className="expr-grid">
        {expressions.map((item) => (
          <button
            key={item.src}
            type="button"
            className="tile"
            onClick={() =>
              onOpen({
                src: item.src,
                alt: `${item.who}：${item.name}`,
                caption: `${item.who} · ${item.name} / ${item.en}`,
              })
            }
          >
            <AssetImg src={item.src} alt={`${item.who} ${item.name}`} w={1200} h={1200} sizes="(max-width: 640px) 46vw, 18vw" />
            <span className="cap">
              <b>{item.name}</b>
              {item.who}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
