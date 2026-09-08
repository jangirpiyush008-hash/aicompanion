import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import { characters, characterCover } from '@/lib/characters'
import { REVIEWS } from '@/lib/reviews'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Page not found — AI Companions Labs'
const DESC = 'That page does not exist. Try browsing our characters, reviews or best-of guides.'

export const metadata: Metadata = pageMetadata({
  title: TITLE, description: DESC, path: '/404', noindex: true,
})

export default function NotFound() {
  const popularChars = characters.slice(0, 4)
  const publishedReviews = REVIEWS.filter((r) => r.status === 'published').slice(0, 4)

  return (
    <>
      <FloatingBackground density={8} />
      <Nav />

      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '64px 40px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{
          fontSize: 12, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#d6336c', marginBottom: 10,
        }}>
          404 · Page not found
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(36px, 5vw, 58px)',
          margin: '0 0 14px', fontWeight: 700, color: '#2b0f1d',
          lineHeight: 1.05, textWrap: 'balance',
        }}>
          That page isn&apos;t here.
        </h1>
        <p style={{ fontSize: 17, color: '#6f4a5d', margin: '0 auto 28px', maxWidth: '58ch', lineHeight: 1.65 }}>
          It may have moved or never existed. Try one of the destinations below — or use
          site search to find what you&apos;re after.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
          <Link href="/" style={primaryPill}>Home</Link>
          <Link href="/characters/" style={outlinePill}>Characters</Link>
          <Link href="/reviews/" style={outlinePill}>Reviews</Link>
          <Link href="/best-ai-girlfriends/" style={outlinePill}>Best AI Girlfriends</Link>
          <Link href="/search/" style={outlinePill}>Search</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '30px 40px 0' }}>
        <h2 style={sectionH2}>Popular characters</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
          gap: 14, margin: '10px 0 32px',
        }}>
          {popularChars.map((c) => (
            <Link key={c.slug} href={`/characters/${c.slug}/`} style={cardStyle}>
              <Image
                src={characterCover(c)}
                alt={c.gallery[0]?.alt || `${c.name} — AI companion character portrait`}
                width={400} height={533}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top,rgba(43,15,29,0.82),rgba(43,15,29,0.1) 55%,transparent 75%)',
              }} />
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 0, padding: 12,
                color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700,
              }}>
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 40px 60px' }}>
        <h2 style={sectionH2}>Reviews</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
          gap: 12, margin: '10px 0 8px',
        }}>
          {publishedReviews.map((r) => (
            <Link key={r.slug} href={`/reviews/${r.slug}/`} style={reviewCard}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>{r.name}</span>
                {r.overall != null && <span style={reviewPill}>{r.overall}/10</span>}
              </div>
              <span style={{ fontSize: 13, color: '#8a6274' }}>{r.tagline}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer variant="compact" />
    </>
  )
}

const primaryPill: React.CSSProperties = {
  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
  color: '#fff', borderRadius: 999,
  padding: '12px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none',
}
const outlinePill: React.CSSProperties = {
  color: '#a61e4d',
  border: '1.5px solid #f0a3c2', borderRadius: 999,
  padding: '12px 24px', fontSize: 14, fontWeight: 700,
  background: '#fff', textDecoration: 'none',
}
const sectionH2: React.CSSProperties = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 24, margin: '0 0 4px', fontWeight: 700, color: '#2b0f1d', textAlign: 'left',
}
const cardStyle: React.CSSProperties = {
  position: 'relative', display: 'block',
  borderRadius: 14, overflow: 'hidden',
  border: '2px solid #fff',
  boxShadow: '0 6px 20px rgba(120,30,70,0.14)',
  color: '#fff', textDecoration: 'none',
}
const reviewCard: React.CSSProperties = {
  padding: '14px 16px',
  background: '#fff', border: '1px solid #f6d3e1', borderRadius: 12,
  color: '#331523', textDecoration: 'none',
  display: 'flex', flexDirection: 'column', gap: 4,
}
const reviewPill: React.CSSProperties = {
  fontSize: 10.5, fontWeight: 800,
  padding: '2px 8px', borderRadius: 999,
  background: '#fde8f0', color: '#a61e4d',
}
