import Link from 'next/link'
import { NAV, SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

/**
 * Sticky top nav. Logo returns to /. Nav links are page-relative anchors on
 * the homepage sections. "Try Secret Desires" pill always visible.
 */
export default function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        padding: '16px 40px',
        background: 'rgba(255,251,253,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #f6d3e1',
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 21,
          fontWeight: 700,
          color: '#331523',
          letterSpacing: '0.01em',
          textDecoration: 'none',
        }}
      >
        AI Companions <span style={{ color: '#d6336c' }}>Labs</span>
      </Link>

      <div
        style={{
          display: 'flex',
          gap: 22,
          fontSize: 14,
          fontWeight: 600,
          flex: 1,
          flexWrap: 'wrap',
        }}
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            style={{ color: '#7c5568', textDecoration: 'none' }}
          >
            {n.label}
          </Link>
        ))}
      </div>

      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: '#c2255c',
          border: '1px solid #f0a3c2',
          borderRadius: 6,
          padding: '3px 8px',
          background: '#fde8f0',
        }}
      >
        18+
      </span>

      <a
        href={SECRET_DESIRES_AFFILIATE_URL}
        rel="sponsored noopener nofollow"
        target="_blank"
        style={{
          background: 'linear-gradient(135deg,#f0417e,#ad1457)',
          color: '#fff',
          borderRadius: 999,
          padding: '10px 22px',
          fontSize: 14,
          fontWeight: 700,
          boxShadow: '0 2px 16px rgba(214,51,108,0.3)',
          textDecoration: 'none',
        }}
      >
        Try Secret Desires      </a>
    </nav>
  )
}
