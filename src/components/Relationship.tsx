import { useState } from 'react'
import { AssetImg } from '../AssetImg'
import { relationships } from '../data'
import { Segmented } from './Segmented'
import { SectionFrame } from './SectionFrame'

export function Relationship() {
  const [id, setId] = useState<(typeof relationships)[number]['id']>('cuddle')
  const card = relationships.find((item) => item.id === id) ?? relationships[0]

  return (
    <SectionFrame
      id="relationship"
      index="03"
      label="TOGETHER"
      title="四件一起做的事"
      lede="黏着、挡风、同眠、同一扇窗。一次只读一件。"
    >
      <Segmented
        ariaLabel="关系"
        value={id}
        onChange={setId}
        options={[
          { id: 'cuddle', label: '黏着', en: 'Cuddle' },
          { id: 'protect', label: '挡风', en: 'Guard' },
          { id: 'sleep', label: '同眠', en: 'Sleep' },
          { id: 'sunset', label: '同一扇窗', en: 'Sunset' },
        ]}
      />
      <article key={card.id} className="panel fade-swap">
        <div className="panel-media hover-zoom">
          <AssetImg src={card.image} alt={card.title} w={1200} h={960} sizes="(max-width: 720px) 92vw, 52vw" />
        </div>
        <div className="panel-copy">
          <small>{card.kicker}</small>
          <h3>{card.title}</h3>
          <p>{card.preview}</p>
          <p className="panel-body">{card.body}</p>
        </div>
      </article>
    </SectionFrame>
  )
}
