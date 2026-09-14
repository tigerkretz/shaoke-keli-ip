type Props = {
  src: string
  alt: string
  w: number
  h: number
  sizes?: string
  className?: string
  /** Only the hero image should eager+high; everything below the fold lazy-loads. */
  eager?: boolean
}

/** High-res crop with explicit intrinsic size so the browser reserves layout space. */
export function AssetImg({
  src,
  alt,
  w,
  h,
  sizes = '(max-width: 640px) 92vw, 36vw',
  className,
  eager = false,
}: Props) {
  return (
    <img
      className={className}
      src={src}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      // @ts-expect-error -- fetchpriority is valid HTML but not yet in React's types
      fetchpriority={eager ? 'high' : undefined}
    />
  )
}
