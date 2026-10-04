import { officialSheets } from '../data'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

export function Gallery({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const gallery: LightboxItem[] = officialSheets.map((sheet) => ({
    src: sheet.src,
    alt: sheet.name,
    caption: `${sheet.name} / ${sheet.en}`,
  }))

  return (
    <SectionFrame id="sheets" index="08" label="ARCHIVE" className="archive">
      <p className="archive-lead">完整成稿收在这里。点开才铺开。</p>
      <div className="archive-row">
        {officialSheets.map((sheet, index) => (
          <button
            key={sheet.src}
            type="button"
            className="archive-link"
            onClick={() => onOpen(gallery, index)}
          >
            <img
              src={sheet.thumb}
              alt=""
              className={index === 0 ? 'is-duo' : 'is-face'}
            />
            <span>
              {sheet.name}
              <em>{sheet.en}</em>
            </span>
          </button>
        ))}
      </div>
    </SectionFrame>
  )
}
