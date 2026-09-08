import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'
import { REVIEWS } from '@/lib/reviews'

const PATH = '/reviews'
const TITLE = 'AI Companion Platform Reviews — Hands-On Testing'
const DESC = 'Hands-on reviews of AI companion platforms scored across 9 weighted categories. Only tested platforms get a score.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function ReviewsIndexPage() {
  const published = REVIEWS.filter((r) => r.status === 'published')
  const planned = REVIEWS.filter((r) => r.status !== 'published')

  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Reviews', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companion Platform Reviews</H1>
      <Lede>
        Every review is scored across 9 weighted categories using our published{' '}
        <Link href="/methodology/" style={inlineLink}>methodology</Link>. Platforms we have not
        hands-on tested are listed as &quot;Not yet independently tested&quot; — we do not invent scores.
      </Lede>

      <H2>Published reviews</H2>
      <div style={grid}>
        {published.map((r) => (
          <Link key={r.slug} href={`/reviews/${r.slug}/`} style={card}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#2b0f1d' }}>{r.name}</span>
              {r.overall != null && (
                <span style={score}>{r.overall}/10</span>
              )}
            </div>
            <p style={cardBody}>{r.tagline}</p>
            <span style={cta}>Read review →</span>
          </Link>
        ))}
      </div>

      <H2>Not yet independently tested</H2>
      <P>
        These platforms are on our testing queue. We list them so you know they exist and are on
        our radar, but we do not publish scores until we&apos;ve completed the full test protocol.
      </P>
      <div style={grid}>
        {planned.map((r) => (
          <Link key={r.slug} href={`/reviews/${r.slug}/`} style={{ ...card, opacity: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d' }}>{r.name}</span>
              <span style={{ ...score, background: '#f6d3e1', color: '#7c1236' }}>Untested</span>
            </div>
            <p style={cardBody}>{r.tagline}</p>
            <span style={cta}>See details →</span>
          </Link>
        ))}
      </div>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
  gap: 14,
  margin: '10px 0 32px',
}
const card: React.CSSProperties = {
  padding: '18px 20px',
  background: '#fff',
  border: '1px solid #f6d3e1',
  borderRadius: 14,
  display: 'flex', flexDirection: 'column', gap: 8,
  textDecoration: 'none',
  color: '#331523',
}
const cardBody: React.CSSProperties = { fontSize: 14, color: '#6f4a5d', margin: 0, lineHeight: 1.55 }
const cta: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: '#c2185b' }
const score: React.CSSProperties = {
  fontSize: 11, fontWeight: 800,
  padding: '3px 8px',
  borderRadius: 999,
  background: '#fde8f0', color: '#a61e4d',
  letterSpacing: '0.06em', textTransform: 'uppercase',
}
const inlineLink: React.CSSProperties = { color: '#c2185b', fontWeight: 700 }
