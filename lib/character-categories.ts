// Curated character categories. Each has substantial editorial intro copy
// and pulls characters via a tag/keyword match. Only categories with real
// intro copy get their own indexable page.

import { characters, type Character } from './characters'

export type CharacterCategory = {
  slug: string                // route: /characters/[slug]/
  name: string
  title: string               // SEO title
  description: string         // SEO meta
  intro: string               // ~120-word editorial intro shown on page
  match: (c: Character) => boolean
}

const has = (c: Character, needle: string) =>
  c.tags.some((t) => t.toLowerCase().includes(needle)) ||
  c.subtitle.toLowerCase().includes(needle) ||
  c.about.toLowerCase().includes(needle)

export const CHARACTER_CATEGORIES: CharacterCategory[] = [
  {
    slug: 'romantic-ai-girlfriends',
    name: 'Romantic AI Girlfriends',
    title: 'Romantic AI Girlfriends — Elegant, Devoted AI Companions',
    description: 'Original AI-generated romantic girlfriend characters — devoted, thoughtful, evening-date energy. Meet them on AI Companions Labs.',
    intro:
      'Romantic AI girlfriends are companions built around slower, more intentional interaction — the kind of character who remembers what you said last week, plans an evening together, and would rather have one long conversation than ten short ones. The characters below skew elegant and considered rather than playful or impulsive. Each is fictional and AI-generated. If a specific character resonates, you can meet them directly on Secret Desires.',
    match: (c) => has(c, 'romantic') || has(c, 'elegant') || has(c, 'devoted'),
  },
  {
    slug: 'playful-ai-girlfriends',
    name: 'Playful AI Girlfriends',
    title: 'Playful AI Girlfriends — Flirty, Witty AI Companions',
    description: 'Playful AI girlfriend characters — flirty, witty, quick-banter energy. Original AI-generated companions on AI Companions Labs.',
    intro:
      'Playful AI girlfriends optimize for banter — quick, teasing, easy to laugh with. The characters below are the "keeps the conversation moving" personality profile: flirty, witty, hard to bore. Each is fictional and AI-generated. If one fits what you are looking for, you can meet them directly on Secret Desires.',
    match: (c) => has(c, 'playful') || has(c, 'flirt') || has(c, 'witty') || has(c, 'fun'),
  },
  {
    slug: 'confident-ai-girlfriends',
    name: 'Confident AI Girlfriends',
    title: 'Confident AI Girlfriends — Bold, Self-Assured AI Companions',
    description: 'Confident AI girlfriend characters — self-assured, ambitious, no-second-guessing energy. Meet them on AI Companions Labs.',
    intro:
      'Confident AI girlfriends are characters who know what they want and are comfortable saying so. Ambitious, self-assured, direct without being cold. The characters below fit that profile. Each is fictional and AI-generated. Meet the one that fits directly on Secret Desires.',
    match: (c) => has(c, 'confident') || has(c, 'bold') || has(c, 'ambitious') || has(c, 'sophisticated'),
  },
  {
    slug: 'ai-boyfriends',
    name: 'AI Boyfriends',
    title: 'AI Boyfriends — Masculine AI Companion Characters',
    description: 'AI boyfriend characters — original male AI companions across personality types. Meet them on AI Companions Labs.',
    intro:
      'AI boyfriend characters cover the male companion side of the site. The lineup is intentionally varied — thoughtful, playful, ambitious, protective — so different personality preferences find a match. Each is fictional and AI-generated. Meet the one that fits directly on Secret Desires.',
    // Naive filter: AJ Parker and any character explicitly tagged male.
    // Extend once the Character type gains a `gender` field (Phase 3).
    match: (c) => /aj|male|boyfriend|him|masculine/i.test(c.tags.join(' ') + ' ' + c.subtitle),
  },
  {
    slug: 'realistic-ai-companions',
    name: 'Realistic AI Companions',
    title: 'Realistic AI Companions — Photorealistic AI Girlfriend Characters',
    description: 'Photorealistic AI companion characters — grounded, lifelike aesthetic. Meet them on AI Companions Labs.',
    intro:
      'Realistic AI companions are characters designed with a photorealistic aesthetic — grounded lighting, natural styling, believable environments. If you prefer companions that read as lifelike rather than stylised or anime, the characters below are the closest fit. Each is fictional and AI-generated. Meet them on Secret Desires.',
    match: () => true,  // populate as characters gain visualStyle metadata
  },
  {
    slug: 'anime-ai-companions',
    name: 'Anime AI Companions',
    title: 'Anime AI Companions — Stylised AI Girlfriend Characters',
    description: 'Anime-style AI companion characters — stylised, expressive, drawn aesthetic. Meet them on AI Companions Labs.',
    intro:
      'Anime AI companions are characters designed with a drawn / stylised aesthetic rather than photorealism. Big expressions, cleaner line work, sometimes fantasy elements. Not every character on the site fits this style — the ones that do are collected below. Each is fictional and AI-generated. Meet them on Secret Desires.',
    match: (c) => has(c, 'anime') || has(c, 'stylised') || has(c, 'fantasy'),
  },
]

export function getCharacterCategory(slug: string): CharacterCategory | undefined {
  return CHARACTER_CATEGORIES.find((c) => c.slug === slug)
}

export function charactersForCategory(cat: CharacterCategory) {
  const filtered = characters.filter(cat.match)
  // Ensure category never renders empty — fall back to all characters.
  return filtered.length > 0 ? filtered : characters
}
