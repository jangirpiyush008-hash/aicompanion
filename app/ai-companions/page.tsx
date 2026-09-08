import type { Metadata } from 'next'
import HubPage, { P, H2 } from '@/components/HubPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/ai-companions'
const META_TITLE = 'AI Companions — Best Apps, Characters & Reviews 2026'
const META_DESC = 'The AI companion category explained: what these apps do, how they differ from chatbots, and which platforms lead in 2026.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function AICompanionsHub() {
  return (
    <HubPage
      path={PATH}
      title="AI Companions"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="AI companions are chat-based apps built around a persistent AI character with a fixed personality, long-term memory, and often image and voice support. The category leader in 2026 is Secret Desires; Nomi leads specifically for long-term memory depth."
      intro={
        <>
          <H2>Companion vs chatbot</H2>
          <P>
            Chatbots answer one-shot questions and forget you between sessions. AI companions
            assume you are coming back — they invest engineering effort in persona stability,
            long-term memory, and multi-modal presence (image, voice, sometimes video).
          </P>
          <H2>Who is it for</H2>
          <P>
            Social conversation, creative roleplay, language practice, adult companionship — the
            use cases overlap and every serious platform now covers most of them. Pick a platform
            based on the dimension you weight most (memory, images, creation, video).
          </P>
        </>
      }
      reviewSlugs={['secret-desires', 'nomi', 'candy-ai', 'kindroid']}
      faqs={[
        { q: 'What is an AI companion?', a: 'A chat-based app with a persistent AI-powered character. Fixed personality, growing memory of you, often images and voice.' },
        { q: 'What is the best AI companion in 2026?', a: 'Secret Desires is our Editor\'s Pick overall. Nomi is our pick specifically for long-term memory depth.' },
        { q: 'Are AI companions private?', a: 'Privacy varies. See each review and our privacy checklist for what to look for.' },
      ]}
    />
  )
}
