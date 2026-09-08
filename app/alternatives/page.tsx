import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2 } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'
import { ALTERNATIVES } from '@/lib/alternatives'

const PATH = '/alternatives'
const TITLE = 'AI Companion Alternatives — Real Substitutes, Not Just Our Pick'
const DESC = 'Looking for an alternative to a specific AI companion platform? These pages list genuine alternatives with reasons — not just our top pick every time.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AlternativesIndexPage() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Alternatives', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Alternatives</H1>
      <Lede>
        Pick the platform you&apos;re thinking of leaving — we&apos;ll show you the real alternatives
        with reasons. Not just Secret Desires every time.
      </Lede>

      <H2>Browse alternatives</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
        gap: 12, margin: '10px 0 32px',
      }}>
        {ALTERNATIVES.map((a) => (
          <Link
            key={a.slug}
            href={`/alternatives/${a.slug}/`}
            style={{
              padding: '16px 18px',
              background: '#fff', border: '1px solid #f6d3e1', borderRadius: 12,
              color: '#331523', textDecoration: 'none',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>
              {a.targetName} alternatives
            </span>
            <span style={{ fontSize: 13, color: '#8a6274' }}>{a.entries.length} genuine picks →</span>
          </Link>
        ))}
      </div>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}
