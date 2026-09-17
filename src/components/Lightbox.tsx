export type LightboxItem = {
  src: string
  alt: string
  caption?: string
  /** 竖长图（如 9:20 手机壁纸）：收窄外框，避免两侧出现大片留白。 */
  tall?: boolean
}

export function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭">
        ×
      </button>
      <figure
        className={item.tall ? 'lightbox-figure is-tall' : 'lightbox-figure'}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} />
        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
      </figure>
    </div>
  )
}
