import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-girlfriend-for-images'
const META_TITLE = 'Best AI Girlfriend for Image Generation 2026'
const META_DESC = 'The best AI girlfriend apps for image generation in 2026. Ranked on quality and same-character consistency across generations.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestForImages() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Girlfriend for Image Generation"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires leads on image generation in 2026 — both quality and (more importantly) same-character consistency across generations. DreamGF is a fast image-first alternative."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best for character consistency', note: 'Same character stays visually recognisable across generations. Tasteful and explicit modes both supported.' },
        { rank: 2, reviewSlug: 'dreamgf', bestFor: 'Best for fast image output', note: 'Optimized for quick image generation with less setup, at some cost to long-run character consistency.' },
        { rank: 3, reviewSlug: 'candy-ai', bestFor: 'Best for pre-made variety', note: 'Big character catalog with reasonable image quality. Occasional visual drift.' },
      ]}
    />
  )
}
