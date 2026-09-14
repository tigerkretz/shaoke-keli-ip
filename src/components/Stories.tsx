import { AssetImg } from '../AssetImg'
import { stories } from '../data'
import type { LightboxItem } from './Lightbox'

export function Stories({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  return (
    <section className="section section-soft" id="stories">
      <div className="section-head">
        <div>
          <p className="en-label">Little days</p>
          <h2>普通的一天</h2>
        </div>
        <p className="lede">没有大事件。并排发呆，也算一件事。</p>
      </div>
      <div className="story-grid">
        {stories.map((story, index) => (
          <button
            key={story.src}
            type="button"
            className="story-card"
            onClick={() =>
              onOpen({
                src: story.src,
                alt: story.title,
                caption: `${index + 1}. ${story.title} — ${story.line}`,
              })
            }
          >
            <span className="story-media">
              <AssetImg src={story.src} alt={story.title} w={1200} h={1200} sizes="(max-width: 640px) 92vw, 22vw" />
            </span>
            <span className="story-copy">
              <small>{story.en}</small>
              <h3>{story.title}</h3>
              <p>{story.line}</p>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
