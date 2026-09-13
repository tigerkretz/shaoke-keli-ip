export type LightboxItem = {
  src: string
  alt: string
  caption?: string
}

export function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭">
        ×
      </button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
      </figure>
    </div>
  )
}
