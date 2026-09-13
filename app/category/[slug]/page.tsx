import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATS, getCat, sitesInCategory, initials, logo, BADGES } from '../../../lib/sites'
import { DirectoryHeader, DirectoryFooter } from '../../../components/v2/DirectoryChrome'
import { AgeGate } from '../../../components/v2/AgeGate'

export const dynamicParams = false

export function generateStaticParams() {
  return CATS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = getCat(slug)
  if (!cat) return { title: 'Not found' }
  return {
    title: `${cat.name} · AI Adult Directory`,
    description: `${cat.name}: ${cat.tag}. Every site ranked by hands-on testing, updated weekly.`,
    other: { rating: 'adult', 'RATING': 'RTA-5042-1996-1400-1577-RTA' },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = getCat(slug)
  if (!cat) notFound()

  const list = sitesInCategory(cat.slug)
  const siblings = CATS.filter(c => c.slug !== cat.slug)

  return (
    <>
      <DirectoryHeader />

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 32px 0' }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--text-subtle)' }}>Home</Link> · <span style={{ color: 'var(--text)' }}>{cat.name}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 44px)', margin: '14px 0 0', display: 'inline-block', borderBottom: `4px solid ${cat.color}`, paddingBottom: 6 }}>
          {cat.name}
        </h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '72ch', margin: '18px 0 0' }}>
          {cat.name}, {cat.tag.toLowerCase()}. We list {list.length} sites in this category, ordered by our overall rating, with Secret Desires pinned at position one per our methodology.
        </p>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: '72ch', margin: '10px 0 0' }}>
          Every listing links to a detail page with features, pricing and a verified-on date. Ratings run 0–10 and reflect hands-on testing of conversation quality, memory, image generation, voice and value for money.
        </p>
      </div>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 32px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map((s, i) => {
          const badge = s.badge && s.badge !== 'pick' ? BADGES[s.badge] : null
          return (
            <a
              key={s.slug}
              href={`/sites/${s.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: s.pinned ? 'rgba(255,122,46,.14)' : 'var(--surface)',
                border: '1px solid var(--border-mid)',
                borderLeft: `4px solid ${s.pinned ? 'var(--border-glow)' : 'transparent'}`,
                borderRadius: 14, padding: '14px 18px', color: 'var(--text)',
                animation: s.pinned ? 'sdai-pulse 2s ease-in-out infinite alternate' : 'none',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums', width: 28 }}>
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-hover)', color: cat.color, fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                {initials(s.name)}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo(s.domain)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</span>
                  {s.pinned && (
                    <span style={{ background: BADGES.pick.bg, color: BADGES.pick.fg, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 8px', borderRadius: 6 }}>★ Editor's Pick</span>
                  )}
                  {badge && (
                    <span style={{ background: badge.bg, color: badge.fg, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4 }}>{badge.label}</span>
                  )}
                </span>
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.tag}</span>
              </span>
              <span style={{ fontWeight: 800, fontSize: 15, fontVariantNumeric: 'tabular-nums', color: s.rating >= 8.5 ? 'var(--accent)' : 'var(--text)' }}>
                {s.rating.toFixed(1)}
                <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 600 }}>/10</span>
              </span>
              <span style={{ background: s.pinned ? 'linear-gradient(135deg, #ff922b, #d9480f)' : cat.color, color: 'var(--bg)', fontWeight: 700, fontSize: 13, padding: '10px 18px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                {s.pinned ? 'Visit Secret Desires' : 'Visit'}
              </span>
            </a>
          )
        })}
      </main>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 32px 0' }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, margin: '0 0 16px' }}>Frequently asked questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { q: `What is the best ${cat.name.toLowerCase()} site in 2026?`, a: `Our Editor's Pick is Secret Desires, rated 9.5/10 for image consistency, memory and character depth. The full ranking above is ordered by overall rating.` },
            { q: 'Are these sites free?', a: 'Some offer meaningful free tiers, look for the Free badge. Most paid tiers unlock more messages, images or voice.' },
            { q: 'How are ratings decided?', a: 'A weighted average across conversation quality, memory, image generation, voice, customization, value and privacy transparency. See our methodology page.' },
            { q: 'How current is this list?', a: 'Every site shows a verified-on date, the last time we manually confirmed pricing, features and that the site is live. Anything over 90 days old is re-checked.' },
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 14, padding: '18px 22px' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{f.q}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', marginTop: 6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 32px 56px' }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, margin: '0 0 16px' }}>More categories</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {siblings.map(c => (
            <Link key={c.slug} href={`/category/${c.slug}`} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c.color, marginRight: 7 }} />
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <DirectoryFooter />
      <AgeGate />
    </>
  )
}
