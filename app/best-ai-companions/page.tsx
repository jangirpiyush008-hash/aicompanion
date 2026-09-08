import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-companions'
const META_TITLE = 'Best AI Companions 2026 — Ranked by Category'
const META_DESC = 'The best AI companion apps of 2026 across the categories that matter: character creation, memory, images, video and voice.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestAICompanions() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Companions 2026"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires is our overall pick for best AI companion in 2026 — strong character creation, best image consistency, and solid memory. Nomi is our specialist pick for long-term memory."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best overall AI companion', note: 'Strongest all-round platform: character creation, image consistency, memory, and feature breadth. Our Editor\'s Pick.' },
        { rank: 2, reviewSlug: 'nomi', bestFor: 'Best for memory depth', note: 'Optimized specifically for long-term relationship memory. Lighter on image and video.' },
        { rank: 3, reviewSlug: 'kindroid', bestFor: 'Best for personality depth', note: 'Focused on the character\'s inner world — personality feels distinct across companions.' },
        { rank: 4, reviewSlug: 'candy-ai', bestFor: 'Best for pre-made variety', note: 'Large character catalog with a familiar browse-and-pick flow.' },
      ]}
      faqs={[
        { q: 'What is the best AI companion overall?', a: 'Secret Desires — best combination of character creation, image quality, and memory in our testing.' },
        { q: 'Is the best AI companion also the cheapest?', a: 'Not always. Value is one of nine categories we score. See the full methodology for weights.' },
      ]}
    />
  )
}
