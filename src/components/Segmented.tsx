import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export type SegOption<T extends string> = {
  id: T
  label: string
  en?: string
}

type Props<T extends string> = {
  value: T
  onChange: (id: T) => void
  options: readonly SegOption<T>[]
  ariaLabel: string
  className?: string
}

export function Segmented<T extends string>({ value, onChange, options, ariaLabel, className }: Props<T>) {
  const wrap = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState({ left: 0, width: 0, ready: false })

  const measure = useCallback(() => {
    const root = wrap.current
    if (!root) return
    const btn = root.querySelector<HTMLElement>(`[data-seg="${value}"]`)
    if (!btn) return
    const r = root.getBoundingClientRect()
    const b = btn.getBoundingClientRect()
    setInd({ left: b.left - r.left, width: b.width, ready: true })
  }, [value])

  useLayoutEffect(measure, [measure, options])

  useLayoutEffect(() => {
    const root = wrap.current
    if (!root || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    return () => ro.disconnect()
  }, [measure])

  return (
    <div className={className ? `seg ${className}` : 'seg'} role="tablist" aria-label={ariaLabel} ref={wrap}>
      <span
        className={ind.ready ? 'seg-ind is-ready' : 'seg-ind'}
        style={{ transform: `translateX(${ind.left}px)`, width: ind.width }}
        aria-hidden="true"
      />
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="tab"
          data-seg={option.id}
          aria-selected={value === option.id}
          className={value === option.id ? 'seg-btn is-active' : 'seg-btn'}
          onClick={() => onChange(option.id)}
        >
          <b>{option.label}</b>
          {option.en ? <em>{option.en}</em> : null}
        </button>
      ))}
    </div>
  )
}
