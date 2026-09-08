import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageLayout, { H1, Lede, H2, P, UL, Callout } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd, reviewLd, faqLd } from '@/lib/seo'
import { REVIEWS, getReview, METHODOLOGY_WEIGHTS } from '@/lib/reviews'

export function generateStaticParams() {
  return REVIEWS.map((r) => ({ slug: r.slug }))
}
export const dynamicParams = false

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const r = getReview(slug)
  if (!r) return { title: 'Review not found' }
  const path = `/reviews/${r.slug}`
  const isPub = r.status === 'published'
  const title = isPub
    ? `${r.name} Review 2026 — Hands-On AI Companion App Testing & Verdict`
    : `${r.name} AI Companion Review — Coming Soon 2026`
  const desc = isPub
    ? `${r.name} review 2026: full hands-on test of the AI companion platform. Features, pricing, image quality, AI sexting, memory, voice, video, verdict. Scored on our 9-category methodology.`
    : `${r.name} AI companion review coming soon. This page tracks features, pricing and how ${r.name} compares to the best AI girlfriend and AI companion platforms we have tested.`
  return pageMetadata({ title, description: desc, path, type: 'article' })
}

export default async function ReviewPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const r = getReview(slug)
  if (!r) notFound()

  const path = `/reviews/${r.slug}`
  const isPub = r.status === 'published'
  const title = isPub
    ? `${r.name} Review 2026`
    : `${r.name}`
  const desc = isPub
    ? `A full hands-on review of ${r.name}, scored on our 9-category methodology.`
    : `We have not yet independently tested ${r.name}.`

  const lds: unknown[] = [
    articleLd({ headline: title, description: desc, path, datePublished: r.publishedDate, dateModified: r.lastUpdated }),
  ]
  if (isPub) {
    lds.push(reviewLd({
      itemName: r.name,
      itemUrl: r.externalUrl,
      reviewBody: r.verdict ?? desc,
      ratingValue: r.overall,
      bestRating: 10,
      datePublished: r.publishedDate,
    }))
  }
  if (r.faqs?.length) lds.push(faqLd(r.faqs))

  return (
    <PageLayout
      wide
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Reviews', path: '/reviews' },
        { name: r.name, path },
      ]}
      jsonLd={lds}
    >
      {/* Affiliate disclosure banner — top of every affiliated review. Secret
          Desires gets an extra sentence disclosing the operational relationship
          (site owner has an ongoing business tie beyond a standard affiliate
          link), which QRG treats as a trust signal for review integrity. */}
      {r.affiliate && (
        <div style={disclosureBanner}>
          <strong>Disclosure:</strong> This review contains affiliate links. We may earn a
          commission if you sign up through them, at no extra cost to you.
          {r.slug === 'secret-desires' && (
            <> The site owner also has an ongoing business relationship with Secret
            Desires beyond a standard affiliate link — this may bias our editorial
            framing even though scores follow our published{' '}
            <Link href="/methodology/" style={{ color: '#fff', fontWeight: 700 }}>methodology</Link>.</>
          )}{' '}
          See our{' '}
          <Link href="/affiliate-disclosure/" style={{ color: '#fff', fontWeight: 700 }}>affiliate disclosure</Link>.
        </div>
      )}

      <H1>{title}</H1>
      <Lede>{r.tagline}</Lede>

      {/* Verdict + rating strip */}
      <div style={verdictStrip}>
        {isPub && r.overall != null ? (
          <>
            <div>
              <div style={ratingLabel}>Overall</div>
              <div style={ratingValue}>{r.overall} <span style={{ fontSize: 15, color: '#8a6274', fontWeight: 500 }}>/ 10</span></div>
            </div>
            <div style={{ maxWidth: 520 }}>
              <div style={ratingLabel}>Quick verdict</div>
              <P>{r.verdict}</P>
            </div>
          </>
        ) : (
          <div>
            <div style={ratingLabel}>Status</div>
            <div style={{ ...ratingValue, fontSize: 24, color: '#a61e4d' }}>Not yet independently tested</div>
            <P>
              {r.name} is on our testing queue. We do not publish scores for platforms we have not
              hands-on tested — see our <Link href="/methodology/" style={{ color: '#c2185b', fontWeight: 700 }}>methodology</Link> for what &quot;tested&quot; means here.
            </P>
          </div>
        )}
      </div>

      {isPub && (
        <>
          {/* Per-category score table */}
          <H2>Score breakdown</H2>
          <div style={scoreTableWrap}>
            <table style={scoreTable}>
              <thead>
                <tr style={{ background: '#fde8f0' }}>
                  <th style={thStyle}>Category</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Weight</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {METHODOLOGY_WEIGHTS.map((w) => {
                  const v = r.score?.[w.key]
                  return (
                    <tr key={w.key} style={{ borderTop: '1px solid #f6d3e1' }}>
                      <td style={tdStyle}>{w.label}</td>
                      <td style={{ ...tdStyle, textAlign: 'right', color: '#8a6274' }}>{w.weight}%</td>
                      <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700 }}>{v != null ? `${v}/10` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {r.keyFeatures?.length ? (
            <>
              <H2>Key features</H2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, margin: '10px 0 20px' }}>
                {r.keyFeatures.map((f) => (
                  <div key={f.title} style={featureCard}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>{f.title}</div>
                    <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.6 }}>{f.text}</div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          <H2>Pros and cons</H2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14, margin: '10px 0 20px' }}>
            <div style={{ ...featureCard, borderColor: '#c3f2c7', background: '#effcf1' }}>
              <div style={{ fontWeight: 800, color: '#0b6e30', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Pros</div>
              <UL items={r.pros ?? []} />
            </div>
            <div style={{ ...featureCard, borderColor: '#f6d3d3', background: '#fdf1f1' }}>
              <div style={{ fontWeight: 800, color: '#a91e1e', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Cons</div>
              <UL items={r.cons ?? []} />
            </div>
          </div>

          {r.bestFor && (
            <Callout title="Best for">
              {r.bestFor}
            </Callout>
          )}
          {r.considerAlternativeIf && (
            <Callout title="Consider alternatives if">
              {r.considerAlternativeIf}
            </Callout>
          )}

          <H2>How we tested {r.name}</H2>
          <P>
            {r.name} was tested against our{' '}
            <Link href="/methodology/" style={{ color: '#c2185b', fontWeight: 700 }}>9-category methodology</Link>.
            Every score above comes from actual usage, not scraped marketing copy. If you spot
            something out of date, tell us on the <Link href="/corrections/" style={{ color: '#c2185b', fontWeight: 700 }}>corrections page</Link>.
          </P>

          {r.faqs?.length ? (
            <>
              <H2>FAQ</H2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 20px' }}>
                {r.faqs.map((f) => (
                  <details key={f.q} style={faqStyle}>
                    <summary style={{ fontWeight: 700, cursor: 'pointer', fontSize: 15.5, color: '#2b0f1d' }}>{f.q}</summary>
                    <p style={{ margin: '8px 0 0', fontSize: 15, color: '#4a3040', lineHeight: 1.65 }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </>
          ) : null}
        </>
      )}

      <H2>Alternatives</H2>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {REVIEWS.filter((x) => x.slug !== r.slug).slice(0, 6).map((x) => (
          <Link key={x.slug} href={`/reviews/${x.slug}/`} style={pill}>{x.name}</Link>
        ))}
        <Link href="/comparisons/" style={pill}>All comparisons</Link>
      </div>

      {r.lastUpdated && (
        <div style={{ fontSize: 12.5, color: '#8a6274', marginBottom: 20 }}>
          Last updated: {r.lastUpdated}
        </div>
      )}

      <SecretDesiresCTA
        variant="bottom"
        label={r.slug === 'secret-desires' ? 'Ready to try Secret Desires?' : 'Not sure? Try our top pick.'}
        note="Secret Desires is our current Editor's Pick — the strongest all-round AI companion platform we've tested in 2026."
      />
    </PageLayout>
  )
}

const disclosureBanner: React.CSSProperties = {
  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
  color: '#fff', borderRadius: 12,
  padding: '10px 16px', fontSize: 13.5, lineHeight: 1.5,
  marginBottom: 18,
}
const verdictStrip: React.CSSProperties = {
  display: 'flex', gap: 32, flexWrap: 'wrap',
  background: '#fff', border: '1.5px solid #f2b8cf',
  borderRadius: 16, padding: '22px 24px', margin: '14px 0 28px',
  boxShadow: '0 8px 30px rgba(214,51,108,0.10)',
}
const ratingLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 800,
  letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a61e4d',
  marginBottom: 6,
}
const ratingValue: React.CSSProperties = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 44, fontWeight: 700, color: '#2b0f1d', lineHeight: 1,
}
const scoreTableWrap: React.CSSProperties = {
  border: '1px solid #f6d3e1', borderRadius: 14, overflow: 'hidden',
  margin: '10px 0 24px', background: '#fff',
}
const scoreTable: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 15 }
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 16px',
  fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#a61e4d',
}
const tdStyle: React.CSSProperties = { padding: '12px 16px', color: '#331523' }
const featureCard: React.CSSProperties = {
  padding: '16px 18px', background: '#fff',
  border: '1px solid #f6d3e1', borderRadius: 12,
  display: 'flex', flexDirection: 'column', gap: 6,
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
