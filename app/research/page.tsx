import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/research'
const TITLE = 'AI Companion Research — Original Analysis of the Category'
const DESC = 'Original editorial research on the AI companion category — technology, memory, privacy, trends. Distinct from our platform testing (see /lab).'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

// Research pieces are analytical / explanatory (not head-to-head platform
// tests — those live in /lab). Every entry links to something real. We
// don't publish placeholder "coming soon" cards here.
const RESEARCH = [
  {
    title: 'How AI Companion Memory Works',
    href: '/blog/how-ai-companion-memory-works/',
    kind: 'Explainer',
    blurb: 'A technical explainer on how modern AI companion apps implement long-term memory, and why it varies so much across platforms.',
  },
  {
    title: 'Character Consistency in AI Companions',
    href: '/blog/character-consistency-in-ai-companions/',
    kind: 'Explainer',
    blurb: 'Why AI companion characters drift, and what serious platforms do to keep the same persona stable across models and time.',
  },
  {
    title: 'AI Companion Privacy Checklist',
    href: '/blog/ai-companion-privacy-checklist/',
    kind: 'Privacy',
    blurb: 'A practical checklist for evaluating the privacy posture of any AI companion app before you subscribe.',
  },
  {
    title: 'AI Companion Features in 2026',
    href: '/blog/ai-companion-features-2026/',
    kind: 'Landscape',
    blurb: 'A honest survey of what modern AI companion apps actually support in 2026 — memory, images, video, voice, character creation.',
  },
  {
    title: 'AI Companion vs Chatbot vs Assistant',
    href: '/blog/ai-companion-vs-chatbot-vs-assistant/',
    kind: 'Definition',
    blurb: 'The distinctions that matter — how AI companions differ from chatbots and virtual assistants in design, memory and intent.',
  },
]

export default function ResearchPage() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Research', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companion Research</H1>
      <Lede>
        Original editorial research on the AI companion category. Research is analytical and
        explanatory — how the technology works, what shapes the category, where privacy and
        design tradeoffs sit. For head-to-head platform tests, see the{' '}
        <Link href="/lab/" style={inlineLink}>Lab</Link>.
      </Lede>

      <H2>Published research</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
        gap: 14, margin: '10px 0 30px',
      }}>
        {RESEARCH.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            style={{
              padding: '18px 20px',
              background: '#fff',
              border: '1px solid #f6d3e1',
              borderRadius: 14,
              textDecoration: 'none',
              color: '#331523',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c2255c' }}>
              {r.kind}
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.3 }}>
              {r.title}
            </div>
            <P>{r.blurb}</P>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#c2185b' }}>Read</span>
          </Link>
        ))}
      </div>

      <H2>How research differs from testing</H2>
      <P>
        <strong>Research</strong> is our editorial analysis of how the AI companion category
        actually works — technology, tradeoffs, patterns. It can be published from public
        information plus editorial judgment. <strong>Testing</strong> lives in the{' '}
        <Link href="/lab/" style={inlineLink}>Lab</Link> and requires hands-on use of each
        platform against a structured methodology. We keep them separate so a reader always
        knows which they&apos;re reading.
      </P>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const inlineLink: React.CSSProperties = { color: '#c2185b', fontWeight: 700 }
