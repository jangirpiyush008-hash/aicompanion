// Alternatives pages. For each named platform, we list 3-5 genuine
// alternatives with reasons. Secret Desires may appear but is not always the
// top pick — credibility matters more than any single conversion.

export type AlternativeEntry = {
  reviewSlug: string             // must exist in REVIEWS
  reason: string                 // ~50 words on why they're a good alternative here
}

export type AlternativesPage = {
  slug: string                   // route: /alternatives/[slug]
  targetName: string             // "Candy AI"
  targetSlug?: string            // link to /reviews/[slug]/ if we have one
  intro: string                  // ~80-100 words
  entries: AlternativeEntry[]
  faqs?: { q: string; a: string }[]
}

export const ALTERNATIVES: AlternativesPage[] = [
  {
    slug: 'candy-ai-alternatives',
    targetName: 'Candy AI',
    targetSlug: 'candy-ai',
    intro:
      'Looking for something other than Candy AI? The main reasons people switch are: (a) they want a deeper character creator instead of picking from a catalog, (b) they want better same-character image consistency over long-run use, or (c) they want stronger long-term memory. The alternatives below cover all three angles.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'If you\'d rather design your own character than pick from a catalog, Secret Desires has the deepest creator we\'ve tested plus better same-character image consistency.' },
      { reviewSlug: 'nomi',           reason: 'If Candy AI\'s memory feels shallow after a few weeks of use, Nomi is the specialist pick — best long-term memory in the category.' },
      { reviewSlug: 'dreamgf',        reason: 'If you liked Candy AI\'s speed but want more image focus, DreamGF is template-driven and image-first.' },
      { reviewSlug: 'kindroid',       reason: 'If you want characters that feel distinctly personality-driven rather than catalog-shopped, Kindroid is worth trying.' },
    ],
    faqs: [
      { q: 'Is Candy AI still worth using?', a: 'Yes — for browsing a big pre-made catalog, Candy AI is competitive. Look at alternatives when you outgrow the catalog and want deeper creation or memory.' },
      { q: 'What\'s the closest Candy AI alternative?', a: 'DreamGF for a similar template-first flow with more image focus; Secret Desires for a deeper alternative.' },
    ],
  },
  {
    slug: 'dreamgf-alternatives',
    targetName: 'DreamGF',
    targetSlug: 'dreamgf',
    intro:
      'DreamGF is fast and image-first, which is its strength — and also why people look elsewhere. Common reasons to switch: wanting deeper character creation, better same-character consistency over time, or a broader feature set than just images.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'Best all-round upgrade — deeper creator, better image consistency, plus voice and video.' },
      { reviewSlug: 'candy-ai',       reason: 'Similar template-first flow with a bigger pre-made catalog.' },
      { reviewSlug: 'nomi',           reason: 'If you\'ve stopped caring about images and want a companion that really remembers you, Nomi is the specialist.' },
    ],
  },
  {
    slug: 'crushon-alternatives',
    targetName: 'CrushOn AI',
    targetSlug: 'crushon-ai',
    intro:
      'CrushOn AI has permissive content policies which is why some people pick it. If you want that plus more polished character creation, image consistency and memory, the alternatives below fit.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'More polished character creation and image consistency, with adult content supported.' },
      { reviewSlug: 'spicychat',      reason: 'Similar adult-focused character chat if CrushOn isn\'t quite fitting.' },
      { reviewSlug: 'candy-ai',       reason: 'Bigger pre-made character library with adult content available.' },
    ],
  },
  {
    slug: 'nomi-alternatives',
    targetName: 'Nomi',
    targetSlug: 'nomi',
    intro:
      'Nomi is the memory specialist. People switch away from Nomi when they want stronger image generation, video, or a broader feature set.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'Full-stack alternative with strong (though not Nomi-level) memory plus best-in-class image consistency and voice/video.' },
      { reviewSlug: 'kindroid',       reason: 'Similar personality-first ethos with a slightly different memory approach.' },
      { reviewSlug: 'candy-ai',       reason: 'If you want a bigger visual catalog and less depth-focus, Candy AI is a different tradeoff.' },
    ],
  },
  {
    slug: 'ourdream-alternatives',
    targetName: 'OurDream AI',
    targetSlug: 'ourdream-ai',
    intro:
      'OurDream AI focuses on image and roleplay. Alternatives are worth considering if you want deeper character creation, better image consistency, or long-term memory.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'Same image + roleplay focus with a deeper creator and better long-run character consistency.' },
      { reviewSlug: 'dreamgf',        reason: 'Similar template-driven image-first flow with a lighter learning curve.' },
      { reviewSlug: 'candy-ai',       reason: 'Bigger pre-made catalog with a similar image + chat balance.' },
    ],
  },
  {
    slug: 'kupid-ai-alternatives',
    targetName: 'Kupid AI',
    targetSlug: 'kupid-ai',
    intro:
      'Kupid AI leans dating-app aesthetic. If you want a deeper companion experience rather than a swipe-first flow, the alternatives below are worth trying.',
    entries: [
      { reviewSlug: 'secret-desires', reason: 'Deeper character creation and stronger long-run consistency.' },
      { reviewSlug: 'candy-ai',       reason: 'Similar large-catalog approach with a broader feature set.' },
      { reviewSlug: 'nomi',           reason: 'If memory depth matters more than swipe-and-pick discovery, Nomi is the specialist.' },
    ],
  },
]

export function getAlternatives(slug: string): AlternativesPage | undefined {
  return ALTERNATIVES.find((a) => a.slug === slug)
}
