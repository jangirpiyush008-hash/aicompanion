import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-girlfriend-apps'
const META_TITLE = 'Best AI Girlfriend Apps 2026 — Ranked'
const META_DESC = 'AI girlfriend apps ranked for 2026. Only platforms we\'ve hands-on tested carry a score.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestAIGirlfriendApps() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Girlfriend Apps 2026"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires leads the AI girlfriend apps category in 2026. Nomi and Candy AI are strong specialist picks. Untested apps on our review list are not ranked."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best AI girlfriend app overall', note: 'Best-in-class creation, image consistency, and memory. Fair pricing. Our Editor\'s Pick.' },
        { rank: 2, reviewSlug: 'candy-ai', bestFor: 'Best for large character catalog', note: 'Big pre-made library and a familiar browse UX.' },
        { rank: 3, reviewSlug: 'dreamgf', bestFor: 'Best for fast image-first sessions', note: 'Template-driven flow, fast image output.' },
        { rank: 4, reviewSlug: 'nomi', bestFor: 'Best for deep memory', note: 'Best-in-class memory but lighter image support.' },
      ]}
    />
  )
}
