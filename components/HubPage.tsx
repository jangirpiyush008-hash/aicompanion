import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import PageLayout, { H1, Lede, H2, P } from './PageLayout'
import SecretDesiresCTA from './SecretDesiresCTA'
import { characters, characterCover, type Character } from '@/lib/characters'
import { REVIEWS } from '@/lib/reviews'
import { articleLd, faqLd } from '@/lib/seo'

// Reusable hub page: /ai-girlfriends, /ai-boyfriends, etc. Handles the same
// structural sections — Quick Answer, editorial intro, character grid,
// related reviews, FAQ, bottom CTA — while letting each page inject its own
// copy.
export default function HubPage({
  path,
  title,
  metaTitle,
  metaDescription,
  quickAnswer,
  intro,
  charFilter,
  reviewSlugs,
  faqs,
  bottomCtaLabel,
  extraSection,
}: {
  path: string
  title: string
  metaTitle: string
  metaDescription: string
  quickAnswer: string
  intro: ReactNode
  charFilter?: (c: Character) => boolean
  reviewSlugs?: string[]
  faqs?: { q: string; a: string }[]
  bottomCtaLabel?: string
  extraSection?: ReactNode
}) {
  const shown = charFilter ? characters.filter(charFilter) : characters
  const chars = shown.length > 0 ? shown : characters

  const reviewsShown = (reviewSlugs ?? ['secret-desires'])
    .map((s) => REVIEWS.find((r) => r.slug === s))
    .filter((r): r is NonNullable<typeof r> => !!r)

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

      {extraSection}

      <H2>Featured characters</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 16, margin: '10px 0 32px',
      }}>
        {chars.slice(0, 12).map((c) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}/`}
            style={{
              position: 'relative', display: 'block',
              borderRadius: 16, overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
              color: '#fff', textDecoration: 'none',
            }}
          >
            <Image
              src={characterCover(c)}
              alt={c.gallery[0]?.alt || `${c.name} AI companion character portrait`}
              width={500} height={666}
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top,rgba(43,15,29,0.85),rgba(43,15,29,0.15) 42%,transparent 62%)',
            }}/>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffa8c9' }}>Meet {c.name} →</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginBottom: 32 }}>
        <Link href="/characters/" style={{ fontSize: 14, fontWeight: 700, color: '#c2185b' }}>
          Browse all characters →
        </Link>
      </div>

      <H2>Related reviews</H2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
        gap: 12, margin: '10px 0 26px',
      }}>
        {reviewsShown.map((r) => (
          <Link
            key={r.slug}
            href={`/reviews/${r.slug}/`}
            style={{
              padding: '16px 18px',
              background: '#fff', border: '1px solid #f6d3e1', borderRadius: 12,
              color: '#331523', textDecoration: 'none',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>
              {r.name}
              {r.overall != null && <span style={{ fontSize: 13, color: '#a61e4d', marginLeft: 8 }}>{r.overall}/10</span>}
            </span>
            <span style={{ fontSize: 13, color: '#8a6274' }}>{r.tagline}</span>
          </Link>
        ))}
      </div>

      {faqs?.length ? (
        <>
          <H2>FAQ</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0 24px' }}>
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
        Last updated: 2026-09-01 · <Link href="/methodology/" style={{ color: '#c2185b', fontWeight: 700 }}>Methodology</Link>
      </div>

      <SecretDesiresCTA variant="bottom" label={bottomCtaLabel} />
    </PageLayout>
  )
}

// Re-exports for pages that want their own body copy inline.
export { P, H2 }
