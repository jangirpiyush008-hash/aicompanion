import Image from 'next/image'

// Hero image slot for reviews. If no image is provided we skip the block
// entirely — never render an empty placeholder box. Image is expected to be a
// 1200x630 WebP at /public/reviews/<slug>-hero.webp — generation prompts live
// in IMAGES_TO_GENERATE.md at the repo root.
export function ReviewHero({
  src,
  alt,
  caption,
}: {
  src?: string
  alt: string
  caption?: string
}) {
  if (!src) return null
  return (
    <figure style={figure}>
      <div style={imgWrap}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          priority
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      {caption && (
        <figcaption style={cap}>{caption}</figcaption>
      )}
    </figure>
  )
}

const figure: React.CSSProperties = {
  margin: '0 0 26px',
}

const imgWrap: React.CSSProperties = {
  borderRadius: 18,
  overflow: 'hidden',
  border: '1.5px solid #f2b8cf',
  boxShadow: '0 8px 30px rgba(214,51,108,0.16)',
  background: '#fde8f0',
}

const cap: React.CSSProperties = {
  fontSize: 12.5,
  color: '#8a6274',
  fontStyle: 'italic',
  marginTop: 8,
  textAlign: 'center',
  lineHeight: 1.5,
}
