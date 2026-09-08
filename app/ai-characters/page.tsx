import type { Metadata } from 'next'
import HubPage, { P, H2 } from '@/components/HubPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/ai-characters'
const META_TITLE = 'AI Characters — Original AI-Generated Companion Characters'
const META_DESC = 'Meet original AI-generated companion characters. Each with a full personality, gallery, and profile — designed for AI Companions Labs.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function AICharactersHub() {
  return (
    <HubPage
      path={PATH}
      title="AI Characters"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="AI characters on this site are original, AI-generated fictional adults with a full personality profile, editorial write-up and gallery. Meet them here, then chat with them on Secret Desires."
      intro={
        <>
          <H2>How our characters are made</H2>
          <P>
            Every character is designed from scratch — persona, aesthetic, wardrobe, backstory —
            then generated visually and written up editorially. No real people. No scraped media.
          </P>
          <H2>What each character page includes</H2>
          <P>
            Personality profile, five trait cards, a gallery (first two images unlocked; the rest
            available on Secret Desires), related characters and a per-character CTA to that
            character&apos;s Secret Desires profile.
          </P>
        </>
      }
      reviewSlugs={['secret-desires']}
      faqs={[
        { q: 'Are these characters real people?', a: 'No. Every character is a fictional AI-generated adult. No real people are depicted.' },
        { q: 'Can I chat with them?', a: 'Yes — each character has a per-character link to Secret Desires where you can interact with them.' },
        { q: 'How many characters are on the site?', a: 'Currently 16 with more added regularly. The architecture is designed to scale to 40–50+.' },
      ]}
    />
  )
}
