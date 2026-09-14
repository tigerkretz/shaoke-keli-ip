type Props = {
  src: string
  alt: string
  w: number
  h: number
  sizes?: string
  className?: string
}

/** High-res crop + srcset so the browser does not invent a tiny intrinsic size. */
export function AssetImg({ src, alt, w, h, sizes = '(max-width: 640px) 92vw, 36vw', className }: Props) {
  return (
    <img
      className={className}
      src={src}
      srcSet={`${src} ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
    />
  )
}
