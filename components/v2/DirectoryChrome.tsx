import Link from 'next/link'

export function DirectoryHeader() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, height: 60, background: 'rgba(42,24,16,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)', flexShrink: 0 }}>
        <span style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent)', boxShadow: '0 0 12px rgba(255,122,46,.35)', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mascot-face.jpg"
            alt="AI Adult Directory mascot"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>AI Adult Directory</span>
          <span style={{ fontSize: 10, color: 'var(--text-subtle)', fontWeight: 600 }}>18+ · Updated weekly</span>
        </span>
      </Link>
      <form action="/search" style={{ position: 'relative', flex: 1, maxWidth: 520, margin: '0 auto' }}>
        <input
          name="q"
          type="search"
          placeholder="Search 60+ AI sites…"
          style={{ width: '100%', height: 38, border: '1px solid var(--border-mid)', borderRadius: 10, padding: '0 14px', fontSize: 13.5, background: 'var(--surface)', color: 'var(--text)' }}
        />
      </form>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Link href="/deals" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border-mid)', padding: '6px 14px', borderRadius: 999 }}>
          Deals
        </Link>
        <Link href="/blog" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text)', background: 'var(--surface)', border: '1px solid var(--border-mid)', padding: '6px 14px', borderRadius: 999 }}>
          Blog
        </Link>
        <span style={{ background: 'var(--accent)', color: 'var(--bg)', fontSize: 11, fontWeight: 800, padding: '5px 10px', borderRadius: 999 }}>18+</span>
      </div>
    </header>
  )
}

export function DirectoryFooter() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border)', padding: '22px 28px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>AI Adult Directory · 18+ · Not affiliated with the platforms listed</span>
        <span style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12.5 }}>
          <Link href="/methodology" style={{ color: 'var(--text-muted)' }}>Methodology</Link>
          <Link href="/about" style={{ color: 'var(--text-muted)' }}>About</Link>
          <Link href="/affiliate-disclosure" style={{ color: 'var(--text-muted)' }}>Affiliate Disclosure</Link>
          <Link href="/corrections" style={{ color: 'var(--text-muted)' }}>Corrections</Link>
          <Link href="/privacy" style={{ color: 'var(--text-muted)' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'var(--text-muted)' }}>Terms</Link>
          <Link href="/18-plus" style={{ color: 'var(--text-muted)' }}>18+</Link>
          <Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact</Link>
        </span>
      </div>
      <div style={{ maxWidth: 1400, margin: '10px auto 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ border: '1px solid var(--border-strong)', color: 'var(--text-subtle)', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', padding: '3px 8px', borderRadius: 4 }}>RTA</span>
        <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>© {new Date().getFullYear()} AI Adult Directory</span>
      </div>
    </footer>
  )
}
