import Link from 'next/link'
import { REVIEWS, type Review } from '@/lib/reviews'
import { COMPARISONS } from '@/lib/comparisons'

// Contextual internal-linking block for review pages. Google crawls low-DR
// sites more effectively when every page links out to ~5 relevant siblings;
// this component renders 4 sibling reviews + any comparison that involves the
// current platform.
export function RelatedReviews({ current }: { current: Review }) {
  const siblings = REVIEWS
    .filter((r) => r.slug !== current.slug && r.category === current.category)
    .slice(0, 4)

  // Match any comparison where either side's slug matches the review slug.
  const relatedComparisons = COMPARISONS.filter(
    (c) => c.a.slug === current.slug || c.b.slug === current.slug,
  )

  if (siblings.length === 0 && relatedComparisons.length === 0) return null

  return (
    <section style={wrap} aria-labelledby="related-heading">
      <h2 id="related-heading" style={heading}>
        Related reads
      </h2>

      {siblings.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={eyebrow}>Reviews in the same category</div>
          <div style={grid}>
            {siblings.map((s) => (
              <Link key={s.slug} href={`/reviews/${s.slug}/`} style={card}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 13, color: '#6f4a5d', lineHeight: 1.5 }}>
                  {s.tagline}
                </div>
                <div style={{ fontSize: 12, color: '#d6336c', fontWeight: 700, marginTop: 'auto' }}>
                  {s.status === 'published' ? 'Read review' : 'On the testing queue'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedComparisons.length > 0 && (
        <div>
          <div style={eyebrow}>See how {current.name} stacks up</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {relatedComparisons.map((c) => (
              <Link key={c.slug} href={`/comparisons/${c.slug}/`} style={pill}>
                {c.a.name} vs {c.b.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

const wrap: React.CSSProperties = {
  margin: '32px 0 28px',
  padding: '22px 24px',
  background: '#fafaf7',
  border: '1px solid #f6d3e1',
  borderRadius: 16,
}

const heading: React.CSSProperties = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 22,
  fontWeight: 700,
  color: '#2b0f1d',
  margin: '0 0 14px',
}

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#a61e4d',
  marginBottom: 10,
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
  gap: 12,
}

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  background: '#fff',
  border: '1px solid #f6d3e1',
  borderRadius: 12,
  padding: '14px 16px',
  color: '#331523',
  textDecoration: 'none',
}

const pill: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  background: '#fff',
  border: '1px solid #f0a3c2',
  color: '#a61e4d',
  fontSize: 13,
  fontWeight: 700,
  textDecoration: 'none',
}
