import Link from 'next/link'
import type { ReactNode } from 'react'
import PageLayout, { H1, Lede, H2, P } from './PageLayout'
import SecretDesiresCTA from './SecretDesiresCTA'
import { REVIEWS } from '@/lib/reviews'
import { articleLd, faqLd } from '@/lib/seo'

export type BestOfEntry = {
  rank: number
  reviewSlug: string             // must exist in REVIEWS
  bestFor: string                // "Best for character creation"
  note: string                   // ~40-60 words on why they rank here
}

export default function BestOfPage({
  path,
  title,
  metaTitle,
  metaDescription,
  quickAnswer,
  intro,
  entries,
  faqs,
}: {
  path: string
  title: string
  metaTitle: string
  metaDescription: string
  quickAnswer: string
  intro?: ReactNode
  entries: BestOfEntry[]
  faqs?: { q: string; a: string }[]
}) {
  const lds: unknown[] = [articleLd({ headline: metaTitle, description: metaDescription, path })]
  if (faqs?.length) lds.push(faqLd(faqs))

  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: title, path }]}
      jsonLd={lds}
    >
      <H1>{title}</H1>
      <Lede>{quickAnswer}</Lede>

      <div style={{
        background: 'linear-gradient(160deg, #fde8f0, #fbd0e0)',
        border: '1px solid #f6d3e1',
        borderRadius: 14,
        padding: '18px 22px',
        margin: '4px 0 26px',
        fontSize: 14, lineHeight: 1.65, color: '#331523',
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c2255c', marginBottom: 6 }}>
          Quick Answer
        </div>
        {quickAnswer}
      </div>

      {intro}

      <H2>Our ranking</H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 0 28px' }}>
        {entries.map((e) => {
          const r = REVIEWS.find((x) => x.slug === e.reviewSlug)
          if (!r) return null
          const isPub = r.status === 'published'
          return (
            <div key={e.reviewSlug} style={{
              display: 'flex', gap: 18,
              background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14,
              padding: '20px 22px',
              boxShadow: '0 6px 20px rgba(214,51,108,0.08)',
              flexWrap: 'wrap',
            }}>
              <div style={{
                minWidth: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg,#f0417e,#ad1457)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700,
              }}>{e.rank}</div>
              <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <Link href={`/reviews/${r.slug}/`} style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#2b0f1d', textDecoration: 'none' }}>
                    {r.name}
                  </Link>
                  {isPub && r.overall != null && (
                    <span style={score}>{r.overall}/10</span>
                  )}
                  {!isPub && <span style={{ ...score, background: '#f6d3e1', color: '#7c1236' }}>Untested</span>}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c2255c' }}>
                  {e.bestFor}
                </div>
                <P>{e.note}</P>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                  <Link href={`/reviews/${r.slug}/`} style={pill}>Full review →</Link>
                  {r.affiliate && r.externalUrl && (
                    <a href={r.externalUrl} rel="sponsored noopener nofollow" target="_blank" style={{
                      background: 'linear-gradient(135deg,#f0417e,#ad1457)',
                      color: '#fff', borderRadius: 999, padding: '8px 16px',
                      fontSize: 13, fontWeight: 700, textDecoration: 'none',
                    }}>Try {r.name} →</a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {faqs?.length ? (
        <>
          <H2>FAQ</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 20px' }}>
            {faqs.map((f) => (
              <details key={f.q} style={{
                background: '#fff', border: '1px solid #f6d3e1',
                borderRadius: 12, padding: '14px 16px',
              }}>
                <summary style={{ fontWeight: 700, cursor: 'pointer', fontSize: 15.5, color: '#2b0f1d' }}>{f.q}</summary>
                <p style={{ margin: '8px 0 0', fontSize: 15, color: '#4a3040', lineHeight: 1.65 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </>
      ) : null}

      <div style={{ fontSize: 12.5, color: '#8a6274', marginBottom: 16 }}>
        Last updated: 2026-09-01 · <Link href="/methodology/" style={{ color: '#c2185b', fontWeight: 700 }}>Methodology</Link> · <Link href="/affiliate-disclosure/" style={{ color: '#c2185b', fontWeight: 700 }}>Affiliate disclosure</Link>
      </div>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const score: React.CSSProperties = {
  fontSize: 11, fontWeight: 800,
  padding: '3px 8px', borderRadius: 999,
  background: '#fde8f0', color: '#a61e4d',
  letterSpacing: '0.06em', textTransform: 'uppercase',
}
const pill: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 999,
  background: '#fff', border: '1px solid #f0a3c2',
  color: '#a61e4d', fontSize: 13, fontWeight: 700, textDecoration: 'none',
}

export { P, H2 }
