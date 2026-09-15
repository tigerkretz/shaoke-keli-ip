/** Session gate: play once per browser session. */
export function shouldPlayIntro(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem('intro-played')) return false
    sessionStorage.setItem('intro-played', '1')
    return true
  } catch {
    return false
  }
}
