import type { Metadata } from 'next'
import BestOfPage from '@/components/BestOfPage'
import { pageMetadata } from '@/lib/seo'

const PATH = '/best-ai-character-creator'
const META_TITLE = 'Best AI Character Creator 2026 — Ranked'
const META_DESC = 'The best AI character creators of 2026 — apps that let you deeply customize personality, appearance and roleplay style.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function BestCreator() {
  return (
    <BestOfPage
      path={PATH}
      title="Best AI Character Creator"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Secret Desires has the deepest character creator we've tested — personality, appearance, roleplay style and visual consistency all tunable. Kindroid is a strong runner-up for personality depth specifically."
      entries={[
        { rank: 1, reviewSlug: 'secret-desires', bestFor: 'Best overall creator', note: 'Deepest persona + appearance customization we\'ve seen, with strong same-character image consistency across generations.' },
        { rank: 2, reviewSlug: 'kindroid', bestFor: 'Best personality depth', note: 'Character personality tunes distinctively; two custom characters actually feel different.' },
        { rank: 3, reviewSlug: 'nomi', bestFor: 'Best long-term creator', note: 'Creator paired with best-in-class memory means your character grows in a way you can shape over time.' },
      ]}
    />
  )
}
