import { useState } from 'react'
import { AssetImg } from '../AssetImg'
import { characters, together, type CatId } from '../data'
import { Segmented } from './Segmented'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

type View = CatId | 'together'

type Props = {
  onOpen: (items: LightboxItem[], index?: number) => void
  onTouch: (who: CatId) => void
}

const views: { id: View; label: string }[] = [
  { id: 'shaoye', label: '少爷' },
  { id: 'keli', label: '可丽' },
  { id: 'together', label: '一起' },
]

export function Characters({ onOpen, onTouch }: Props) {
  const [view, setView] = useState<View>('shaoye')

  const onPick = (next: View) => {
    setView(next)
    if (next !== 'together') onTouch(next)
  }

  return (
    <SectionFrame
      id="characters"
      index="02"
      label="CHARACTERS"
      title="先认识这两只"
      lede="分段切换。完整设定表收在后面，不挡路。"
    >
      <Segmented<View> ariaLabel="角色切换" value={view} onChange={onPick} options={views} />

      {view === 'together' ? (
        <TogetherPanel onOpen={onOpen} />
      ) : (
        <SoloPanel key={view} id={view} onOpen={onOpen} onTouch={onTouch} />
      )}
    </SectionFrame>
  )
}

function SoloPanel({
  id,
  onOpen,
  onTouch,
}: {
  id: CatId
  onOpen: (items: LightboxItem[], index?: number) => void
  onTouch: (who: CatId) => void
}) {
  const cat = characters[id]
  const poseItems: LightboxItem[] = cat.poses.map((pose) => ({
    src: pose.src,
    alt: `${cat.name} ${pose.label}`,
    caption: pose.label,
  }))

  return (
    <div className="profile fade-swap">
      <button
        type="button"
        className="portrait-btn portrait-card hover-zoom"
        onClick={() => {
          onTouch(id)
          onOpen([{ src: cat.portrait, alt: `${cat.name} 角色肖像`, caption: cat.tag }])
        }}
      >
        <AssetImg src={cat.portrait} alt={`${cat.name} 肖像`} w={1080} h={1440} sizes="(max-width: 640px) 92vw, 38vw" />
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
          {cat.poses.map((pose, index) => (
            <figure key={pose.src}>
              <button
                type="button"
                className="pose-btn hover-zoom"
                onClick={() => onOpen(poseItems, index)}
              >
                <AssetImg src={pose.src} alt={`${cat.name} ${pose.label}`} w={1200} h={1200} sizes="18vw" />
              </button>
              <figcaption>{pose.label}</figcaption>
            </figure>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-ghost sheet-link"
          onClick={() => onOpen([{ src: cat.sheet, alt: `${cat.name} 完整设定表`, caption: '官方角色设定表' }])}
        >
          查看完整设定表 <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}

function TogetherPanel({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const pair: LightboxItem[] = [
    { src: characters.shaoye.portrait, alt: '少爷角色肖像', caption: characters.shaoye.tag },
    { src: characters.keli.portrait, alt: '可丽角色肖像', caption: characters.keli.tag },
  ]

  return (
    <div className="profile profile-together fade-swap">
      <div className="together-portraits">
        {pair.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="portrait-btn portrait-card hover-zoom"
            onClick={() => onOpen(pair, index)}
          >
            <AssetImg src={item.src} alt={item.alt} w={1080} h={1440} sizes="(max-width: 640px) 46vw, 20vw" />
          </button>
        ))}
      </div>
      <div className="profile-copy">
        <p className="en-label">
          {together.nameEn} · {together.tagEn}
        </p>
        <p className="quote">「{together.quote}」</p>
        <div className="pills">
          {together.personality.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-ghost sheet-link"
          onClick={() =>
            onOpen([
              { src: characters.shaoye.sheet, alt: '少爷完整设定表', caption: '官方角色设定表' },
              { src: characters.keli.sheet, alt: '可丽完整设定表', caption: '官方角色设定表' },
            ])
          }
        >
          查看两份设定表 <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}
