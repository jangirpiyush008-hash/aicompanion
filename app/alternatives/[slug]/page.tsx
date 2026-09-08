import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd, faqLd } from '@/lib/seo'
import { ALTERNATIVES, getAlternatives } from '@/lib/alternatives'
import { REVIEWS } from '@/lib/reviews'

export function generateStaticParams() {
  return ALTERNATIVES.map((a) => ({ slug: a.slug }))
}
export const dynamicParams = false

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const a = getAlternatives(slug)
  if (!a) return { title: 'Alternatives not found' }
  const path = `/alternatives/${a.slug}`
  const title = `${a.targetName} Alternatives 2026 — ${a.entries.length} Genuine Picks`
  const desc = a.intro.slice(0, 155)
  return pageMetadata({ title, description: desc, path, type: 'article' })
}

export default async function AlternativesPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const a = getAlternatives(slug)
  if (!a) notFound()

  const path = `/alternatives/${a.slug}`
  const title = `${a.targetName} Alternatives`
  const lds: unknown[] = [articleLd({ headline: title, description: a.intro, path })]
  if (a.faqs?.length) lds.push(faqLd(a.faqs))

  return (
    <PageLayout
      wide
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Alternatives', path: '/alternatives' },
        { name: `${a.targetName} alternatives`, path },
      ]}
      jsonLd={lds}
    >
      <H1>{a.targetName} Alternatives</H1>
      <Lede>{a.intro}</Lede>

      {a.targetSlug && (
        <div style={{ fontSize: 14, color: '#6f4a5d', margin: '-14px 0 24px' }}>
          Read our{' '}
          <Link href={`/reviews/${a.targetSlug}/`} style={{ color: '#c2185b', fontWeight: 700 }}>
            {a.targetName} review
          </Link>
          {' '}first if you haven&apos;t already.
        </div>
      )}

      <H2>Genuine alternatives</H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '10px 0 28px' }}>
        {a.entries.map((e) => {
          const r = REVIEWS.find((x) => x.slug === e.reviewSlug)
          if (!r) return null
          return (
            <div key={e.reviewSlug} style={{
              display: 'flex', gap: 18, flexWrap: 'wrap',
              background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14,
              padding: '18px 20px',
            }}>
              <div style={{ flex: '1 1 320px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                  <Link href={`/reviews/${r.slug}/`} style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d', textDecoration: 'none' }}>
                    {r.name}
                  </Link>
                  {r.status === 'published' && r.overall != null && (
                    <span style={score}>{r.overall}/10</span>
                  )}
                  {r.status !== 'published' && (
                    <span style={{ ...score, background: '#f6d3e1', color: '#7c1236' }}>Untested</span>
                  )}
                </div>
                <P>{e.reason}</P>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                  <Link href={`/reviews/${r.slug}/`} style={pill}>Read review →</Link>
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

      {a.faqs?.length ? (
        <>
          <H2>FAQ</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 20px' }}>
            {a.faqs.map((f) => (
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
