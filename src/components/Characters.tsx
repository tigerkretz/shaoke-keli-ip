import { useState } from 'react'
import { characters, type CatId } from '../data'
import type { LightboxItem } from './Lightbox'

type Props = {
  onOpen: (item: LightboxItem) => void
  onTouch: (who: CatId) => void
}

export function Characters({ onOpen, onTouch }: Props) {
  const [id, setId] = useState<CatId>('shaoye')
  const cat = characters[id]

  return (
    <section className="section" id="characters">
      <div className="section-head">
        <div>
          <p className="en-label">The pair</p>
          <h2>先认识这两只</h2>
        </div>
        <p className="lede">点肖像切换。完整设定表收在后面，不挡路。</p>
      </div>

      <div className="cast-switch" role="tablist" aria-label="角色切换">
        {(['shaoye', 'keli'] as const).map((key) => {
          const item = characters[key]
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={id === key}
              aria-pressed={id === key}
              data-cat={key}
              className="cast-tab"
              onClick={() => {
                setId(key)
                onTouch(key)
              }}
            >
              <img src={item.portrait} alt="" />
              <span>
                <b>
                  {item.name} {key === 'shaoye' ? '♔' : '❀'}
                </b>
                {item.tag}
              </span>
            </button>
          )
        })}
      </div>

      <div key={id} className="profile fade-swap">
        <button
          type="button"
          className="portrait-btn portrait-card"
          onClick={() => {
            onTouch(id)
            onOpen({ src: cat.portrait, alt: `${cat.name} 角色肖像`, caption: cat.tag })
          }}
        >
          <img src={cat.portrait} alt={`${cat.name} 肖像`} />
        </button>

        <div className="profile-copy">
          <p className="en-label">
            {cat.nameEn} · {cat.tagEn}
          </p>
          <p className="quote">「{cat.quote}」</p>
          <div className="pills">
            {cat.personality.slice(0, 3).map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <div className="pose-row">
            {cat.poses.map((pose) => (
              <figure key={pose.src}>
                <button
                  type="button"
                  className="pose-btn"
                  onClick={() => onOpen({ src: pose.src, alt: `${cat.name} ${pose.label}`, caption: pose.label })}
                >
                  <img src={pose.src} alt={`${cat.name} ${pose.label}`} />
                </button>
                <figcaption>{pose.label}</figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-ghost sheet-link"
            onClick={() => onOpen({ src: cat.sheet, alt: `${cat.name} 完整设定表`, caption: '官方角色设定表' })}
          >
            查看完整设定表
          </button>
        </div>
      </div>
    </section>
  )
}
