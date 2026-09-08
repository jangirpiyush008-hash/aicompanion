import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-girlfriend-for-voice'
const META_TITLE = 'Best AI Girlfriend for Voice & Calls 2026'
const META_DESC = 'AI girlfriend apps with voice replies and voice calls, ranked for 2026.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestForVoice() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Girlfriend for Voice & Calls"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires supports voice replies and voice calls on higher tiers with the best quality-to-latency balance we've tested. Nomi and Candy AI also support voice with lighter feature sets."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best voice + calls overall', note: 'Voice reply quality is strong; voice calls on higher tiers are fluid with good latency. Best combo in the category today.' },
        { rank: 2, reviewSlug: 'candy-ai', bestFor: 'Best voice on a large catalog', note: 'Voice replies work across most catalog characters; call support is more limited.' },
        { rank: 3, reviewSlug: 'nomi', bestFor: 'Best voice on the memory pick', note: 'Voice supported but not the focus of the product.' },
      ]}
    />
  )
}
