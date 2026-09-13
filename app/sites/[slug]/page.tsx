import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITES, getSite, getCat, sitesInCategory, initials, logo, BADGES, outboundRel, VERIFIED } from '../../../lib/sites'
import { DirectoryHeader, DirectoryFooter } from '../../../components/v2/DirectoryChrome'
import { AgeGate } from '../../../components/v2/AgeGate'

export const dynamicParams = false

export function generateStaticParams() {
  return SITES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSite(slug)
  if (!s) return { title: 'Not found' }
  return {
    title: `${s.name} · Review, Pricing, Verdict · AI Adult Directory`,
    description: `${s.name}, ${s.tag}. Rated ${s.rating.toFixed(1)}/10 by AI Adult Directory. Features, pricing and coupons.`,
    other: { rating: 'adult', 'RATING': 'RTA-5042-1996-1400-1577-RTA' },
  }
}

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSite(slug)
  if (!s) notFound()
  const cat = getCat(s.cats[0])!
  const accent = cat.color
  const price = s.price || {}
  const related = sitesInCategory(s.cats[0]).filter(x => x.slug !== s.slug).slice(0, 4)
  const rel = outboundRel(s)

  return (
    <>
      <DirectoryHeader />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '28px 32px 56px' }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--text-subtle)' }}>Home</Link> · <Link href={`/category/${cat.slug}`} style={{ color: 'var(--text-subtle)' }}>{cat.name}</Link> · <span style={{ color: 'var(--text)' }}>{s.name}</span>
        </div>

        <section style={{ background: 'var(--surface)', border: `1px solid ${s.pinned ? 'var(--border-glow)' : 'var(--border-mid)'}`, borderRadius: 14, boxShadow: 'var(--shadow-card)', padding: '28px 32px', marginTop: 16, display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <span style={{ width: 72, height: 72, borderRadius: 14, background: 'var(--surface-hover)', color: accent, fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
            {initials(s.name)}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo(s.domain)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </span>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 32, margin: 0 }}>{s.name}</h1>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {s.pinned && (
                <span style={{ background: BADGES.pick.bg, color: BADGES.pick.fg, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 9px', borderRadius: 6 }}>★ Editor's Pick</span>
              )}
              {s.cats.map(cs => {
                const c = getCat(cs)!
                return (
                  <Link key={cs} href={`/category/${cs}`} style={{ border: '1px solid var(--border-mid)', background: 'var(--surface-hover)', color: c.color, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                    {c.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: 24, fontVariantNumeric: 'tabular-nums' }}>
              {s.rating.toFixed(1)}
              <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 600 }}>/10</span>
            </div>
            <a
              href={s.outbound}
              target="_blank"
              rel={rel}
              style={{ display: 'inline-block', marginTop: 10, background: 'linear-gradient(135deg, #ff922b, #d9480f)', color: 'var(--bg)', fontWeight: 700, fontSize: 14, padding: '14px 28px', borderRadius: 999, boxShadow: '0 8px 24px rgba(232,89,12,.16)' }}
            >
              Visit {s.name}
            </a>
          </div>
        </section>

        <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: '28px 0 0' }}>
          {s.desc || `${s.name}, ${s.tag}. A full editorial description with hands-on testing notes is pending for this listing; features and pricing below reflect what we could confirm from the platform's own site. Anything we could not confirm is marked unknown rather than guessed.`}
        </p>

        {s.feats && s.feats.length > 0 && (
          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontWeight: 700, fontSize: 24, margin: '0 0 12px' }}>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
              {s.feats.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '12px 14px', fontSize: 14, fontWeight: 500 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,122,46,.2)', color: 'var(--accent-2)', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontWeight: 700, fontSize: 24, margin: '0 0 12px' }}>Pricing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
            {[
              { label: 'Free tier',     val: price.free || 'Unknown' },
              { label: 'Starting paid', val: price.paid && price.paid !== 'unknown' ? `$${price.paid}/mo` : 'Unknown' },
              { label: 'Lifetime plan', val: price.life && price.life !== 'unknown' ? price.life : 'Unknown' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-subtle)' }}>{p.label}</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 4 }}>{p.val}</div>
              </div>
            ))}
          </div>
          {price.code && (
            <div style={{ marginTop: 12, background: 'var(--surface)', border: '1px solid var(--border-glow)', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--accent)' }}>{price.save}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>Applies to new subscriptions only, where applicable.</div>
              </div>
              <code style={{ fontFamily: 'ui-monospace, monospace', fontSize: 15, fontWeight: 700, background: 'var(--surface-hover)', border: '1px dashed var(--border-strong)', borderRadius: 8, padding: '8px 14px' }}>{price.code}</code>
            </div>
          )}
        </section>

        <p style={{ fontSize: 11.5, color: 'var(--text-subtle)', fontWeight: 500, margin: '20px 0 0' }}>
          Verified {VERIFIED} · Source: <a href={`https://${s.domain}`} target="_blank" rel="noopener nofollow">{s.domain}</a>
        </p>

        {related.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontWeight: 700, fontSize: 24, margin: '0 0 12px' }}>Related in {cat.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10 }}>
              {related.map(r => (
                <a key={r.slug} href={`/sites/${r.slug}`} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 14, padding: 16, color: 'var(--text)' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface-hover)', color: accent, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {initials(r.name)}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo(r.domain)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </span>
                  <div style={{ fontWeight: 700, fontSize: 14, marginTop: 10 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{r.rating.toFixed(1)}/10</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {!s.pinned && (
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href="/sites/secret-desires" style={{ display: 'inline-block', border: '1px solid var(--border-strong)', background: 'rgba(232,89,12,.08)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 999 }}>
              Not sure? Try our Editor's Pick, Secret Desires
            </Link>
          </div>
        )}
      </main>

      <DirectoryFooter />
      <AgeGate />
    </>
  )
}
