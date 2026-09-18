// Review types. Extracted from lib/reviews.ts. Legacy consumers can still
// import from '@/lib/reviews' — the values file re-exports these types too.

export const METHODOLOGY_WEIGHTS = [
  { key: 'conversation', label: 'Conversation quality', weight: 15 },
  { key: 'memory',       label: 'Memory',               weight: 15 },
  { key: 'character',    label: 'Character customization', weight: 15 },
  { key: 'image',        label: 'Image quality',        weight: 15 },
  { key: 'video',        label: 'Video quality',        weight: 10 },
  { key: 'voice',        label: 'Voice / calls',        weight: 10 },
  { key: 'ux',           label: 'User experience',      weight: 5  },
  { key: 'value',        label: 'Value',                weight: 10 },
  { key: 'privacy',      label: 'Privacy / transparency', weight: 5 },
] as const

export type ScoreKey = typeof METHODOLOGY_WEIGHTS[number]['key']

export type Score = Partial<Record<ScoreKey, number>>   // 0..10

export type ReviewStatus = 'published' | 'planned'

export type Review = {
  slug: string
  name: string
  status: ReviewStatus
  affiliate?: boolean          // true = we earn commissions from this platform
  externalUrl?: string         // outbound link (affiliate URL if applicable)
  tagline: string              // 1-line summary shown in cards
  category: string             // "AI companion platform", etc.
  lastUpdated?: string         // ISO
  publishedDate?: string       // ISO
  testedOn?: string            // ISO — actual date the hands-on test wrapped up
  authorSlug?: string          // maps to lib/authors.ts — who reviewed it
  score?: Score                // omit unless status === 'published'
  overall?: number             // computed once, only for published reviews
  verdict?: string             // ~120 words
  pros?: string[]
  cons?: string[]
  bestFor?: string
  considerAlternativeIf?: string
  keyFeatures?: { title: string; text: string }[]
  faqs?: { q: string; a: string }[]
  // Hero image — 1200x630 WebP. Path relative to /public. Skip to render no hero.
  heroImage?: string
  heroImageAlt?: string
  heroImageCaption?: string
  // First-person testing narrative — the human-voice section that separates a
  // real hands-on review from rewritten marketing copy. Rendered between the
  // score table and pros/cons. Skip on any review we haven't personally tested.
  testingNarrative?: {
    intro: string
    sections: { title: string; body: string }[]
  }
  // External sources / citations. Rendered at the bottom of the review so
  // readers can verify factual claims (privacy policy, pricing, methodology).
  sources?: { text: string; url: string }[]
}
