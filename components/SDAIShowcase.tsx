import Image from 'next/image'
import { SDAI_SHOWCASE, SDAI_SHOWCASE_LABELS, SECRET_DESIRES_AFFILIATE_URL, sdaiCharUrl, type SdaiCategory } from '@/lib/site'

export default function SDAIShowcase({ category }: { category: SdaiCategory }) {
  const chars = SDAI_SHOWCASE.filter((c) => c.category === category)
  if (chars.length === 0) return null
  const { heading, blurb } = SDAI_SHOWCASE_LABELS[category]

  return (
    <section
      aria-label={heading}
      style={{
        margin: '28px 0 32px',
        padding: '22px 22px 26px',
        background: 'linear-gradient(160deg,#fff7fb,#fde8f0)',
        border: '1px solid #f6d3e1',
        borderRadius: 16,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: 999,
          background: '#fde8f0',
          color: '#7c1236',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Sponsored · Secret Desires
      </div>
      <h2
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 26,
          fontWeight: 700,
          color: '#2b0f1d',
          margin: '0 0 6px',
        }}
      >
        {heading}
      </h2>
      <p style={{ fontSize: 14.5, color: '#4a3040', margin: '0 0 18px', lineHeight: 1.6 }}>{blurb}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
          gap: 16,
        }}
      >
        {chars.map((c) => (
          <a
            key={c.slug}
            href={sdaiCharUrl(c)}
            target="_blank"
            rel="sponsored noopener noreferrer"
            style={{
              position: 'relative',
              display: 'block',
              borderRadius: 14,
              overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
              color: '#fff',
              textDecoration: 'none',
              background: '#2b0f1d',
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4' }}>
              <Image
                src={`/sdai-showcase/${c.slug}/1.webp`}
                alt={`${c.name} — Secret Desires AI companion`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 220px"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            {c.imageCount > 1 ? (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: 'rgba(43,15,29,0.72)',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {c.imageCount} pics
              </div>
            ) : null}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top,rgba(43,15,29,0.9),rgba(43,15,29,0.15) 42%,transparent 62%)',
              }}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 14 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700 }}>
                {c.name}
                {c.age != null ? <span style={{ fontSize: 13, color: '#ffa8c9', fontWeight: 500, marginLeft: 6 }}>· {c.age}</span> : null}
              </div>
              <div style={{ fontSize: 12.5, color: '#f7c9dc', marginTop: 2, lineHeight: 1.45 }}>{c.teaser}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffa8c9', marginTop: 6 }}>Meet {c.name} on Secret Desires</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <a
          href={SECRET_DESIRES_AFFILIATE_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            borderRadius: 999,
            background: 'linear-gradient(135deg,#f0417e,#ad1457)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Try Secret Desires
        </a>
      </div>
    </section>
  )
}
