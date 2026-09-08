import Link from 'next/link'
import { breadcrumbLd, type Crumb } from '@/lib/seo'

// Reusable breadcrumb trail + BreadcrumbList JSON-LD. Always pass the full
// trail including the current page (last item renders plain, not linked).
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '20px 40px 0',
          fontSize: 13,
          color: '#a3818f',
        }}
      >
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <span key={c.path + i}>
              {last ? (
                <span style={{ color: '#331523', fontWeight: 600 }}>{c.name}</span>
              ) : (
                <Link href={c.path} style={{ color: '#8a6274', textDecoration: 'none' }}>
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden="true"> / </span>}
            </span>
          )
        })}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(items)) }}
      />
    </>
  )
}
