import { useState } from 'react'
import { AssetImg } from '../AssetImg'
import { downloads, downloadTabs, type DownloadItem } from '../data'
import { Segmented } from './Segmented'
import { SectionFrame } from './SectionFrame'
import type { LightboxItem } from './Lightbox'

function Card({
  item,
  items,
  onOpen,
}: {
  item: DownloadItem
  items: DownloadItem[]
  onOpen: (items: LightboxItem[], index?: number) => void
}) {
  const gallery: LightboxItem[] = items.map((entry) => ({
    src: entry.href,
    alt: `${entry.who} ${entry.name}`,
    caption: `${entry.name} · ${entry.who} — ${entry.spec}`,
    tall: entry.h >= entry.w * 2,
  }))
  const index = items.findIndex((entry) => entry.href === item.href)

  return (
    <figure className="dl-card">
      <button
        type="button"
        className="dl-media hover-zoom"
        aria-label={`预览 ${item.who} ${item.name}`}
        onClick={() => onOpen(gallery, Math.max(0, index))}
      >
        <AssetImg src={item.src} alt={`${item.who} ${item.name}`} w={item.w} h={item.h} sizes="(max-width: 640px) 44vw, 20vw" />
        <span className="dl-zoom" aria-hidden="true">
          看大图
        </span>
      </button>
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

export function Downloads({ onOpen }: { onOpen: (items: LightboxItem[], index?: number) => void }) {
  const [tab, setTab] = useState<(typeof downloadTabs)[number]['id']>('wallpaper')
  const active = downloadTabs.find((t) => t.id === tab) ?? downloadTabs[0]
  const items = downloads[tab]

  return (
    <SectionFrame
      id="downloads"
      index="06"
      label="KEEP"
      title="喜欢的，带走"
      lede="壁纸、表情、头像、立绘，全部免费。"
      ledeWide
    >
      <Segmented
        ariaLabel="素材分类"
        value={tab}
        onChange={setTab}
        options={downloadTabs.map((t) => ({ id: t.id, label: t.label, en: t.en }))}
      />

      <div id="dl-panel" role="tabpanel" aria-labelledby={`dl-tab-${tab}`} className="dl-panel">
        <p className="dl-hint">{active.hint}</p>
        <div className={tab === 'wallpaper' ? 'dl-grid dl-grid-tall' : 'dl-grid'}>
          {items.map((item) => (
            <Card key={item.href} item={item} items={items} onOpen={onOpen} />
          ))}
        </div>
      </div>

      <p className="dl-license">
        个人使用、二创、署名转载都免费，改了再发也欢迎 —— 标一下「少爷 × 可丽」就好。
        <br />
        商用（联名、印制、广告投放）请先<a href="mailto:shaoye_keli@vip.qq.com?subject=少爷×可丽 素材商用授权">来信</a>。
      </p>
    </SectionFrame>
  )
}
