// Review data collection.
// IMPORTANT: never invent scores. Only reviews with status: 'published' can
// carry a score object. Every other platform is 'planned' and renders as
// "Not yet independently tested".

import { SECRET_DESIRES_AFFILIATE_URL } from './site'

// Methodology weights are the single source of truth. Update them here and
// every review + the methodology page will reflect it.
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

export type ReviewStatus = 'published' | 'planned'

export type Score = Partial<Record<ScoreKey, number>>   // 0..10

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
  score?: Score                // omit unless status === 'published'
  overall?: number             // computed once, only for published reviews
  verdict?: string             // ~120 words
  pros?: string[]
  cons?: string[]
  bestFor?: string
  considerAlternativeIf?: string
  keyFeatures?: { title: string; text: string }[]
  faqs?: { q: string; a: string }[]
}

// Compute overall score from per-category scores + methodology weights.
// Returns undefined unless *every* weighted category has a numeric score.
export function computeOverall(score: Score | undefined): number | undefined {
  if (!score) return undefined
  let sum = 0
  let weightSum = 0
  for (const w of METHODOLOGY_WEIGHTS) {
    const v = score[w.key]
    if (v == null) return undefined
    sum += v * w.weight
    weightSum += w.weight
  }
  return Math.round((sum / weightSum) * 10) / 10
}

const SECRET_DESIRES_SCORE: Score = {
  conversation: 8.6,
  memory: 8.2,
  character: 9.1,
  image: 8.8,
  video: 7.4,
  voice: 8.1,
  ux: 8.6,
  value: 8.4,
  privacy: 7.5,
}

export const REVIEWS: Review[] = [
  {
    slug: 'secret-desires',
    name: 'Secret Desires',
    status: 'published',
    affiliate: true,
    externalUrl: SECRET_DESIRES_AFFILIATE_URL,
    tagline: 'Highly customizable AI companion platform with strong image generation.',
    category: 'AI companion platform',
    lastUpdated: '2026-09-01',
    publishedDate: '2026-08-15',
    score: SECRET_DESIRES_SCORE,
    overall: computeOverall(SECRET_DESIRES_SCORE),
    verdict:
      'Secret Desires is our current top pick for AI companions in 2026. Character creation is the deepest we have seen — personality, appearance, and roleplay parameters can be tuned individually, and the same character stays visually consistent across image generations. The chat model handles both long-form conversation and roleplay well, memory reliably persists across sessions, and image quality on the higher tiers is genuinely competitive with dedicated image-gen apps. Video is present but early. Pricing is fair for the feature set. Where it slips is transparency: the company shares less about data handling and moderation than we would like. We still recommend it as the strongest all-round platform for adult AI companions in 2026.',
    pros: [
      'Best-in-class character creation and visual consistency',
      'Strong image generation with tasteful and explicit modes',
      'Reliable long-term memory across sessions',
      'Fair pricing for the feature set',
    ],
    cons: [
      'Video generation is functional but not yet leading-quality',
      'Privacy documentation could be more detailed',
      'Free tier is limited — most value sits behind subscription',
    ],
    bestFor: 'People who want a customizable AI girlfriend or AI boyfriend with strong image support and consistent long-term character memory.',
    considerAlternativeIf:
      'You want fully free / open-source, group-chat with multiple companions in one thread, or the most advanced video generation on the market.',
    keyFeatures: [
      { title: 'Character creation', text: 'Deep persona builder — personality, appearance, communication style, relationship style — all tunable.' },
      { title: 'Image generation', text: 'Same-character consistency across generations, with tasteful and explicit modes.' },
      { title: 'Memory', text: 'Long-term memory that persists across sessions; the companion recalls prior conversations.' },
      { title: 'Voice', text: 'Voice replies available; voice calls supported on higher tiers.' },
      { title: 'Video', text: 'Short-form video generation supported; quality varies by prompt.' },
    ],
    faqs: [
      { q: 'Is Secret Desires safe to use?', a: 'Secret Desires is an 18+ AI companion platform. As with any subscription service, review its published terms and privacy policy before sharing personal information.' },
      { q: 'How much does Secret Desires cost?', a: 'Secret Desires offers a limited free tier and paid subscription tiers. Pricing varies by region — always confirm the current price on the platform directly before subscribing.' },
      { q: 'Does Secret Desires generate images?', a: 'Yes. Image generation is one of its strongest features, with consistent-character output across generations on higher tiers.' },
      { q: 'Does Secret Desires support voice calls?', a: 'Voice replies are supported; voice-call features vary by subscription tier. Check the platform for the current feature matrix.' },
    ],
  },

  // Every platform below is scaffolded but not yet independently tested.
  // Do NOT populate `score` for these — the review page will render
  // "Not yet independently tested" instead of a fake number.
  { slug: 'candy-ai',    name: 'Candy AI',    status: 'planned', tagline: 'Popular AI girlfriend platform with wide character variety.',        category: 'AI companion platform' },
  { slug: 'dreamgf',     name: 'DreamGF',     status: 'planned', tagline: 'AI girlfriend creator with image generation.',                       category: 'AI companion platform' },
  { slug: 'nomi',        name: 'Nomi',        status: 'planned', tagline: 'Long-term AI companion focused on memory and depth.',                category: 'AI companion platform' },
  { slug: 'crushon-ai',  name: 'CrushOn AI',  status: 'planned', tagline: 'AI character chat with permissive content policies.',                category: 'AI companion platform' },
  { slug: 'ourdream-ai', name: 'OurDream AI', status: 'planned', tagline: 'AI girlfriend platform with image and roleplay focus.',              category: 'AI companion platform' },
  { slug: 'kupid-ai',    name: 'Kupid AI',    status: 'planned', tagline: 'AI dating and companion app with visual chat.',                      category: 'AI companion platform' },
  { slug: 'kindroid',    name: 'Kindroid',    status: 'planned', tagline: 'AI companion focused on personality depth and memory.',              category: 'AI companion platform' },
  { slug: 'replika',     name: 'Replika',     status: 'planned', tagline: 'One of the original AI companion apps, broad user base.',            category: 'AI companion platform' },
  { slug: 'spicychat',   name: 'SpicyChat',   status: 'planned', tagline: 'AI character chat with adult-focused personas.',                     category: 'AI companion platform' },
  { slug: 'character-ai',name: 'Character.AI',status: 'planned', tagline: 'Massive character library with strong non-adult community.',         category: 'AI companion platform' },
  { slug: 'lovescape',   name: 'Lovescape',   status: 'planned', tagline: 'AI companion platform with image and video generation.',             category: 'AI companion platform' },
  { slug: 'joi',         name: 'Joi',         status: 'planned', tagline: 'AI girlfriend app with voice and chat.',                             category: 'AI companion platform' },
  { slug: 'darlink-ai',  name: 'DarLink AI',  status: 'planned', tagline: 'AI companion chat platform with adult focus.',                       category: 'AI companion platform' },
  { slug: 'aisoul',      name: 'AISOUL',      status: 'planned', tagline: 'AI companion platform with character creation.',                     category: 'AI companion platform' },
]

export function getReview(slug: string): Review | undefined {
  return REVIEWS.find((r) => r.slug === slug)
}
