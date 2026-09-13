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
        <p className="lede">悬停或点按卡片，看傲娇与黏人怎样互相成为挡风的人。</p>
      </div>
      <div className="rel-grid">
        {relationships.map((card) => (
          <button
            key={card.id}
            type="button"
            className="rel-card"
            aria-expanded={open === card.id}
            onClick={() => setOpen((cur) => (cur === card.id ? null : card.id))}
          >
            <img src={card.image} alt="" />
            <span className="rel-shade" />
            <span className="rel-copy">
              <small>{card.kicker}</small>
              <h3>{card.title}</h3>
              <p>
                {open === card.id ? card.body : card.preview} {open === card.id ? '' : '→'}
              </p>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
