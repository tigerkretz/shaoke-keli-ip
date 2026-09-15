# 猫IP网站任务交接（QQ → 桌面端 Hermes）

> 桌面端接手时：读这份文件 + 让 agent `read_file /tmp/shaoke-keli-ip/HANDOFF.md` 即可无缝继续。

## 项目
- 仓库：github.com/tigerkretz/shaoke-keli-ip（少爷×可丽 猫IP官网）
- 本地克隆：`/tmp/shaoke-keli-ip`（main = 线上版本）
- 推送：SSH over 443 已配好（`~/.ssh/config` 的 github.com 块 + `~/.ssh/github_ed25519`），直接 `git push origin main`
- 线上：https://tigerkretz.github.io/shaoke-keli-ip/（GitHub Actions 自动部署，push 后约 2 分钟）
- 技术栈：React 19 + Vite 8 + TS，纯静态，GitHub Pages

## 2026-09-15 已上线
- WebP 全量 + 懒加载（资产 33.8M→2.6M）；OG 图保留 PNG（爬虫兼容）
- 系统字体栈（删了 Google Fonts，国内不再卡渲染）
- SEO：canonical/og:url/twitter 卡、robots.txt、sitemap.xml
- 页脚「抖音」弹二维码卡：抖音号 90890301968（少爷和可丽），用户已实扫验证 ✓
- 品牌入屏动画（方案A）：爪印→双猫滑入→标题→上滑揭开；2.4s；sessionStorage 每会话一次；点击跳过；reduced-motion 用户跳过

## 已修的坑（别再踩）
1. **改图片引用必须全量核对**：bundle 里抽出的每个 `/shaoke-keli-ip/assets/...` URL 逐个 HEAD 检查。曾因转换脚本漏扫 *.jpg 导致 20 张图 404
2. 圆形槽位（closer-orb）不能用 1600×1389 的 duo-pair（cover 裁切会切猫身），已换 `crops/duo-pair-square.webp`（1600×1600 奶油补边）
3. `/tmp` 会被系统清——新会话若仓库没了，重新 `git clone git@github.com:tigerkretz/shaoke-keli-ip.git /tmp/shaoke-keli-ip` 即可，SSH 配置在 `~/.ssh/config` 不会丢

## 待办
1. **表情包下载页**：用户本地已生成表情包，等他发文件/给目录。规划：单张下载+打包下载、署名转载授权、手机长按保存提示；图转 WebP 上站，zip 放 GitHub Release
2. **商务邮箱**：页脚 `tigerkretz@example.com` 是占位，等真值
3. **小红书**：用户明确暂缓
4. 自定义域名（IP 起量后）

## 部署验证习惯
push 后等 ~2 分钟，然后：
- `curl -s https://tigerkretz.github.io/shaoke-keli-ip/ | grep -o 'assets/index-[^"]*\.js'` 确认新 bundle
- 全量资产 HEAD 检查（参照 /tmp/check_refs2.py 的逻辑，如已清则重写）
