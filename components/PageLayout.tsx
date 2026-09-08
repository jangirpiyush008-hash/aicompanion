import type { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import FloatingBackground from './FloatingBackground'
import Breadcrumbs from './Breadcrumbs'
import JsonLd from './JsonLd'
import type { Crumb } from '@/lib/seo'

// Standard content page wrapper — nav, breadcrumbs, prose column, footer.
// Use for trust pages, hubs, best-of pages, article-style pages.
export default function PageLayout({
  crumbs,
  jsonLd,
  children,
  wide,
}: {
  crumbs: Crumb[]
  jsonLd?: unknown | unknown[]
  children: ReactNode
  wide?: boolean          // true = 1200px content column, else 820px
}) {
  const width = wide ? 1200 : 820
  const lds = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []
  return (
    <>
      <FloatingBackground density={10} />
      <Nav />
      <Breadcrumbs items={crumbs} />
      <main
        style={{
          position: 'relative',
          maxWidth: width,
          margin: '0 auto',
          padding: '20px 40px 64px',
        }}
      >
        {children}
      </main>
      <Footer variant="compact" />
      {lds.map((d, i) => <JsonLd key={i} data={d} />)}
    </>
  )
}

// Standard heading blocks for prose pages, matched to the site typography.
export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 'clamp(36px,5vw,54px)',
      lineHeight: 1.08,
      margin: '4px 0 16px',
      fontWeight: 700,
      color: '#2b0f1d',
      textWrap: 'balance',
    }}>{children}</h1>
  )
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: 18,
      lineHeight: 1.65,
      color: '#6f4a5d',
      margin: '0 0 26px',
      maxWidth: '58ch',
    }}>{children}</p>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 28,
      margin: '36px 0 12px',
      fontWeight: 700,
      color: '#2b0f1d',
    }}>{children}</h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{
      fontFamily: 'Playfair Display, serif',
      fontSize: 21,
      margin: '24px 0 8px',
      fontWeight: 700,
      color: '#331523',
    }}>{children}</h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: 15.5,
      lineHeight: 1.7,
      color: '#4a3040',
      margin: '0 0 14px',
    }}>{children}</p>
  )
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{
      fontSize: 15.5,
      lineHeight: 1.75,
      color: '#4a3040',
      margin: '4px 0 18px',
      paddingLeft: 22,
    }}>
      {items.map((it, i) => <li key={i} style={{ marginBottom: 4 }}>{it}</li>)}
    </ul>
  )
}

export function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div style={{
      background: 'linear-gradient(160deg, #fde8f0, #fbd0e0)',
      border: '1px solid #f6d3e1',
      borderRadius: 14,
      padding: '18px 22px',
      margin: '18px 0',
    }}>
      {title && (
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c2255c', marginBottom: 6 }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: 15, lineHeight: 1.7, color: '#331523' }}>
        {children}
      </div>
    </div>
  )
}
