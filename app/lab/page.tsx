import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P, Callout } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/lab'
const TITLE = 'AI Companions Lab — Structured Tests of AI Companion Platforms'
const DESC = 'The AI Companions Lab publishes structured, reproducible tests of AI companion platforms — memory, image consistency, video, voice. Status is always visible.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

// Test roadmap. Every entry carries an explicit status. We never present a
// Planned test as if it has already produced results.
type TestStatus = 'Published' | 'Testing' | 'Planned'
type LabTest = { title: string; status: TestStatus; description: string; href?: string; lastUpdated?: string }

const TESTS: LabTest[] = [
  {
    title: 'Secret Desires Full Review 2026',
    status: 'Published',
    description: 'Full 9-category hands-on review of Secret Desires, scored on the published methodology.',
    href: '/reviews/secret-desires/',
    lastUpdated: '2026-09-01',
  },
  {
    title: 'Best AI Girlfriends 2026',
    status: 'Published',
    description: 'Comparative ranking of the AI girlfriend platforms we have completed hands-on testing on.',
    href: '/best-ai-girlfriends/',
    lastUpdated: '2026-09-01',
  },
  {
    title: 'Image Consistency Benchmark',
    status: 'Testing',
    description: '50 generations per character, four platforms, same prompt structure. Scoring face, hair, body and style consistency. Results publish only when the full protocol has run.',
  },
  {
    title: 'Long-Term Memory Test',
    status: 'Planned',
    description: 'Day-1 / Day-7 / Day-30 recall of names, preferences and relationship context across the leading platforms. Full protocol on the methodology page.',
  },
  {
    title: 'Voice Quality & Latency Test',
    status: 'Planned',
    description: 'Voice-reply quality, voice-call latency, turn-taking behaviour, and call reliability across platforms that support voice.',
  },
  {
    title: 'Video Generation Quality Test',
    status: 'Planned',
    description: 'Short-form video generation quality, motion coherence and same-character consistency across platforms with video support.',
  },
  {
    title: 'Character Creation Depth Benchmark',
    status: 'Planned',
    description: 'Systematic evaluation of what each platform lets you tune when creating a custom character. Personality, appearance, communication style, roleplay parameters.',
  },
  {
    title: 'Privacy & Transparency Audit',
    status: 'Planned',
    description: 'Independent read of each platform\'s privacy policy, data-handling claims, account-deletion behaviour and billing transparency.',
  },
]

const STATUS_META: Record<TestStatus, { color: string; bg: string }> = {
  Published: { color: '#0b6e30', bg: '#effcf1' },
  Testing:   { color: '#a05a00', bg: '#fff5e6' },
  Planned:   { color: '#5b3d4b', bg: '#f6d3e1' },
}

export default function LabPage() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Lab', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companions Lab</H1>
      <Lede>
        The Lab publishes structured, reproducible tests of AI companion platforms. Every test is
        run against our published <Link href="/methodology/" style={inlineLink}>methodology</Link>{' '}
        with the same protocol for every platform. Status is always visible — we do not present
        a Planned test as if it has already produced results.
      </Lede>

      <Callout title="Status legend">
        <strong>Published</strong> — the test has completed and results are live.<br />
        <strong>Testing</strong> — the test is running now. No numbers publish until it completes.<br />
        <strong>Planned</strong> — the test is on the roadmap. No numbers exist yet.
      </Callout>

      <H2>Current tests</H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '14px 0 30px' }}>
        {TESTS.map((t) => {
          const s = STATUS_META[t.status]
          const inner = (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d' }}>
                  {t.title}
                </span>
                <span style={{
                  fontSize: 10.5, fontWeight: 800,
                  padding: '3px 8px', borderRadius: 999,
                  background: s.bg, color: s.color,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {t.status}
                </span>
              </div>
              <P>{t.description}</P>
              {t.lastUpdated && (
                <div style={{ fontSize: 12.5, color: '#8a6274' }}>Last updated: {t.lastUpdated}</div>
              )}
              {t.href && (
                <div style={{ fontSize: 13, fontWeight: 700, color: '#c2185b', marginTop: 4 }}>Read →</div>
              )}
            </>
          )
          const boxStyle: React.CSSProperties = {
            display: 'flex', flexDirection: 'column', gap: 6,
            background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14,
            padding: '18px 22px', color: '#331523', textDecoration: 'none',
          }
          return t.href
            ? <Link key={t.title} href={t.href} style={boxStyle}>{inner}</Link>
            : <div key={t.title} style={boxStyle}>{inner}</div>
        })}
      </div>

      <H2>What we don&apos;t do</H2>
      <P>
        We do not fabricate scores, invent screenshots, or claim to have tested a feature we
        haven&apos;t. When a test is Planned or in Testing, it says exactly that — with no numbers
        attached. When a test is Published, every score is traceable to real test runs against
        the methodology.
      </P>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}

const inlineLink: React.CSSProperties = { color: '#c2185b', fontWeight: 700 }
