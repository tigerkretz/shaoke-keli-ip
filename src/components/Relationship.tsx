import { useState } from 'react'
import { relationships } from '../data'

export function Relationship() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="section" id="relationship">
      <div className="section-head">
        <div>
          <p className="en-label">Relationship</p>
          <h2>关系设定</h2>
        </div>
        <p className="lede">四张官方关系卡：黏贴、挡风、同眠、同一扇窗。点开读完。</p>
      </div>
      <div className="rel-grid">
        {relationships.map((card) => (
          <button
            key={card.id}
            type="button"
            className="card rel-card"
            aria-expanded={open === card.id}
            onClick={() => setOpen((cur) => (cur === card.id ? null : card.id))}
          >
            <img src={card.image} alt="" />
            <span className="rel-copy">
              <small>{card.kicker}</small>
              <h3>{card.title}</h3>
              <p>{open === card.id ? card.body : `${card.preview} →`}</p>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
