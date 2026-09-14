import { useEffect, useState } from 'react'
import { images } from '../asset'

type Props = { onClose: () => void }

/**
 * 抖音关注卡片：桌面前「扫码关注」，手机端「保存图片→抖音扫一扫」。
 * 扫码/识别都直达抖音号 90890301968（少爷和可丽）。
 */
export function DouyinCard({ onClose }: Props) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="qr-modal" role="dialog" aria-modal="true" aria-label="抖音关注二维码" onClick={onClose}>
      <div className="qr-card" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <img className="qr-img" src={images.douyinQr} alt="少爷和可丽的抖音二维码" width={512} height={512} />
        <p className="qr-name">
          少爷和可丽 <em>抖音号 90890301968</em>
        </p>
        <p className="qr-hint">抖音扫一扫，或保存图片后在抖音内识别</p>
        <div className="qr-actions">
          <a
            className="btn btn-gold"
            href="https://www.douyin.com/user/90890301968"
            target="_blank"
            rel="noopener noreferrer"
          >
            打开抖音主页
          </a>
          <a className="btn btn-ghost" href={images.douyinCard} download="shaoye-keli-douyin.png" onClick={() => setSaved(true)}>
            {saved ? '已保存 ✓' : '保存二维码图片'}
          </a>
        </div>
      </div>
    </div>
  )
}
