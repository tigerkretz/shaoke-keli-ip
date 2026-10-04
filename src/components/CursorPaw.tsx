import { useEffect, useRef, useState } from 'react'
import {
  applyCssCursorFallback,
  HOTSPOT,
  isClickable,
  isTextField,
  pawInlineSvg,
  type PawKind,
  strokeForTheme,
} from '../cursorPaw'
import { useFineDesktop, usePrefersReducedMotion } from '../hooks/useMedia'
import { useTheme } from '../theme'

export function CursorPaw() {
  const { resolved } = useTheme()
  const fineDesktop = useFineDesktop()
  const reduced = usePrefersReducedMotion()
  const useDom = fineDesktop && !reduced
  const wrapRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -80, y: -80 })
  const raf = useRef(0)
  const kindRef = useRef<PawKind>('default')
  const [kind, setKind] = useState<PawKind>('default')
  const [pressed, setPressed] = useState(false)
  const [ready, setReady] = useState(false)
  const [overText, setOverText] = useState(false)
  const stroke = strokeForTheme(resolved)

  useEffect(() => {
    applyCssCursorFallback(resolved)
  }, [resolved])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('paw-dom', useDom)
    root.classList.toggle('paw-css', fineDesktop && !useDom)
    return () => {
      root.classList.remove('paw-dom')
      if (fineDesktop) root.classList.add('paw-css')
      else root.classList.remove('paw-css')
    }
  }, [useDom, fineDesktop])

  useEffect(() => {
    if (!useDom) return
    const paint = () => {
      raf.current = 0
      const node = wrapRef.current
      if (!node) return
      const hs = HOTSPOT[kindRef.current]
      node.style.transform = `translate3d(${pos.current.x - hs.x}px, ${pos.current.y - hs.y}px, 0)`
    }
    const schedule = () => {
      if (!raf.current) raf.current = requestAnimationFrame(paint)
    }

    const inspect = (x: number, y: number) => {
      const hit = document.elementFromPoint(x, y)
      const text = isTextField(hit)
      setOverText(text)
      const next: PawKind = !text && isClickable(hit) ? 'heart' : 'default'
      if (kindRef.current !== next) {
        kindRef.current = next
        setKind(next)
        schedule()
      }
    }

    const onMove = (event: PointerEvent) => {
      pos.current.x = event.clientX
      pos.current.y = event.clientY
      setReady(true)
      inspect(event.clientX, event.clientY)
      schedule()
    }
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return
      setPressed(true)
    }
    const onUp = () => setPressed(false)
    const onLeave = () => {
      setReady(false)
      setPressed(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    schedule()
    return () => {
      cancelAnimationFrame(raf.current)
      raf.current = 0
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [useDom])

  if (!useDom) return null

  return (
    <div
      ref={wrapRef}
      className={`sk-paw${ready ? ' is-ready' : ''}${overText ? ' is-hidden' : ''}${pressed ? ' is-pressed' : ''}`}
      aria-hidden="true"
    >
      <div className="sk-paw-inner">
        <div
          className={`sk-paw-face${kind === 'default' ? ' is-on' : ''}`}
          dangerouslySetInnerHTML={{ __html: pawInlineSvg('default', stroke) }}
        />
        <div
          className={`sk-paw-face is-heart${kind === 'heart' ? ' is-on' : ''}`}
          dangerouslySetInnerHTML={{ __html: pawInlineSvg('heart', stroke) }}
        />
      </div>
    </div>
  )
}
