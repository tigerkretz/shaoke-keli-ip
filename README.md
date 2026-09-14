# 少爷 × 可丽 · Always together

以两只猫为原型的 IP 微站点：傲娇黏人的长毛少爷，和胆小却超黏人的金色英短可丽。

## 官方成稿（只用这些猫脸）

- `public/assets/duo-hero.png` — 首页主视觉
- `public/assets/shaoye-sheet.png` / `keli-sheet.png` — 角色切换、表情、姿态裁切
- `public/assets/relationship-cards.png` — 关系四格
- `public/assets/merch-board.png` — 周边板
- `public/assets/og-banner.png` — 社交预览 / 页尾品牌横幅

`public/assets/crops/` 全部从以上成稿裁切。不含生活照片，不另造脸。

社交导出（同样只裁官方成稿，`python3 scripts/make-social.py`）：

- `public/assets/social/cutout-shaoye-3x4.png` / `cutout-keli-3x4.png` — 1080×1440 网站肖像
- `public/assets/social/ig-portrait-shaoye.png` / `ig-portrait-keli.png` — 1080×1350
- `public/assets/social/ig-square-duo.png` — 1080×1080
- `public/assets/social/ig-story-duo.png` — 1080×1920

站点裁切统一尺寸（`python3 scripts/export-all.py`）：肖像 1080×1440，方图 1200×1200，关系卡 1200×960，周边 800×1000，双人主图长边 1600。

## 品牌标

- `public/assets/logo.png` — 圆形徽章，导航与页脚主标
- `public/assets/logo-ribbon.png` — 丝带名牌变体（备份）
- `public/favicon.ico` / `favicon-32.png` / `favicon-192.png` / `apple-touch-icon.png` — 从主标居中方裁生成

## 在线预览

https://tigerkretz.github.io/shaoke-keli-ip/

## 本地演示

```bash
npm install
npm run dev
# open http://localhost:5173/shaoke-keli-ip/
```

```bash
npm run build
npm run preview
```

## 内容

- 首页：双人主视觉海报
- 角色切换：奶油底 + 少爷软金 / 可丽软玫瑰描边
- 关系：官方四格卡，点开读文案
- 表情、日常：设定表与海报图库裁切
- 周边：官方周边板 + 六件单品裁切
- 完整设定表：三张原图
- 小彩蛋：分别和两只猫打个招呼
