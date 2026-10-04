import { useState } from 'react'
import { AssetImg } from '../AssetImg'
import { stories } from '../data'
import { Segmented } from './Segmented'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

const options = stories.map((story, index) => ({
  id: String(index),
  label: story.title.replace(/^(少爷|可丽)：/, ''),
  en: story.en,
}))

export function Stories({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const [id, setId] = useState('0')
  const index = Number(id)
  const story = stories[index] ?? stories[0]
  const gallery: LightboxItem[] = stories.map((item, i) => ({
    src: item.src,
    alt: item.title,
    caption: `${i + 1}. ${item.title} — ${item.line}`,
  }))

  return (
    <SectionFrame
      id="stories"
      index="05"
      label="DAILY"
      title="普通的一天"
      lede="没有大事件。并排发呆，也算一件事。"
    >
      <Segmented ariaLabel="日常" value={id} onChange={setId} options={options} />
      <button
        key={story.src}
        type="button"
        className="panel panel-btn fade-swap"
        onClick={() => onOpen(gallery, index)}
      >
        <span className="panel-media hover-zoom">
          <AssetImg src={story.src} alt={story.title} w={1200} h={1200} sizes="(max-width: 720px) 92vw, 42vw" />
        </span>
        <span className="panel-copy">
          <small>{story.en}</small>
          <h3>
            {story.title} <span className="card-arrow">→</span>
          </h3>
          <p>{story.line}</p>
        </span>
      </button>
    </SectionFrame>
  )
}
