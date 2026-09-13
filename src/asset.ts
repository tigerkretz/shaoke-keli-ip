/**
 * GitHub Pages serves this repo at /shaoke-keli-ip/.
 * Image URLs must be full string literals so the built JS contains
 * `/shaoke-keli-ip/assets/...` — Vite will not fold BASE_URL + "/assets/...".
 */
export const images = {
  hero: '/shaoke-keli-ip/assets/duo-hero.png',
  shaoyeSheet: '/shaoke-keli-ip/assets/shaoye-sheet.png',
  keliSheet: '/shaoke-keli-ip/assets/keli-sheet.png',
  relationship: '/shaoke-keli-ip/assets/relationship-cards.png',
  merch: '/shaoke-keli-ip/assets/merch-board.png',
  og: '/shaoke-keli-ip/assets/og-banner.png',
  logo: '/shaoke-keli-ip/assets/logo.png',
  logoRibbon: '/shaoke-keli-ip/assets/logo-ribbon.png',
  duoPair: '/shaoke-keli-ip/assets/crops/duo-pair.png',
} as const
