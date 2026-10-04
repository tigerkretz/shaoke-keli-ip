import { useEffect, useRef } from 'react'

export type LightboxItem = {
  src: string
  alt: string
  caption?: string
  /** 竖长图（如 9:20 手机壁纸）：收窄外框，避免两侧出现大片留白。 */
  tall?: boolean
}

type Props = {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onIndex: (index: number) => void
}

export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const item = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const many = items.length > 1

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (!many) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onIndex((index + 1) % items.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onIndex((index - 1 + items.length) % items.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, many, onClose, onIndex])

  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭" ref={closeRef}>
        ×
      </button>
      {many ? (
        <>
          <button
            type="button"
            className="lightbox-nav is-prev"
            aria-label="上一张"
            onClick={(event) => {
              event.stopPropagation()
              onIndex((index - 1 + items.length) % items.length)
            }}
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox-nav is-next"
            aria-label="下一张"
            onClick={(event) => {
              event.stopPropagation()
              onIndex((index + 1) % items.length)
            }}
          >
            →
          </button>
        </>
      ) : null}
      <figure
        className={item.tall ? 'lightbox-figure is-tall' : 'lightbox-figure'}
        onClick={(event) => event.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} />
        {item.caption ? (
          <figcaption>
            {item.caption}
            {many ? ` · ${index + 1}/${items.length}` : null}
          </figcaption>
        ) : null}
      </figure>
    </div>
  )
}
