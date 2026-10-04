import { useCallback, useEffect, useRef, useState } from 'react'
import { images } from '../asset'
import { useMobileHero, usePrefersReducedMotion } from '../hooks/useMedia'
import { HeroCanvas } from './HeroCanvas'
import { SectionFrame } from './SectionFrame'

type Props = {
  onTouch: (who: 'shaoye' | 'keli') => void
  touched: { shaoye: boolean; keli: boolean }
}

type Ripple = { id: number; x: number; y: number }

export function Hero({ onTouch, touched }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const reduced = usePrefersReducedMotion()
  const mobile = useMobileHero()
  const shaderOn = !reduced && !mobile
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    const node = frameRef.current
    if (!node || reduced) return
    let raf = 0
    let running = true

    const tick = () => {
      if (!running) return
      const cur = pointer.current
      const next = target.current
      cur.x += (next.x - cur.x) * 0.085
      cur.y += (next.y - cur.y) * 0.085
      node.style.setProperty('--px', cur.x.toFixed(4))
      node.style.setProperty('--py', cur.y.toFixed(4))
      const together = Math.min(1, Math.hypot(cur.x, cur.y) * 1.15)
      node.style.setProperty('--together', together.toFixed(4))
      const idle = Math.abs(cur.x - next.x) < 0.001 && Math.abs(cur.y - next.y) < 0.001
      if (!idle || Math.hypot(next.x, next.y) > 0.001) raf = requestAnimationFrame(tick)
      else raf = 0
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const point = (clientX: number, clientY: number) => {
      const r = node.getBoundingClientRect()
      target.current = {
        x: ((clientX - r.left) / r.width) * 2 - 1,
        y: ((clientY - r.top) / r.height) * 2 - 1,
      }
      start()
    }

    const onMove = (event: PointerEvent) => point(event.clientX, event.clientY)
    const onLeave = () => {
      target.current = { x: 0, y: 0 }
      start()
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    node.addEventListener('pointercancel', onLeave)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      node.removeEventListener('pointercancel', onLeave)
    }
  }, [reduced])

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const node = frameRef.current
      if (!node) return
      const r = node.getBoundingClientRect()
      const id = Date.now() + Math.random()
      setRipples((list) => [...list, { id, x: event.clientX - r.left, y: event.clientY - r.top }])
      window.setTimeout(() => {
        setRipples((list) => list.filter((item) => item.id !== id))
      }, 720)
    },
    [reduced],
  )

  return (
    <SectionFrame id="top" index="01" label="HERO" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">Always together</p>
          <h1>少爷 × 可丽</h1>
          <p className="tagline">有你在，就是家。</p>
          <p className="subline">傲娇的长毛少爷，和把全世界缩成一只猫的可丽。</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#characters">
              认识他们
            </a>
            <a className="btn btn-ghost" href="#relationship">
              他们怎么相处 <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div className="hero-stage">
          <div
            className={reduced ? 'hero-frame is-still' : 'hero-frame'}
            ref={frameRef}
            onClick={onClick}
          >
            <HeroCanvas host={frameRef} pointer={pointer} active={shaderOn} />
            {reduced ? (
              <img
                className="hero-duo"
                src={images.duoPair}
                alt="少爷与可丽挨在一起：长毛白棕少爷，金渐层短毛可丽"
                width={1600}
                height={1389}
                loading="eager"
                decoding="sync"
              />
            ) : (
              <div className="hero-cats" aria-hidden="true">
                <div className="hero-cat hero-cat-l">
                  <img src={images.duoPair} alt="" width={1600} height={1389} loading="eager" decoding="async" />
                </div>
                <div className="hero-cat hero-cat-r">
                  <img src={images.duoPair} alt="" width={1600} height={1389} loading="eager" decoding="async" />
                </div>
              </div>
            )}
            <span className="sr-only">少爷与可丽挨在一起：长毛白棕少爷，金渐层短毛可丽</span>
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="hero-ripple"
                style={{ left: ripple.x, top: ripple.y }}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="hero-greet">
            <button
              type="button"
              className="chip chip-gold"
              aria-pressed={touched.shaoye}
              onClick={() => onTouch('shaoye')}
            >
              ♔ 和少爷打个招呼
            </button>
            <button
              type="button"
              className="chip chip-rose"
              aria-pressed={touched.keli}
              onClick={() => onTouch('keli')}
            >
              ❀ 和可丽打个招呼
            </button>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}
