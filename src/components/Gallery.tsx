import { photos } from '../data'
import type { LightboxItem } from './Lightbox'

export function Gallery({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section" id="gallery">
      <div className="section-head">
        <div>
          <p className="en-label">The real ones</p>
          <h2>真实的他们</h2>
        </div>
        <p className="lede">IP 背后是两只真猫。少爷是长毛白棕，可丽是金色英短。</p>
      </div>
      <div className="photo-grid">
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className="photo-card"
            onClick={() =>
              onOpen({
                src: photo.src,
                alt: `${photo.who} 生活照片`,
                caption: `${photo.who} · ${photo.caption}`,
              })
            }
          >
            <img src={photo.src} alt={`${photo.who} 生活照片`} />
            <div>
              <b>{photo.who}</b>
              <div>{photo.caption}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
