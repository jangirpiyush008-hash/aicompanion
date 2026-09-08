import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout, { H1, Lede, H2, P, UL, Callout } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd, faqLd } from '@/lib/seo'
import { COMPARISONS, getComparison } from '@/lib/comparisons'

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }))
}
export const dynamicParams = false

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const c = getComparison(slug)
  if (!c) return { title: 'Comparison not found' }
  const path = `/comparisons/${c.slug}`
  const title = `${c.a.name} vs ${c.b.name} 2026 — Which AI Companion Wins?`
  const desc = c.quickVerdict.slice(0, 155)
  return pageMetadata({ title, description: desc, path, type: 'article' })
}

export default async function ComparisonPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const c = getComparison(slug)
  if (!c) notFound()

  const path = `/comparisons/${c.slug}`
  const title = `${c.a.name} vs ${c.b.name}`
  const winnerName = c.ourPick === 'a' ? c.a.name : c.ourPick === 'b' ? c.b.name : 'Tie'

  const lds: unknown[] = [
    articleLd({ headline: title, description: c.quickVerdict, path, dateModified: c.lastUpdated }),
  ]
  if (c.faqs.length) lds.push(faqLd(c.faqs))

  return (
    <PageLayout
      wide
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Comparisons', path: '/comparisons' },
        { name: `${c.a.name} vs ${c.b.name}`, path },
      ]}
      jsonLd={lds}
    >
      <H1>{c.a.name} vs {c.b.name}</H1>
      <Lede>{c.quickVerdict}</Lede>

      <Callout title="Our pick">
        <strong>{winnerName}</strong> — see the feature-by-feature breakdown below for why, and
        when the other platform is the better choice.
      </Callout>

      <H2>Feature-by-feature</H2>
      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr style={{ background: '#fde8f0' }}>
              <th style={th}>Feature</th>
              <th style={{ ...th, textAlign: 'left' }}>{c.a.name}</th>
              <th style={{ ...th, textAlign: 'left' }}>{c.b.name}</th>
              <th style={{ ...th, textAlign: 'center' }}>Winner</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row) => (
              <tr key={row.feature} style={{ borderTop: '1px solid #f6d3e1' }}>
                <td style={{ ...td, fontWeight: 700 }}>{row.feature}</td>
                <td style={td}>{row.a}</td>
                <td style={td}>{row.b}</td>
                <td style={{ ...td, textAlign: 'center', fontWeight: 700, color: row.winner === 'tie' ? '#8a6274' : '#c2185b' }}>
                  {row.winner === 'a' ? c.a.name : row.winner === 'b' ? c.b.name : row.winner === 'tie' ? 'Tie' : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Pros: {c.a.name}</H2>
      <UL items={c.prosA} />

      <H2>Pros: {c.b.name}</H2>
      <UL items={c.prosB} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, margin: '18px 0 8px' }}>
        <div style={bestForCard}>
          <div style={bestForLabel}>{c.a.name} is best for</div>
          <P>{c.bestForA}</P>
        </div>
        <div style={bestForCard}>
          <div style={bestForLabel}>{c.b.name} is best for</div>
          <P>{c.bestForB}</P>
        </div>
      </div>

      {/* Sponsored placement if the winner is our affiliate partner */}
      {c.ourPick === 'a' && c.a.slug === 'secret-desires' && (
        <div style={{ margin: '24px 0 8px' }}>
          <SecretDesiresCTA
            variant="comparisonCTA"
            note={`Our pick between ${c.a.name} and ${c.b.name}. Sponsored — see disclosure.`}
          />
        </div>
      )}

      <H2>FAQ</H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 20px' }}>
        {c.faqs.map((f) => (
          <details key={f.q} style={faqStyle}>
            <summary style={{ fontWeight: 700, cursor: 'pointer', fontSize: 15.5, color: '#2b0f1d' }}>{f.q}</summary>
            <p style={{ margin: '8px 0 0', fontSize: 15, color: '#4a3040', lineHeight: 1.65 }}>{f.a}</p>
          </details>
        ))}
      </div>

      <H2>Related</H2>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {c.a.slug && <Link href={`/reviews/${c.a.slug}/`} style={pill}>{c.a.name} review</Link>}
        {c.b.slug && <Link href={`/reviews/${c.b.slug}/`} style={pill}>{c.b.name} review</Link>}
        <Link href="/comparisons/" style={pill}>All comparisons</Link>
        <Link href="/methodology/" style={pill}>Methodology</Link>
      </div>

      {c.lastUpdated && (
        <div style={{ fontSize: 12.5, color: '#8a6274', marginBottom: 20 }}>
          Last updated: {c.lastUpdated}
        </div>
      )}

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const tableWrap: React.CSSProperties = {
  border: '1px solid #f6d3e1', borderRadius: 14,
  overflow: 'auto', margin: '10px 0 24px', background: '#fff',
}
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }
const th: React.CSSProperties = {
  textAlign: 'left', padding: '12px 14px',
  fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#a61e4d',
}
const td: React.CSSProperties = { padding: '12px 14px', color: '#331523', verticalAlign: 'top' }
const bestForCard: React.CSSProperties = {
  padding: '16px 18px', background: '#fff',
  border: '1px solid #f6d3e1', borderRadius: 12,
}
const bestForLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 800,
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: '#a61e4d', marginBottom: 6,
}
const faqStyle: React.CSSProperties = {
  background: '#fff', border: '1px solid #f6d3e1',
  borderRadius: 12, padding: '14px 16px',
}
const pill: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 999,
  background: '#fff', border: '1px solid #f0a3c2',
  color: '#a61e4d', fontSize: 13, fontWeight: 700, textDecoration: 'none',
}
