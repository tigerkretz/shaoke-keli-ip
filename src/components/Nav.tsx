import { useEffect, useState } from 'react'
import { navItems } from '../data'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1))
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.4] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="nav">
      <a className="brand" href="#top">
        <img className="brand-logo" src="/assets/logo.png" alt="" />
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
