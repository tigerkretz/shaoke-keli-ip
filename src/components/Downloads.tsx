import { useState } from 'react'
import { AssetImg } from '../AssetImg'
import { downloads, downloadTabs, type DownloadItem } from '../data'

function Card({ item }: { item: DownloadItem }) {
  return (
    <figure className="dl-card">
      <a
        className="dl-media"
        href={item.href}
        download={item.file}
        aria-label={`下载 ${item.who} ${item.name}`}
      >
        <AssetImg src={item.src} alt={`${item.who} ${item.name}`} w={item.w} h={item.h} sizes="(max-width: 640px) 44vw, 20vw" />
      </a>
      <figcaption className="dl-copy">
        <b>{item.name}</b>
        <em>{item.who}</em>
        <span>{item.spec}</span>
        <a className="dl-btn" href={item.href} download={item.file}>
          下载
        </a>
      </figcaption>
    </figure>
  )
}

export function Downloads() {
  const [tab, setTab] = useState<(typeof downloadTabs)[number]['id']>('wallpaper')
  const active = downloadTabs.find((t) => t.id === tab) ?? downloadTabs[0]

  return (
    <section className="section section-soft" id="downloads">
      <div className="section-head">
        <div>
          <p className="en-label">Free to keep</p>
          <h2>喜欢的，带走</h2>
        </div>
        <p className="lede lede-wide">壁纸、表情、头像、立绘，全部免费。</p>
      </div>

      <div className="dl-tabs" role="tablist" aria-label="素材分类">
        {downloadTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`dl-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="dl-panel"
            className={tab === t.id ? 'dl-tab is-active' : 'dl-tab'}
            onClick={() => setTab(t.id)}
          >
            <b>{t.label}</b>
            <em>{t.en}</em>
            <span>{downloads[t.id].length}</span>
          </button>
        ))}
      </div>

      <div id="dl-panel" role="tabpanel" aria-labelledby={`dl-tab-${tab}`} className="dl-panel">
        <p className="dl-hint">{active.hint}</p>
        <div className={tab === 'wallpaper' ? 'dl-grid dl-grid-tall' : 'dl-grid'}>
          {downloads[tab].map((item) => (
            <Card key={item.href} item={item} />
          ))}
        </div>
      </div>

      <p className="dl-license">
        个人使用、二创、署名转载都免费，改了再发也欢迎 —— 标一下「少爷 × 可丽」就好。
        <br />
        商用（联名、印制、广告投放）请先<a href="mailto:tigerkretz@example.com?subject=少爷×可丽 素材商用授权">来信</a>。
      </p>
    </section>
  )
}
