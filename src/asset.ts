/**
 * GitHub Pages serves this repo at /shaoke-keli-ip/.
 * Image URLs must be full string literals so the built JS contains
 * `/shaoke-keli-ip/assets/...` — Vite will not fold BASE_URL + "/assets/...".
 */
export const images = {
  hero: '/shaoke-keli-ip/assets/duo-hero.webp',
  shaoyeSheet: '/shaoke-keli-ip/assets/shaoye-sheet.webp',
  keliSheet: '/shaoke-keli-ip/assets/keli-sheet.webp',
  relationship: '/shaoke-keli-ip/assets/relationship-cards.webp',
  merch: '/shaoke-keli-ip/assets/merch-board.webp',
  og: '/shaoke-keli-ip/assets/og-banner.webp',
  logo: '/shaoke-keli-ip/assets/logo.webp',
  logoRibbon: '/shaoke-keli-ip/assets/logo-ribbon.webp',
  duoPair: '/shaoke-keli-ip/assets/crops/duo-pair.webp',
  cutoutShaoye: '/shaoke-keli-ip/assets/social/cutout-shaoye-3x4.webp',
  cutoutKeli: '/shaoke-keli-ip/assets/social/cutout-keli-3x4.webp',
} as const
