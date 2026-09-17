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

export default function App() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null)
  const [egg, setEgg] = useState(false)
  const [touched, setTouched] = useState({ shaoye: false, keli: false })
  const [intro, setIntro] = useState(() => shouldPlayIntro())

  const finishIntro = useCallback(() => setIntro(false), [])

  const open = useCallback((item: LightboxItem) => setLightbox(item), [])

  const touch = useCallback((who: 'shaoye' | 'keli') => {
    setTouched((prev) => {
      const next = { ...prev, [who]: true }
      if (next.shaoye && next.keli && !(prev.shaoye && prev.keli)) setEgg(true)
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null)
        setEgg(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // 弹层打开时锁住背景滚动：否则预览一张壁纸的同时页面还在背后动。
  // 注意标准模式下滚动容器是 <html>，只设 body 不生效。
  useEffect(() => {
    const locked = lightbox !== null || egg
    if (!locked) return
    const root = document.documentElement
    const prevBody = document.body.style.overflow
    const prevRoot = root.style.overflow
    const prevPad = root.style.paddingRight
    // 滚动条消失会带来横向跳动，用等宽 padding 补偿
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
      <main id="main">
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
      {lightbox ? <Lightbox item={lightbox} onClose={() => setLightbox(null)} /> : null}
      {egg ? <EasterEgg onClose={() => setEgg(false)} /> : null}
    </>
  )
}
