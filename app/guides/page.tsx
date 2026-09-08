import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'
import { posts } from '@/lib/blog'

const PATH = '/guides'
const TITLE = 'AI Companion Guides — How-Tos for Choosing & Using AI Companions'
const DESC = 'Practical guides for choosing, using and getting the most out of AI companion apps. Decision frameworks, feature explainers, buyer guides.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

// /guides is a filtered view of the blog — every "Guide" and "Explainer"
// post surfaces here, plus every best-of and hub page that answers a
// how-to question. We don't publish new content at this URL; we curate
// existing content so readers who want practical help find it quickly.
const GUIDE_CATEGORIES: Array<'Guide' | 'Explainer'> = ['Guide', 'Explainer']

const CURATED = [
  { href: '/best-ai-girlfriends/',                    title: 'Best AI Girlfriends 2026',           blurb: 'Ranked best AI girlfriend apps, tested platforms only.' },
  { href: '/best-ai-companions/',                     title: 'Best AI Companions 2026',            blurb: 'Ranked best AI companion apps by category.' },
  { href: '/best-ai-girlfriend-for-images/',          title: 'Best AI Girlfriend for Images',      blurb: 'Ranked for image quality and same-character consistency.' },
  { href: '/best-ai-girlfriend-for-video/',           title: 'Best AI Girlfriend for Video',       blurb: 'The honest state of AI girlfriend video in 2026.' },
  { href: '/best-ai-girlfriend-for-voice/',           title: 'Best AI Girlfriend for Voice',       blurb: 'AI girlfriend apps ranked for voice quality and calls.' },
  { href: '/best-ai-companion-for-memory/',           title: 'Best AI Companion for Memory',       blurb: 'Which apps genuinely remember you long-term.' },
  { href: '/best-ai-character-creator/',              title: 'Best AI Character Creator',          blurb: 'Which apps let you actually design a custom companion.' },
]

export default function GuidesIndex() {
  const guideArticles = posts.filter((p) => GUIDE_CATEGORIES.includes(p.category as 'Guide' | 'Explainer'))

  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Guides', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companion Guides</H1>
      <Lede>
        Practical help for choosing, using and getting the most out of AI companion apps.
        Decision frameworks, feature explainers, and ranked best-of pages — all in one place.
      </Lede>

      <H2>Ranked buyer guides</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        gap: 12, margin: '10px 0 30px',
      }}>
        {CURATED.map((c) => (
          <Link key={c.href} href={c.href} style={card}>
            <div style={cardTitle}>{c.title}</div>
            <P>{c.blurb}</P>
            <span style={readMore}>Read</span>
          </Link>
        ))}
      </div>

      <H2>Explainers &amp; how-tos</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
        gap: 12, margin: '10px 0 30px',
      }}>
        {guideArticles.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} style={card}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c2255c' }}>
              {p.category}
            </div>
            <div style={cardTitle}>{p.title}</div>
            <P>{p.description}</P>
            <span style={readMore}>Read</span>
          </Link>
        ))}
      </div>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const card: React.CSSProperties = {
  padding: '18px 20px',
  background: '#fff',
  border: '1px solid #f6d3e1',
  borderRadius: 14,
  textDecoration: 'none',
  color: '#331523',
  display: 'flex', flexDirection: 'column', gap: 6,
}
const cardTitle: React.CSSProperties = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 19, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.3,
}
const readMore: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: '#c2185b',
}
