// Comparison types. Extracted from lib/comparisons.ts.

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
