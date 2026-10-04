import { useCallback, useEffect, useState } from 'react'
import { Intro } from './components/Intro'
import { shouldPlayIntro } from './components/introGate'
import { BrandStrip } from './components/BrandStrip'
import { Characters } from './components/Characters'
import { EasterEgg } from './components/EasterEgg'
import { Downloads } from './components/Downloads'
import { Expressions } from './components/Expressions'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Lightbox, type LightboxItem } from './components/Lightbox'
import { Merch } from './components/Merch'
import { Nav } from './components/Nav'
import { Relationship } from './components/Relationship'
import { Stories } from './components/Stories'

type LightboxState = { items: LightboxItem[]; index: number }

export default function App() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [egg, setEgg] = useState(false)
  const [touched, setTouched] = useState({ shaoye: false, keli: false })
  const [intro, setIntro] = useState(() => shouldPlayIntro())

  const finishIntro = useCallback(() => setIntro(false), [])

  const open = useCallback((items: LightboxItem[], index = 0) => {
    if (!items.length) return
    setLightbox({ items, index: Math.min(Math.max(0, index), items.length - 1) })
  }, [])

  const touch = useCallback((who: 'shaoye' | 'keli') => {
    setTouched((prev) => {
      const next = { ...prev, [who]: true }
      if (next.shaoye && next.keli && !(prev.shaoye && prev.keli)) setEgg(true)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEgg(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const locked = lightbox !== null || egg
    if (!locked) return
    const root = document.documentElement
    const prevBody = document.body.style.overflow
    const prevRoot = root.style.overflow
    const prevPad = root.style.paddingRight
    const gap = window.innerWidth - root.clientWidth
    document.body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    if (gap > 0) root.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = prevBody
      root.style.overflow = prevRoot
      root.style.paddingRight = prevPad
    }
  }, [lightbox, egg])

  if (intro) return <Intro onDone={finishIntro} />

  return (
    <>
      <a className="skip-link" href="#main">
        跳到内容
      </a>
      <Nav />
      <main id="main" className="site">
        <Hero onTouch={touch} touched={touched} />
        <Characters onOpen={open} onTouch={touch} />
        <Relationship />
        <Expressions onOpen={open} />
        <Stories onOpen={open} />
        <Downloads onOpen={open} />
        <Merch onOpen={open} />
        <Gallery onOpen={open} />
        <BrandStrip />
      </main>
      <Footer />
      {lightbox ? (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(index) => setLightbox((cur) => (cur ? { ...cur, index } : cur))}
        />
      ) : null}
      {egg ? <EasterEgg onClose={() => setEgg(false)} /> : null}
    </>
  )
}
