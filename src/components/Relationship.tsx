import { useState } from 'react'
import { relationships } from '../data'

export function Relationship() {
  const [open, setOpen] = useState<string | null>('cuddle')

  return (
    <section className="section section-soft" id="relationship">
      <div className="section-head">
        <div>
          <p className="en-label">How they stay</p>
          <h2>四件一起做的事</h2>
        </div>
        <p className="lede">黏着、挡风、同眠、同一扇窗。点开读一句就好。</p>
      </div>
      <div className="rel-grid">
        {relationships.map((card) => {
          const expanded = open === card.id
          return (
            <button
              key={card.id}
              type="button"
              className={expanded ? 'rel-card is-open' : 'rel-card'}
              aria-expanded={expanded}
              onClick={() => setOpen((cur) => (cur === card.id ? null : card.id))}
            >
              <span className="rel-media">
                <img src={card.image} alt="" />
              </span>
              <span className="rel-copy">
                <small>{card.kicker}</small>
                <h3>{card.title}</h3>
                <p>{expanded ? card.body : card.preview}</p>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
