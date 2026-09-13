import { officialSheets } from '../data'
import type { LightboxItem } from './Lightbox'

export function Gallery({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="archive" id="sheets" aria-label="官方设定表">
      <p className="en-label">Archive</p>
      <p>完整成稿收在这里。点开才铺开。</p>
      <div className="archive-row">
        {officialSheets.map((sheet) => (
          <button
            key={sheet.src}
            type="button"
            className="archive-link"
            onClick={() => onOpen({ src: sheet.src, alt: sheet.name, caption: `${sheet.name} / ${sheet.en}` })}
          >
            <img src={sheet.thumb} alt="" />
            <span>
              {sheet.name}
              <em>{sheet.en}</em>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
