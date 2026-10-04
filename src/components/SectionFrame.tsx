import type { ReactNode } from 'react'

type Props = {
  id?: string
  index: string
  label: string
  title?: string
  lede?: string
  ledeWide?: boolean
  children: ReactNode
  className?: string
}

export function SectionFrame({ id, index, label, title, lede, ledeWide, children, className }: Props) {
  return (
    <section className={className ? `frame ${className}` : 'frame'} id={id}>
      <p className="frame-label">
        {index} / {label}
      </p>
      {title ? (
        <div className="section-head">
          <h2>{title}</h2>
          {lede ? <p className={ledeWide ? 'lede lede-wide' : 'lede'}>{lede}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
