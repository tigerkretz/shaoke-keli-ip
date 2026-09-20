/**
 * GitHub Pages serves this repo at /shaoke-keli-ip/.
 * Image URLs must be full string literals so the built JS contains
 * `/shaoke-keli-ip/assets/...` — Vite will not fold BASE_URL + "/assets/...".
 *
 * 只放组件直接引用的图。data.ts 里那些属于数据项的图各自写全字面量。
 */
export const images = {
  logo: '/shaoke-keli-ip/assets/logo.webp',
  duoPair: '/shaoke-keli-ip/assets/crops/duo-pair.webp',
  duoPairSquare: '/shaoke-keli-ip/assets/crops/duo-pair-square.webp',
  cutoutShaoye: '/shaoke-keli-ip/assets/social/cutout-shaoye-3x4.webp',
  cutoutKeli: '/shaoke-keli-ip/assets/social/cutout-keli-3x4.webp',
  douyinQr: '/shaoke-keli-ip/assets/qr/douyin-qr.png',
  douyinCard: '/shaoke-keli-ip/assets/qr/douyin-card.png',
} as const
