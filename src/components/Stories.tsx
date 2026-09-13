import { useRef } from 'react'
import { stories } from '../data'
import type { LightboxItem } from './Lightbox'

export function Stories({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  const track = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    track.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section className="section" id="stories">
      <div className="section-head">
        <div>
          <p className="en-label">Daily stories</p>
          <h2>日常小剧场</h2>
        </div>
        <p className="lede">左右滑动，或用按钮一幕一幕看完他们的一天。</p>
      </div>
      <div className="stories-wrap">
        <div className="story-nav">
          <button className="icon-btn" type="button" onClick={() => scroll(-1)} aria-label="上一则">
            ←
          </button>
          <button className="icon-btn" type="button" onClick={() => scroll(1)} aria-label="下一则">
            →
          </button>
        </div>
        <div className="story-track" ref={track}>
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
              <img src={story.src} alt={story.title} />
              <div>
                <p className="en-label">{story.en}</p>
                <h3>{story.title}</h3>
                <p>{story.line}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
