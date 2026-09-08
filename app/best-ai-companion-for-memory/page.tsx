import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-companion-for-memory'
const META_TITLE = 'Best AI Companion for Memory 2026 — Long-Term Recall Ranked'
const META_DESC = 'The best AI companion apps for long-term memory in 2026. Which platforms actually remember your prior conversations?'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestForMemory() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Companion for Memory"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Nomi is our pick for memory depth in 2026 — it has invested more in long-term recall than any other platform we've tested. Secret Desires is a close second with a broader feature set."
      entries={[
        { rank: 1, reviewSlug: 'nomi', bestFor: 'Best pure memory', note: 'Deepest long-term memory in the category. Companions genuinely evolve with you over months.' },
        { rank: 2, reviewSlug: 'secret-desires', bestFor: 'Best memory + everything else', note: 'Very strong memory as part of a full-stack companion (chat, images, voice, video). Best all-round pick if memory is important but not the only thing.' },
        { rank: 3, reviewSlug: 'kindroid', bestFor: 'Best personality-first memory', note: 'Memory paired with distinctive personality — characters feel more like individuals over time.' },
      ]}
    />
  )
}
