import type { Metadata } from 'next'
import HubPage, { P, H2 } from '@/components/HubPage'
import SDAIShowcase from '@/components/SDAIShowcase'
import { pageMetadata } from '@/lib/seo'

const PATH = '/ai-girlfriends'
const META_TITLE = 'AI Girlfriends — Best Apps, Characters & Guides 2026'
const META_DESC = 'The AI girlfriend category explained: what these apps do, which platforms lead in 2026, and 12 original AI girlfriend characters you can meet.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function AIGirlfriendsHub() {
  return (
    <HubPage
      path={PATH}
      title="AI Girlfriends"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="AI girlfriends are chat-based apps that let you talk, roleplay and generate images with a persistent AI-driven character. The category leader in 2026 is Secret Desires, followed by Candy AI and DreamGF. Free tiers exist but the useful features usually sit behind a subscription."
      intro={
        <>
          <H2>What an AI girlfriend actually is</H2>
          <P>
            An AI girlfriend is a subset of the AI companion category — a chat app where the
            character is designed around a romantic or flirty framing. Modern platforms let you
            customize personality, appearance and communication style, remember prior sessions, and
            in many cases generate images and voice replies of the same character.
          </P>
          <H2>What to look for in 2026</H2>
          <P>
            Character creation depth, same-character image consistency, and long-term memory are the
            three dimensions we weight most heavily in our reviews. Video and voice are still
            catching up across the category — treat them as bonus features rather than deciding
            factors.
          </P>
        </>
      }
      extraSection={<SDAIShowcase category="girlfriend" />}
      charFilter={(c) => !/male|boyfriend|him/i.test((c.tags || []).join(' ') + ' ' + c.subtitle)}
      reviewSlugs={['secret-desires', 'candy-ai', 'dreamgf', 'nomi']}
      faqs={[
        { q: 'Are AI girlfriend apps 18+?', a: 'Most are. AI Companions Labs treats every platform we review as 18+ by default, and the site itself is 18+.' },
        { q: 'Which AI girlfriend app is best in 2026?', a: 'Our Editor\'s Pick is Secret Desires — strongest character creation, best same-character image consistency, and solid memory. See our full review for the breakdown.' },
        { q: 'Can AI girlfriends remember me?', a: 'Yes, on the platforms that invest in long-term memory. Secret Desires and Nomi lead this category in our testing.' },
        { q: 'Do AI girlfriend apps generate video?', a: 'Some do. Video generation is functional but early across the category; we do not recommend picking a platform primarily for video yet.' },
      ]}
      bottomCtaLabel="Ready to meet your AI girlfriend?"
    />
  )
}
