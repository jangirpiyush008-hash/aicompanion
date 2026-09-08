import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL, Callout } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'
import { METHODOLOGY_WEIGHTS } from '@/lib/reviews'

const PATH = '/methodology'
const TITLE = 'Review Methodology — How We Score AI Companion Platforms'
const DESC = 'How AI Companions Labs scores AI companion platforms across 9 weighted categories. Every review is built from this framework.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function MethodologyPage() {
  const total = METHODOLOGY_WEIGHTS.reduce((s, w) => s + w.weight, 0)

  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Methodology', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Review Methodology</H1>
      <Lede>
        Every AI companion platform we review is scored across 9 weighted categories on a 10-point
        scale. The overall score is the weighted average. Platforms we have not hands-on tested
        do not receive a score.
      </Lede>

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

      <H2>What counts as "tested"</H2>
      <P>
        A platform is "tested" only when we have a paid or free-tier account and have run our
        standard test protocol against it: multi-session conversation, image generation batches,
        voice reply samples, feature-matrix verification, and a pricing audit. Any platform
        without this is marked "Not yet independently tested" and receives no score.
      </P>

      <H2>Retesting</H2>
      <P>
        Reviews are retested at least every 90 days and immediately after any major platform
        update. The date on each review reflects the most recent retest.
      </P>
    </PageLayout>
  )
}
