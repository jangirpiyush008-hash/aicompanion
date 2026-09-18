// Character type. Extracted from lib/characters.ts. Legacy consumers can still
// import Character from '@/lib/characters' — that file re-exports this type
// via the compat shim.

export type Character = {
  slug: string
  name: string
  tags: string[]                        // 3–4 short trait chips
  subtitle: string                      // 1-line personality summary for the hero
  about: string                         // 3–5 sentence editorial paragraph
  traits: { label: string; text: string }[]  // 4–5 trait cards for the character page
  gallery: { src: string; alt: string }[]    // in-order image slots for the gallery
  /** Optional per-character Secret Desires profile URL. If set, all "Meet {Name}"
   *  CTAs + the locked-gallery images link here instead of the generic
   *  SECRET_DESIRES_AFFILIATE_URL. */
  sdaiProfileUrl?: string
  seo: {
    title: string
    description: string
  }

  // ─── Phase 3 additions — all optional so legacy records still compile ───

  /** All characters are adults. This is metadata for display + filtering. */
  age?: number
  gender?: 'female' | 'male' | 'nonbinary'
  relationshipStyle?: string    // e.g. "Devoted", "Playful", "Independent"
  visualStyle?: 'realistic' | 'anime' | 'stylised'
  communicationStyle?: string
  aesthetic?: string
  videos?: { src: string; poster?: string; title: string }[]
  relatedCharacterSlugs?: string[]
  relatedArticleSlugs?: string[]
  faq?: { q: string; a: string }[]
}
