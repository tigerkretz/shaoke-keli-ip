import { useCallback, useEffect, useState } from 'react'
import { Characters } from './components/Characters'
import { EasterEgg } from './components/EasterEgg'
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

  const open = useCallback((item: LightboxItem) => setLightbox(item), [])

  const touch = useCallback((who: 'shaoye' | 'keli') => {
    setTouched((prev) => {
      const next = { ...prev, [who]: true }
      if (next.shaoye && next.keli) setEgg(true)
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
        <Merch onOpen={open} />
        <Gallery />
      </main>
      <Footer />
      {lightbox ? <Lightbox item={lightbox} onClose={() => setLightbox(null)} /> : null}
      {egg ? <EasterEgg onClose={() => setEgg(false)} /> : null}
    </>
  )
}
