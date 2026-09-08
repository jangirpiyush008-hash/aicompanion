import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2 } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'
import { COMPARISONS } from '@/lib/comparisons'

const PATH = '/comparisons'
const TITLE = 'AI Companion Comparisons — Head-to-Head Reviews'
const DESC = 'Head-to-head comparisons of AI companion platforms. Features, pricing, image quality, memory and verdict — all in one table.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function ComparisonsIndexPage() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Comparisons', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companion Comparisons</H1>
      <Lede>
        Direct head-to-heads between the AI companion platforms people actually compare. Every
        comparison uses our published methodology and calls a winner per category.
      </Lede>

      <H2>Published comparisons</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
        gap: 14, margin: '10px 0 32px',
      }}>
        {COMPARISONS.map((c) => (
          <Link
            key={c.slug}
            href={`/comparisons/${c.slug}/`}
            style={{
              padding: '18px 20px',
              background: '#fff',
              border: '1px solid #f6d3e1',
              borderRadius: 14,
              textDecoration: 'none',
              color: '#331523',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d' }}>
              {c.a.name} vs {c.b.name}
            </div>
            <p style={{ fontSize: 14, color: '#6f4a5d', margin: 0, lineHeight: 1.55 }}>
              {c.quickVerdict.slice(0, 140)}…
            </p>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#c2185b' }}>Read comparison</span>
          </Link>
        ))}
      </div>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}
