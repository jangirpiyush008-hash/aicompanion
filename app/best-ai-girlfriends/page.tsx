import type { Metadata } from 'next'
import BestOfPage, { P, H2 } from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-girlfriends'
const META_TITLE = 'Best AI Girlfriend Apps 2026: Hands-On Tested & Ranked (AI Girlfriend, AI GF, AI Companion)'
const META_DESC = 'The best AI girlfriend apps of 2026 — hands-on tested and ranked. Real scores across image quality, memory, voice, AI sexting, roleplay depth and price. Free tier picks + Editor\'s Pick included.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestAIGirlfriends() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Girlfriends 2026"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires is our current pick for best AI girlfriend in 2026 — strongest character creation, best same-character image consistency, and solid memory. Nomi wins for memory depth; Candy AI is the best browse-a-catalog experience."
      intro={
        <>
          <H2>How this list is built</H2>
          <P>
            The order is our editorial pick for &quot;best AI girlfriend overall&quot; in 2026. Where a
            platform carries a numeric score, that score is from our completed 9-category
            hands-on test. Where a platform is marked <em>Untested</em>, its position reflects
            our editorial read of publicly available information — the numeric score will only
            publish after we complete our own testing. We do not fake scores.
          </P>
        </>
      }
      entries={[
        {
          rank: 1,
          reviewSlug: 'secret-desires',
          bestFor: 'Best overall AI girlfriend',
          note: 'Deepest character creation we\'ve tested, best same-character image consistency, and solid long-term memory. Video is early but functional. Fair pricing for the feature set.',
        },
        {
          rank: 2,
          reviewSlug: 'nomi',
          bestFor: 'Best for long-term memory',
          note: 'If your goal is a companion that remembers you deeply over months, Nomi has invested more in this dimension than anyone. Image and video support is lighter — treat it as a specialist pick.',
        },
        {
          rank: 3,
          reviewSlug: 'candy-ai',
          bestFor: 'Best for browsing a large catalog',
          note: 'Big pre-made character library with a familiar browse-and-pick onboarding. Character creation is thinner than Secret Desires. Good if you prefer picking a companion over designing one.',
        },
        {
          rank: 4,
          reviewSlug: 'dreamgf',
          bestFor: 'Best for fast image-first sessions',
          note: 'Template-driven girlfriend flow with quick image generation. Memory depth is more basic. Reasonable pick if you value speed over creation depth.',
        },
      ]}
      faqs={[
        { q: 'Which AI girlfriend is truly the best?', a: 'Overall: Secret Desires. For memory: Nomi. For catalog browsing: Candy AI. Best depends on what you value most.' },
        { q: 'Are the rankings paid?', a: 'No. Rankings come from our published methodology. Affiliate relationships (disclosed) do not change category winners.' },
        { q: 'How often is this list updated?', a: 'At least every 90 days, and any time a platform ships a major update.' },
      ]}
    />
  )
}
