import Link from 'next/link'
import type { Metadata } from 'next'
import { CATS, sitesInCategory, initials, logo, BADGES, SITES, outboundRel, type Site } from '../lib/sites'
import { DirectoryHeader, DirectoryFooter } from '../components/v2/DirectoryChrome'
import { AgeGate } from '../components/v2/AgeGate'
import { TalkingMascot } from '../components/v2/TalkingMascot'

export const metadata: Metadata = {
  title: 'AI Adult Directory · Every AI adult site, ranked',
  description: '60+ AI girlfriend, sexting, image and video sites in 12 categories. Hands-on ratings, verified weekly. Skip the reviews, pick fast. 18+.',
  robots: { index: true, follow: true },
  other: { rating: 'adult', 'RATING': 'RTA-5042-1996-1400-1577-RTA' },
}

const SITES_PER_SECTION = 8

function SiteRow({ site, rank, catColor }: { site: Site; rank: number; catColor: string }) {
  const rel = outboundRel(site)
  const badge = site.badge && site.badge !== 'pick' ? BADGES[site.badge] : null
  return (
    <a
      href={`/sites/${site.slug}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, minHeight: 32, padding: '4px 8px', borderRadius: 8, color: 'var(--text)',
        background: site.pinned ? 'rgba(255,122,46,.12)' : 'transparent',
        borderLeft: `3px solid ${site.pinned ? 'var(--border-glow)' : 'transparent'}`,
        animation: site.pinned ? 'sdai-pulse 2s ease-in-out infinite alternate' : 'none',
      }}
      data-rel={rel}
    >
      <span style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12.5, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>
        {String(rank).padStart(2, '0')}.
      </span>
      <span style={{ position: 'relative', width: 24, height: 24, borderRadius: 6, background: 'var(--surface-hover)', color: catColor, fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {initials(site.name)}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo(site.domain)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </span>
      <span style={{ flex: 1, fontWeight: 600, fontSize: 13.5, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {site.name}
      </span>
      {site.pinned && (
        <span style={{ background: BADGES.pick.bg, color: BADGES.pick.fg, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>
          ★ Pick
        </span>
      )}
      {badge && (
        <span style={{ background: badge.bg, color: badge.fg, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>
          {badge.label}
        </span>
      )}
      <span style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 11.5, fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
        ★ {(site.rating / 2).toFixed(1)}
      </span>
    </a>
  )
}

export default function HomePage() {
  const trending = [SITES.find(s => s.pinned)!, ...SITES.filter(s => !s.pinned).sort((a, b) => b.rating - a.rating).slice(0, 5)]

  return (
    <>
      <style>{`
        @keyframes sdai-pulse {
          from { box-shadow: 0 0 20px rgba(255,122,46,.12); }
          to   { box-shadow: 0 0 28px rgba(255,122,46,.35); }
        }
      `}</style>
      <DirectoryHeader />

      <section style={{ padding: '28px 28px 20px', maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 240px)', gap: 24, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
            Every AI adult site, <span style={{ color: 'var(--accent)' }}>ranked</span>.
          </h1>
          <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: '8px 0 16px', maxWidth: '62ch', lineHeight: 1.55 }}>
            60+ AI girlfriend, sexting, image and video sites, 12 categories, hands-on ratings, verified weekly. Skip the reviews, pick fast.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/category/ai-girlfriends" style={{ background: 'var(--accent)', color: 'var(--bg)', fontWeight: 800, fontSize: 13, padding: '11px 22px', borderRadius: 999, letterSpacing: '.01em' }}>Browse AI Girlfriends</Link>
            <Link href="/sites/secret-desires" style={{ background: 'transparent', color: 'var(--accent-2)', border: '1px solid var(--border-glow)', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 999 }}>★ Meet our Editor's Pick</Link>
          </div>
        </div>
        <TalkingMascot alt="AI Adult Directory anime mascot, purple and orange hair, cyberpunk aesthetic" />
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 900px) {
            section.acl-hero { grid-template-columns: 1fr !important; }
            .hero-portrait { max-height: 320px !important; justify-self: center !important; }
          }
        ` }} />
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' }}>Trending now</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
          {trending.map(t => (
            <a
              key={t.slug}
              href={`/sites/${t.slug}`}
              style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px 10px 10px', color: 'var(--text)' }}
            >
              <span style={{ position: 'relative', width: 34, height: 34, borderRadius: 8, background: 'var(--surface-hover)', color: 'var(--accent)', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                {initials(t.name)}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo(t.domain)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{t.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>★ {(t.rating / 2).toFixed(1)}</span> · in {CATS.find(c => c.slug === t.cats[0])?.name.replace('AI ', '')}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 28px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14, alignItems: 'start' }}>
        {CATS.map(cat => {
          const list = sitesInCategory(cat.slug).slice(0, SITES_PER_SECTION)
          return (
            <div key={cat.slug} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 3, background: cat.color }} />
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', margin: 0 }}>
                      {cat.name}
                    </h2>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.45, marginTop: 2 }}>{cat.tag}</div>
                  </div>
                </div>
                <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {list.map((s, i) => <SiteRow key={s.slug} site={s} rank={i + 1} catColor={cat.color} />)}
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12, height: 38, background: cat.color, color: 'var(--bg)', fontWeight: 800, fontSize: 12.5, borderRadius: 9 }}
                >
                  See all {cat.target} sites
                </Link>
              </div>
            </div>
          )
        })}
      </main>

      <DirectoryFooter />
      <AgeGate />
    </>
  )
}
