// Comparison data collection. Every comparison must be based on public
// information from each platform + our own hands-on testing where we have
// it. Never invent scores or feature claims.

export type ComparisonRow = { feature: string; a: string; b: string; winner?: 'a' | 'b' | 'tie' | 'na' }

export type Comparison = {
  slug: string
  a: { name: string; slug?: string }   // slug into /reviews/ if we have one
  b: { name: string; slug?: string }
  lastUpdated?: string
  quickVerdict: string           // ~80 words
  ourPick: 'a' | 'b' | 'tie'
  rows: ComparisonRow[]
  prosA: string[]
  prosB: string[]
  bestForA: string
  bestForB: string
  faqs: { q: string; a: string }[]
}

const SD = { name: 'Secret Desires', slug: 'secret-desires' }

export const COMPARISONS: Comparison[] = [
  {
    slug: 'secret-desires-vs-candy-ai',
    a: SD,
    b: { name: 'Candy AI', slug: 'candy-ai' },
    lastUpdated: '2026-09-01',
    ourPick: 'a',
    quickVerdict:
      'Secret Desires and Candy AI target similar audiences but differ in depth of customization and image consistency. Secret Desires offers a deeper persona builder and more reliable same-character image output; Candy AI ships with a bigger pre-made character catalog and a familiar swipe-through browse experience. If you want to design your companion, pick Secret Desires. If you prefer to browse and choose, Candy AI is worth a look.',
    rows: [
      { feature: 'Character creation depth', a: 'Deep persona builder', b: 'Preset-first with light edits', winner: 'a' },
      { feature: 'Same-character image consistency', a: 'Strong', b: 'Good — occasional drift', winner: 'a' },
      { feature: 'Pre-made character catalog', a: 'Medium', b: 'Large', winner: 'b' },
      { feature: 'Voice replies', a: 'Yes', b: 'Yes', winner: 'tie' },
      { feature: 'Voice calls', a: 'On higher tiers', b: 'On higher tiers', winner: 'tie' },
      { feature: 'Video generation', a: 'Short-form, functional', b: 'Limited', winner: 'a' },
      { feature: 'Memory across sessions', a: 'Persistent', b: 'Persistent', winner: 'tie' },
      { feature: 'Adult content', a: 'Supported', b: 'Supported', winner: 'tie' },
      { feature: 'Free tier', a: 'Limited', b: 'Limited', winner: 'tie' },
      { feature: 'Pricing transparency', a: 'Available on site', b: 'Available on site', winner: 'tie' },
    ],
    prosA: [
      'Deeper persona / character builder',
      'Better same-character image consistency in our testing',
      'Short-form video generation available',
    ],
    prosB: [
      'Much larger pre-made character catalog',
      'Very familiar "browse and pick" onboarding',
      'Broad language coverage',
    ],
    bestForA: 'People who want to design their own companion and care about visual consistency.',
    bestForB: 'People who prefer to browse a large catalog of pre-made companions.',
    faqs: [
      { q: 'Is Secret Desires better than Candy AI?', a: 'For character creation depth and image consistency, Secret Desires is stronger in our testing. For a large pre-made catalog and familiar browse UX, Candy AI is competitive.' },
      { q: 'Are Candy AI and Secret Desires 18+?', a: 'Both platforms allow adult content and are intended for users 18+.' },
      { q: 'Which is cheaper?', a: 'Both platforms offer limited free tiers and paid subscriptions. Confirm current pricing on each platform directly.' },
    ],
  },

  {
    slug: 'secret-desires-vs-dreamgf',
    a: SD,
    b: { name: 'DreamGF', slug: 'dreamgf' },
    lastUpdated: '2026-09-01',
    ourPick: 'a',
    quickVerdict:
      'Both platforms lead with image generation. Secret Desires produces more consistent same-character images across generations and offers a deeper character-creation flow; DreamGF emphasises fast image output and a straightforward girlfriend template. If you plan to build a specific character and want a coherent long-term persona, Secret Desires is the stronger pick. If you want quick image-first interactions with less setup, DreamGF is a reasonable alternative.',
    rows: [
      { feature: 'Character creation depth', a: 'Deep persona builder', b: 'Template-driven', winner: 'a' },
      { feature: 'Image generation quality', a: 'Strong', b: 'Strong', winner: 'tie' },
      { feature: 'Same-character consistency', a: 'Strong', b: 'Good — noticeable drift over time', winner: 'a' },
      { feature: 'Voice replies', a: 'Yes', b: 'Yes', winner: 'tie' },
      { feature: 'Voice calls', a: 'On higher tiers', b: 'Limited', winner: 'a' },
      { feature: 'Video generation', a: 'Short-form', b: 'Short-form', winner: 'tie' },
      { feature: 'Memory across sessions', a: 'Persistent', b: 'Basic', winner: 'a' },
      { feature: 'Free tier', a: 'Limited', b: 'Limited', winner: 'tie' },
    ],
    prosA: [
      'Deeper persona / character builder',
      'More reliable long-term memory',
      'Voice calls on higher tiers',
    ],
    prosB: [
      'Fast image-first UX with less setup',
      'Simple girlfriend template that gets you talking immediately',
    ],
    bestForA: 'Long-term AI companion use where the character grows with you.',
    bestForB: 'Short-session image-first interactions with a template companion.',
    faqs: [
      { q: 'Is DreamGF better than Secret Desires for images?', a: 'Both produce high-quality images. Secret Desires is more consistent in keeping the same character across generations in our testing.' },
      { q: 'Does DreamGF have memory?', a: 'Yes, but the depth is more basic than Secret Desires in our testing.' },
    ],
  },

  {
    slug: 'secret-desires-vs-nomi',
    a: SD,
    b: { name: 'Nomi', slug: 'nomi' },
    lastUpdated: '2026-09-01',
    ourPick: 'a',
    quickVerdict:
      'Secret Desires and Nomi optimize for different things. Secret Desires is a full-stack AI companion — chat, images, voice, video, character creation. Nomi optimizes hard for memory and long-term relationship depth, with lighter image and video support. If you want the full experience, Secret Desires. If you specifically care about a companion that remembers you deeply and evolves over months, Nomi is worth trying alongside it.',
    rows: [
      { feature: 'Character creation depth', a: 'Deep persona builder', b: 'Deep persona builder', winner: 'tie' },
      { feature: 'Image generation', a: 'Strong', b: 'Basic', winner: 'a' },
      { feature: 'Video generation', a: 'Short-form, functional', b: 'Not available', winner: 'a' },
      { feature: 'Voice / voice calls', a: 'Yes / higher tiers', b: 'Yes / limited', winner: 'a' },
      { feature: 'Memory depth', a: 'Strong', b: 'Best-in-class', winner: 'b' },
      { feature: 'Group / multi-companion', a: 'Limited', b: 'Yes', winner: 'b' },
      { feature: 'Adult content', a: 'Supported', b: 'Supported', winner: 'tie' },
    ],
    prosA: [
      'Full-stack: chat, images, voice, video',
      'Best character creation + image consistency',
      'Broad feature coverage',
    ],
    prosB: [
      'Deepest long-term memory in the category',
      'Multi-companion / group chat',
      'Very personality-focused',
    ],
    bestForA: 'People who want one platform that does everything well.',
    bestForB: 'People whose primary goal is a companion that deeply remembers and evolves with them.',
    faqs: [
      { q: 'Does Nomi generate images?', a: 'Yes, but image generation is more basic than Secret Desires.' },
      { q: 'Which has better memory?', a: 'Nomi is our current top pick specifically for memory depth. Secret Desires has strong memory but Nomi has invested more in that dimension.' },
      { q: 'Can you use both?', a: 'Yes — they solve slightly different problems and many users try more than one.' },
    ],
  },
]

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug)
}
