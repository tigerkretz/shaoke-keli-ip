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
    <section className="section section-alt" id="characters">
      <div className="section-head">
        <div>
          <p className="en-label">Character</p>
          <h2>角色设定</h2>
        </div>
        <p className="lede">点选少爷或可丽，切换外形、性格与口头禅。画像来自设定表与姿态表裁切。</p>
      </div>

      <div className="switcher" role="tablist" aria-label="角色切换">
        {(['shaoye', 'keli'] as const).map((key) => {
          const item = characters[key]
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={id === key}
              aria-pressed={id === key}
              onClick={() => {
                setId(key)
                onTouch(key)
              }}
            >
              <b>
                {item.name} {key === 'shaoye' ? '♔' : '❀'}
              </b>
              <span>
                {item.nameEn} · {item.tag}
              </span>
            </button>
          )
        })}
      </div>

      <div className="profile">
        <div className="portrait-card">
          <button
            type="button"
            className="portrait-btn"
            onClick={() => {
              onTouch(id)
              onOpen({ src: cat.portrait, alt: `${cat.name} 角色肖像`, caption: cat.tag })
            }}
          >
            <img src={cat.portrait} alt={`${cat.name} 设定表裁切肖像`} />
          </button>
          <p className="note">
            角色视觉来自设定表／姿态表裁切，待用户二次创作素材替换。外形锁定：
            {cat.appearance.slice(0, 2).join('；')}。
          </p>
        </div>

        <div>
          <p className="en-label">
            {cat.nameEn} · {cat.tagEn}
          </p>
          <p className="quote">「{cat.quote}」</p>
          <div className="meta-grid">
            <article className="meta-card">
              <h3>外形 Appearance</h3>
              <ul>
                {cat.appearance.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
            <article className="meta-card">
              <h3>性格 Personality</h3>
              <ul>
                {cat.personality.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
            <article className="meta-card">
              <h3>喜欢 Likes</h3>
              <ul>
                {cat.likes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
            <article className="meta-card">
              <h3>讨厌 Dislikes</h3>
              <ul>
                {cat.dislikes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="pose-row">
            {cat.poses.map((pose) => (
              <figure key={pose.src}>
                <button
                  type="button"
                  className="portrait-btn"
                  onClick={() => onOpen({ src: pose.src, alt: `${cat.name} ${pose.label}`, caption: pose.label })}
                >
                  <img src={pose.src} alt={`${cat.name} ${pose.label}`} />
                </button>
                <figcaption>{pose.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
