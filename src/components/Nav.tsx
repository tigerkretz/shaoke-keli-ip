import { useEffect, useState } from 'react'
import { images } from '../asset'
import { navItems } from '../data'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))

    const onScroll = () => {
      const line = window.innerHeight * 0.28
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = id
      }
      setActive(`#${current}`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className="nav">
      <a className="brand" href="#top">
        <img className="brand-logo" src={images.logo} alt="" />
        <span className="brand-zh">少爷 × 可丽</span>
        <span className="brand-en">Always together</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
      >
        菜单
      </button>
      <nav id="site-nav" aria-label="页面导航">
        <ul className={open ? 'nav-links open' : 'nav-links'}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href || undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
