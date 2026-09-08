import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-girlfriend-for-video'
const META_TITLE = 'Best AI Girlfriend for Video Generation 2026'
const META_DESC = 'AI girlfriend apps with video generation, ranked. Video is early across the category — we say so honestly.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestForVideo() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Girlfriend for Video"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Video generation is early across the AI girlfriend category — no platform we've tested has truly nailed it in 2026. Secret Desires offers functional short-form video and is our current best-available pick."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best available video today', note: 'Short-form video generation works reliably. Not yet the fluid, long-form video that marketing screenshots imply — but the best we\'ve tested.' },
      ]}
      faqs={[
        { q: 'Which AI girlfriend has real video generation?', a: 'Secret Desires is our current best-available pick. Video across the category is early — expect short-form output, not long fluid clips.' },
        { q: 'When will AI girlfriend video get good?', a: 'The underlying models are improving fast. We expect 2026-2027 to close much of the gap.' },
      ]}
    />
  )
}
