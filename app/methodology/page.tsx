import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, H3, P, UL, Callout } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'
import { METHODOLOGY_WEIGHTS } from '@/lib/reviews'

const PATH = '/methodology'
const TITLE = 'Review Methodology — How We Score AI Companion Platforms'
const DESC = 'How AI Companions Labs scores AI companion platforms across 9 weighted categories. Version, weights, and every change since launch.'

// Methodology version — bump when weights or protocol change. Historical
// versions are documented in the CHANGELOG below.
const METHODOLOGY_VERSION = '1.2'
const METHODOLOGY_LAST_UPDATED = '2026-09-10'
const METHODOLOGY_PUBLISHED = '2026-06-01'

const CHANGELOG: { version: string; date: string; notes: string[] }[] = [
  {
    version: '1.2',
    date: '2026-09-10',
    notes: [
      'Added mandatory hands-on testing narrative on every published review — testers now write in first person about what the account experience was actually like.',
      'Every review is now credited to a named Person author with a public profile.',
      'Sources / citations are now required for factual claims about pricing, privacy, and features.',
    ],
  },
  {
    version: '1.1',
    date: '2026-07-15',
    notes: [
      'Introduced a mandatory cancellation-and-resubscription test as part of the Value score.',
      'Split "AI features" into the current Conversation, Memory, and Character customization categories for finer resolution.',
    ],
  },
  {
    version: '1.0',
    date: '2026-06-01',
    notes: [
      'Initial nine-category weighted methodology published.',
      'Established the rule that no platform can carry a score without a paid or free-tier account being used.',
    ],
  },
]

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function MethodologyPage() {
  const total = METHODOLOGY_WEIGHTS.reduce((s, w) => s + w.weight, 0)

  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Methodology', path: PATH }]}
      jsonLd={articleLd({
        headline: TITLE,
        description: DESC,
        path: PATH,
        datePublished: METHODOLOGY_PUBLISHED,
        dateModified: METHODOLOGY_LAST_UPDATED,
      })}
    >
      <H1>Review Methodology</H1>
      <Lede>
        Every AI companion platform we review is scored across 9 weighted categories on a 10-point
        scale. The overall score is the weighted average. Platforms we have not hands-on tested
        do not receive a score.
      </Lede>

      {/* Version + freshness block — makes it obvious this document is
          actively maintained, not a set-and-forget page from launch day. */}
      <div style={versionBlock}>
        <div>
          <div style={versionLabel}>Version</div>
          <div style={versionValue}>{METHODOLOGY_VERSION}</div>
        </div>
        <div>
          <div style={versionLabel}>Last updated</div>
          <div style={versionValue}>{METHODOLOGY_LAST_UPDATED}</div>
        </div>
        <div>
          <div style={versionLabel}>First published</div>
          <div style={versionValue}>{METHODOLOGY_PUBLISHED}</div>
        </div>
      </div>

      <H2>The nine categories</H2>
      <Callout title="Weights">
        Total weight adds up to {total}. Weights are the single source of truth — any change here
        automatically propagates through every review and best-of page.
      </Callout>
      <div style={{
        border: '1px solid #f6d3e1',
        borderRadius: 14,
        overflow: 'hidden',
        margin: '14px 0 22px',
        background: '#fff',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <thead>
            <tr style={{ background: '#fde8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#a61e4d' }}>Category</th>
              <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#a61e4d' }}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {METHODOLOGY_WEIGHTS.map((w) => (
              <tr key={w.key} style={{ borderTop: '1px solid #f6d3e1' }}>
                <td style={{ padding: '12px 16px', color: '#331523' }}>{w.label}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: '#331523', fontWeight: 700 }}>{w.weight}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>How we score each category</H2>
      <UL items={[
        'Conversation quality — depth, coherence, tone control, roleplay handling, refusal behaviour.',
        'Memory — recall of prior conversations across sessions, days and weeks; how gracefully old context is surfaced.',
        'Character customization — how deeply personality, appearance, voice and roleplay parameters can be tuned.',
        'Image quality — resolution, aesthetic quality, and same-character consistency across generations.',
        'Video quality — motion coherence, character consistency across frames, prompt adherence.',
        'Voice / calls — voice quality, latency, turn-taking, and (if supported) call quality.',
        'User experience — onboarding, navigation, gallery UX, mobile behaviour, edge-case bugs.',
        'Value — pricing vs feature depth vs cap on free tier. Not the cheapest — the best price-for-feature.',
        'Privacy / transparency — clarity of data handling, moderation policy, billing behaviour and account controls.',
      ]} />

      <H2>What counts as &quot;tested&quot;</H2>
      <P>
        A platform is &quot;tested&quot; only when we have a paid or free-tier account and have run our
        standard test protocol against it: multi-session conversation, image generation batches,
        voice reply samples, feature-matrix verification, a pricing audit, and a cancellation
        test. Any platform without this is marked &quot;Not yet independently tested&quot; and receives
        no score.
      </P>

      <H2>Retesting</H2>
      <P>
        Reviews are retested at least every 90 days and immediately after any major platform
        update. The date on each review reflects the most recent retest.
      </P>

      <H2>Methodology change log</H2>
      <P>
        This methodology has changed since launch. Every version shipped is documented below so
        readers can see exactly what changed, when, and why a score written under one version
        might read differently than a score written under the next.
      </P>
      {CHANGELOG.map((v) => (
        <div key={v.version} style={changelogEntry}>
          <H3>Version {v.version} · {v.date}</H3>
          <UL items={v.notes} />
        </div>
      ))}
    </PageLayout>
  )
}

const versionBlock: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
  gap: 12,
  padding: '16px 20px',
  background: '#fff',
  border: '1px solid #f6d3e1',
  borderRadius: 14,
  margin: '4px 0 26px',
}
const versionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#a61e4d',
  marginBottom: 4,
}
const versionValue: React.CSSProperties = {
  fontFamily: 'Playfair Display, serif',
  fontSize: 20,
  fontWeight: 700,
  color: '#2b0f1d',
}
const changelogEntry: React.CSSProperties = {
  padding: '14px 18px',
  background: '#fafaf7',
  border: '1px solid #f6d3e1',
  borderRadius: 12,
  margin: '10px 0',
}
