import { officialSheets } from '../data'
import type { LightboxItem } from './Lightbox'

export function Gallery({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section" id="sheets">
      <div className="section-head">
        <div>
          <p className="en-label">Official sheets</p>
          <h2>完整设定表</h2>
        </div>
        <p className="lede">站点只用这三张官方成稿。点开看原图。</p>
      </div>
      <div className="sheet-grid">
        {officialSheets.map((sheet) => (
          <button
            key={sheet.src}
            type="button"
            className="sheet-card"
            onClick={() => onOpen({ src: sheet.src, alt: sheet.name, caption: `${sheet.name} / ${sheet.en}` })}
          >
            <img src={sheet.src} alt={sheet.name} />
            <div>
              <b>{sheet.name}</b>
              <div>{sheet.en}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
