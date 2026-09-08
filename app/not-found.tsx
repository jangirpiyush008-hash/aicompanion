import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'

export default function NotFound() {
  return (
    <>
      <FloatingBackground density={8} />
      <Nav />
      <section
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '96px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#d6336c',
            marginBottom: 14,
          }}
        >
          Not found
        </div>
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px,5vw,64px)',
            margin: '0 0 14px',
            fontWeight: 700,
            color: '#2b0f1d',
          }}
        >
          This page has slipped away.
        </h1>
        <p style={{ fontSize: 17, color: '#6f4a5d', lineHeight: 1.65, maxWidth: 560, margin: '0 auto 30px' }}>
          The link may be old, or the character may not exist yet. Try the homepage or
          browse the characters below.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              background: 'linear-gradient(135deg,#f0417e,#ad1457)',
              color: '#fff',
              borderRadius: 999,
              padding: '14px 30px',
              fontSize: 15,
              fontWeight: 700,
              boxShadow: '0 8px 28px rgba(214,51,108,0.32)',
              textDecoration: 'none',
            }}
          >
            Back to home
          </Link>
          <Link
            href="/#characters"
            style={{
              color: '#a61e4d',
              border: '1.5px solid #f0a3c2',
              borderRadius: 999,
              padding: '14px 30px',
              fontSize: 15,
              fontWeight: 700,
              background: '#fff',
              textDecoration: 'none',
            }}
          >
            Browse AI Characters
          </Link>
        </div>
      </section>
      <Footer variant="compact" />
    </>
  )
}
