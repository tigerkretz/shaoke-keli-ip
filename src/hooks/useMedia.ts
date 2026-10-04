import { useEffect, useState } from 'react'

function useMatch(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMatch('(prefers-reduced-motion: reduce)')
}

/** Coarse pointer or a narrow viewport — treat as mobile for the hero canvas. */
export function useMobileHero() {
  const coarse = useMatch('(pointer: coarse)')
  const narrow = useMatch('(max-width: 720px)')
  return coarse || narrow
}
