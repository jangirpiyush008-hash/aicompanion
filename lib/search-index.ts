// Build-time search index. Consumed by the client-side search page.
// Compact JSON — one entry per indexable content unit.

import { characters } from './characters'
import { posts } from './blog'
import { REVIEWS } from './reviews'
import { COMPARISONS } from './comparisons'
import { CHARACTER_CATEGORIES } from './character-categories'

export type SearchDoc = {
  title: string
  href: string
  kind: 'Character' | 'Article' | 'Review' | 'Comparison' | 'Category' | 'Page'
  blurb: string
  keywords: string    // space-joined lowercase for cheap substring match
}

// Everything on the site that a user might reasonably search for.
export function buildSearchIndex(): SearchDoc[] {
  const out: SearchDoc[] = []

  for (const c of characters) {
    out.push({
      title: c.name,
      href: `/characters/${c.slug}/`,
      kind: 'Character',
      blurb: c.subtitle,
      keywords: [c.name, ...c.tags, c.subtitle].join(' ').toLowerCase(),
    })
  }

  for (const p of posts) {
    out.push({
      title: p.title,
      href: `/blog/${p.slug}/`,
      kind: 'Article',
      blurb: p.description,
      keywords: [p.title, p.category, ...(p.keywords || [])].join(' ').toLowerCase(),
    })
  }

  for (const r of REVIEWS) {
    out.push({
      title: `${r.name} review`,
      href: `/reviews/${r.slug}/`,
      kind: 'Review',
      blurb: r.tagline,
      keywords: [r.name, 'review', r.tagline, r.category].join(' ').toLowerCase(),
    })
  }

  for (const c of COMPARISONS) {
    out.push({
      title: `${c.a.name} vs ${c.b.name}`,
      href: `/comparisons/${c.slug}/`,
      kind: 'Comparison',
      blurb: c.quickVerdict.slice(0, 160),
      keywords: [c.a.name, 'vs', c.b.name, 'comparison'].join(' ').toLowerCase(),
    })
  }

  for (const cat of CHARACTER_CATEGORIES) {
    out.push({
      title: cat.name,
      href: `/characters/${cat.slug}/`,
      kind: 'Category',
      blurb: cat.description,
      keywords: [cat.name, cat.description].join(' ').toLowerCase(),
    })
  }

  const staticPages: SearchDoc[] = [
    { title: 'AI Girlfriends', href: '/ai-girlfriends/', kind: 'Page', blurb: 'The AI girlfriend category explained.', keywords: 'ai girlfriends hub' },
    { title: 'AI Boyfriends', href: '/ai-boyfriends/', kind: 'Page', blurb: 'AI boyfriend companion characters.', keywords: 'ai boyfriends male hub' },
    { title: 'AI Companions', href: '/ai-companions/', kind: 'Page', blurb: 'The AI companion category explained.', keywords: 'ai companions hub' },
    { title: 'AI Characters', href: '/ai-characters/', kind: 'Page', blurb: 'Original AI-generated characters.', keywords: 'ai characters hub' },
    { title: 'AI Girlfriend Images', href: '/ai-girlfriend-images/', kind: 'Page', blurb: 'Original AI-generated girlfriend imagery.', keywords: 'ai girlfriend images gallery' },
    { title: 'AI Companion Images', href: '/ai-companion-images/', kind: 'Page', blurb: 'The full AI companion character gallery.', keywords: 'ai companion images gallery' },
    { title: 'AI Girlfriend Videos', href: '/ai-girlfriend-videos/', kind: 'Page', blurb: 'Honest state of AI girlfriend video in 2026.', keywords: 'ai girlfriend videos' },
    { title: 'AI Companion Videos', href: '/ai-companion-videos/', kind: 'Page', blurb: 'AI companion video generation state.', keywords: 'ai companion videos' },
    { title: 'Best AI Girlfriends 2026', href: '/best-ai-girlfriends/', kind: 'Page', blurb: 'Ranked best AI girlfriend apps.', keywords: 'best ai girlfriends' },
    { title: 'Best AI Companions', href: '/best-ai-companions/', kind: 'Page', blurb: 'Ranked best AI companion apps.', keywords: 'best ai companions' },
    { title: 'Best for Images', href: '/best-ai-girlfriend-for-images/', kind: 'Page', blurb: 'Best AI girlfriend apps for image generation.', keywords: 'best ai girlfriend images' },
    { title: 'Best for Video', href: '/best-ai-girlfriend-for-video/', kind: 'Page', blurb: 'Best AI girlfriend apps for video.', keywords: 'best ai girlfriend video' },
    { title: 'Best for Voice', href: '/best-ai-girlfriend-for-voice/', kind: 'Page', blurb: 'Best AI girlfriend apps for voice.', keywords: 'best ai girlfriend voice' },
    { title: 'Best for Memory', href: '/best-ai-companion-for-memory/', kind: 'Page', blurb: 'Best AI companion apps for long-term memory.', keywords: 'best ai companion memory' },
    { title: 'Best Character Creator', href: '/best-ai-character-creator/', kind: 'Page', blurb: 'Best AI character creator apps.', keywords: 'best ai character creator' },
    { title: 'Methodology', href: '/methodology/', kind: 'Page', blurb: 'How we score AI companion platforms.', keywords: 'methodology scoring' },
    { title: 'Editorial Policy', href: '/editorial-policy/', kind: 'Page', blurb: 'Editorial standards for AI Companions Labs.', keywords: 'editorial policy' },
    { title: 'Affiliate Disclosure', href: '/affiliate-disclosure/', kind: 'Page', blurb: 'How we handle affiliate relationships.', keywords: 'affiliate disclosure' },
    { title: 'Contact', href: '/contact/', kind: 'Page', blurb: 'Contact AI Companions Labs.', keywords: 'contact email telegram' },
    { title: 'About', href: '/about/', kind: 'Page', blurb: 'About AI Companions Labs.', keywords: 'about' },
    { title: 'Corrections', href: '/corrections/', kind: 'Page', blurb: 'Report an error.', keywords: 'corrections error' },
    { title: '18+ Notice', href: '/18-plus/', kind: 'Page', blurb: '18+ site policy.', keywords: '18 plus adult only' },
  ]
  out.push(...staticPages)

  return out
}
