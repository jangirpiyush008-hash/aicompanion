// Blog types. Extracted from lib/blog.ts so pages/components can import types
// without pulling the full POSTS array. lib/blog.ts still re-exports these
// for backwards compatibility.

export type Block =
  | { kind: 'p';  text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'callout'; text: string }
  | { kind: 'quote';   text: string; cite?: string }

export type FaqItem = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string
  description: string     // SEO meta description + card excerpt
  category: 'Guide' | 'Explainer' | 'Comparison' | 'Privacy & Safety' | 'Trends' | 'Reviews'
  date: string            // ISO
  readMin: number
  body: Block[]
  faqs: FaqItem[]
  keywords: string[]
  related: string[]       // other post slugs
  author: string
  // ─── Phase 6 optional additions ──────────────────────────────
  status?: 'published' | 'planned'
  lastUpdated?: string    // ISO — set when the post is revised
  reviewer?: string
  quickAnswer?: string    // ~40-80 words, rendered above the fold
  keyTakeaways?: string[] // 3-5 bullets, rendered below the quick answer
  relatedCharacters?: string[]  // character slugs
  relatedReviews?: string[]     // review slugs
  relatedComparisons?: string[] // comparison slugs
  // Hero image — path under /public. Character portraits by default (site-
  // owned, on-brand); replace with an original diagram/screenshot later.
  heroImage?: string
  heroImageAlt?: string
  heroImageCredit?: string  // e.g. "Original AI Companions Labs artwork"
}

// A "planned" article is a scaffold record — title, slug, category — that
// appears in the internal pipeline but not in the public index or sitemap
// until it graduates to `status: 'published'`. Used to make the 50-topic
// roadmap concrete without publishing 50 thin pages.
export type PlannedPost = {
  slug: string
  title: string
  description: string
  category: BlogPost['category']
  keywords: string[]
}
