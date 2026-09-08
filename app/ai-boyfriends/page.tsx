import type { Metadata } from 'next'
import HubPage, { P, H2 } from '@/components/HubPage'
import SDAIShowcase from '@/components/SDAIShowcase'
import { pageMetadata } from '@/lib/seo'

const PATH = '/ai-boyfriends'
const META_TITLE = 'AI Boyfriends — Male AI Companion Characters & Apps 2026'
const META_DESC = 'AI boyfriends explained: male AI companion characters, the platforms that support them, and how the category compares to AI girlfriends.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function AIBoyfriendsHub() {
  return (
    <HubPage
      path={PATH}
      title="AI Boyfriends"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="AI boyfriends are male AI companion characters — the same app category as AI girlfriends, framed around a male persona. Support varies by platform: Secret Desires and Candy AI both offer male characters and creation, while many older apps skew female-only."
      intro={
        <>
          <H2>The state of AI boyfriends in 2026</H2>
          <P>
            The male-companion side of the category has caught up quickly. Modern platforms treat
            male characters as first-class — same character creation depth, same image and voice
            support, same memory. Secret Desires and Candy AI are the two we recommend most for AI
            boyfriends specifically.
          </P>
          <H2>What to look for</H2>
          <P>
            Character creation for male companions is the differentiator. Older apps used stock
            male templates and did not let you tune personality or appearance meaningfully. Newer
            platforms treat male and female characters symmetrically.
          </P>
        </>
      }
      extraSection={<SDAIShowcase category="boyfriend" />}
      charFilter={(c) => /male|boyfriend|him|masculine/i.test((c.tags || []).join(' ') + ' ' + c.subtitle)}
      reviewSlugs={['secret-desires', 'candy-ai', 'nomi']}
      faqs={[
        { q: 'Do AI boyfriend apps exist?', a: 'Yes. Every major AI companion platform that supports character creation supports male characters. Some platforms — particularly older ones — skew female-only.' },
        { q: 'Which is best for AI boyfriends?', a: 'Secret Desires is our Editor\'s Pick — deep character creation applies equally to male characters, and image consistency is strong.' },
        { q: 'Are AI boyfriends the same as AI girlfriends?', a: 'Same app category, different persona. Feature parity is largely there in 2026.' },
      ]}
      bottomCtaLabel="Create your AI boyfriend"
    />
  )
}
