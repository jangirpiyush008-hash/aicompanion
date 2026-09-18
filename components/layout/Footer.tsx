import Link from 'next/link'

/**
 * Two variants: `full` = homepage 4-column footer, `compact` = character page.
 */
export default function Footer({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <footer
        style={{
          position: 'relative',
          background: '#2b0f1d',
          color: '#c99cb2',
          padding: '28px 40px',
          textAlign: 'center',
          fontSize: 12.5,
        }}
      >
        <Link href="/" style={{ color: '#f783ac', fontWeight: 700, textDecoration: 'none' }}>
          ← Back to AI Companions Labs
        </Link>
        <div style={{ marginTop: 10 }}>
          © 2026 aicompanionslabs.com — 18+ only · All imagery is AI-generated. No real
          persons depicted.
        </div>
      </footer>
    )
  }

  return (
    <footer
      style={{
        position: 'relative',
        background: '#2b0f1d',
        color: '#e8cfdb',
        padding: '56px 40px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(220px,1.4fr) repeat(auto-fit,minmax(150px,1fr))',
          gap: 36,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>
            AI Companions <span style={{ color: '#f783ac' }}>Labs</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#c99cb2', margin: 0, maxWidth: '36ch' }}>
            An 18+ AI companion discovery platform. Original characters, honest reviews,
            transparent comparisons.
          </p>
          <div style={{ fontSize: 11, color: '#a3748d' }}>
            Some links may be affiliate links. All characters are fictional, AI-generated
            adults.
          </div>
        </div>

        <FooterCol title="Explore">
          <FL href="/ai-girlfriends/">AI Girlfriends</FL>
          <FL href="/ai-boyfriends/">AI Boyfriends</FL>
          <FL href="/characters/">Characters</FL>
          <FL href="/best-ai-girlfriends/">Best AI Girlfriends</FL>
        </FooterCol>

        <FooterCol title="Reviews">
          <FL href="/reviews/secret-desires/">Secret Desires</FL>
          <FL href="/comparisons/">Comparisons</FL>
          <FL href="/methodology/">Methodology</FL>
          <FL href="/reviews/">All Reviews</FL>
        </FooterCol>

        <FooterCol title="Company">
          <FL href="/about/">About</FL>
          <FL href="/editorial-policy/">Editorial Policy</FL>
          <FL href="/affiliate-disclosure/">Affiliate Disclosure</FL>
          <FL href="/contact/">Contact</FL>
          <FL href="/privacy/">Privacy</FL>
          <FL href="/terms/">Terms</FL>
          <FL href="/18-plus/">18+ Notice</FL>
          <FL href="/corrections/">Corrections</FL>
        </FooterCol>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '36px auto 0',
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          fontSize: 12,
          color: '#a3748d',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span>© 2026 aicompanionslabs.com — 18+ only</span>
        <span>All imagery is AI-generated. No real persons depicted.</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13.5 }}>
      <div style={{ fontWeight: 800, color: '#fff', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
        {title}
      </div>
      {children}
    </div>
  )
}
function FL({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ color: '#e8cfdb', textDecoration: 'none' }}>
      {children}
    </Link>
  )
}
