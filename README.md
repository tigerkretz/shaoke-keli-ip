# 少爷 × 可丽 · Always together

以两只猫为原型的 IP 微站点：傲娇黏人的长毛少爷，和胆小却超黏人的金色英短可丽。

视觉全部来自设定表、姿态表与生活照片的裁切／拼贴，不另画一张新的猫脸。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
```

产物在 `dist/`。预览：

```bash
npm run preview
```

## 内容结构

- 首页英雄图：一对坐姿
- 角色切换：少爷 / 可丽 的外形、性格、喜厌与口头禅
- 关系卡片：悬停或点按展开
- 表情集、日常小剧场、周边：点开放大
- 真实的他们：生活照片
- 小彩蛋：分别点一下英雄图里的两只猫

## 资源

`public/assets/crops` 与 `public/assets/photos` 由 `scripts/build-assets.py` 从源图裁出。重新裁切：

```bash
python3 scripts/build-assets.py
```
