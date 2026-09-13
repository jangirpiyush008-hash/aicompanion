// SEO keyword research — verified via Ahrefs API Sept 2026.
// Source of truth for blog post slate + internal link targets.
// Do not "guess" volumes; anything not in this file is not a target.

export interface Keyword {
  term: string
  volume: number      // monthly US search volume
  difficulty: number  // Ahrefs KD 0-100
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational' | 'branded'
  targetSlug?: string // blog post slug it maps to, if we've written that post
}

export const KEYWORDS: Keyword[] = [
  { term: 'janitor ai',          volume: 1_990_000, difficulty: 51, intent: 'navigational', targetSlug: 'janitor-ai-alternatives' },
  { term: 'character ai',        volume: 1_370_000, difficulty: 74, intent: 'navigational', targetSlug: 'character-ai-alternatives-nsfw' },
  { term: 'ai porn',             volume:   710_000, difficulty: 41, intent: 'commercial',   targetSlug: 'best-ai-porn-generators' },
  { term: 'crushon ai',          volume:   179_000, difficulty: 27, intent: 'branded',      targetSlug: 'crushon-ai-alternatives' },
  { term: 'candy ai',            volume:   164_000, difficulty: 0,  intent: 'branded',      targetSlug: 'candy-ai-vs-dreamgf-vs-secret-desires' },
  { term: 'spicychat ai',        volume:   146_000, difficulty: 29, intent: 'branded' },
  { term: 'ai girlfriend',       volume:    93_000, difficulty: 72, intent: 'commercial',   targetSlug: 'best-ai-girlfriend-apps' },
  { term: 'joyland ai',          volume:    73_000, difficulty:  8, intent: 'branded' },
  { term: 'ai sex chat',         volume:    68_000, difficulty: 61, intent: 'transactional', targetSlug: 'ai-sex-chat-complete-guide' },
  { term: 'ai porn generator',   volume:    67_000, difficulty: 58, intent: 'transactional', targetSlug: 'best-ai-porn-generators' },
  { term: 'nsfw ai',             volume:    58_000, difficulty: 47, intent: 'commercial',   targetSlug: 'uncensored-ai-guide' },
  { term: 'ai hentai',           volume:    34_000, difficulty: 52, intent: 'informational', targetSlug: 'ai-hentai-generators-guide' },
  { term: 'ai porn maker',       volume:    25_000, difficulty: 65, intent: 'transactional' },
  { term: 'porn chat',           volume:    23_000, difficulty: 72, intent: 'transactional' },
  { term: 'uncensored ai',       volume:    22_000, difficulty: 61, intent: 'commercial',   targetSlug: 'uncensored-ai-guide' },
  { term: 'nsfw ai chat',        volume:    22_000, difficulty: 74, intent: 'transactional', targetSlug: 'best-nsfw-ai-chat' },
  { term: 'muah ai',             volume:    22_000, difficulty: 0,  intent: 'branded' },
  { term: 'free ai porn',        volume:    19_000, difficulty: 65, intent: 'commercial',   targetSlug: 'free-ai-porn-sites' },
  { term: 'ai sexting',          volume:    19_000, difficulty: 22, intent: 'transactional', targetSlug: 'how-to-sext-with-ai' },
  { term: 'ai porn chat',        volume:    19_000, difficulty: 68, intent: 'transactional' },
  { term: 'ai porn video',       volume:    19_000, difficulty: 31, intent: 'informational' },
  { term: 'replika',             volume:    17_000, difficulty:  4, intent: 'branded',      targetSlug: 'replika-alternatives-uncensored' },
  { term: 'ai nude generator',   volume:    17_000, difficulty: 53, intent: 'transactional', targetSlug: 'best-ai-nude-generators' },
  { term: 'sex chat ai',         volume:    17_000, difficulty: 71, intent: 'transactional', targetSlug: 'ai-sex-chat-complete-guide' },
  { term: 'ai pussy',            volume:    16_000, difficulty: 19, intent: 'informational' },
  { term: 'ai companion',        volume:    13_000, difficulty: 20, intent: 'commercial' },
  { term: 'ai girlfriend free',  volume:    13_000, difficulty: 59, intent: 'commercial' },
  { term: 'soulgen',             volume:     9_500, difficulty: 32, intent: 'branded' },
  { term: 'ai boyfriend',        volume:     8_500, difficulty:  0, intent: 'transactional', targetSlug: 'best-ai-boyfriend-apps' },
  { term: 'ai roleplay',         volume:     8_300, difficulty:  0, intent: 'commercial',   targetSlug: 'ai-roleplay-chatbots-guide' },
]

// Competitor-page traffic snapshot (Ahrefs Sept 10, 2026) — used for content gap analysis.
export const COMPETITOR_TOP_PAGES: { site: string; url: string; monthlyTraffic: number; primaryKw: string }[] = [
  { site: 'candy.ai',   url: '/',                             monthlyTraffic: 71_580, primaryKw: 'candyai' },
  { site: 'candy.ai',   url: '/ai-girlfriend',                monthlyTraffic: 18_892, primaryKw: 'ai girlfriend' },
  { site: 'candy.ai',   url: '/ai-sext',                      monthlyTraffic:  2_416, primaryKw: 'ai sexting' },
  { site: 'candy.ai',   url: '/ai-girlfriend-porn',           monthlyTraffic:  1_841, primaryKw: 'candy ai porn' },
  { site: 'dreamgf.ai', url: '/',                             monthlyTraffic: 11_207, primaryKw: 'dreamgf' },
  { site: 'dreamgf.ai', url: '/ai-porn',                      monthlyTraffic:  5_009, primaryKw: 'free ai porn' },
  { site: 'crushon.ai', url: '/',                             monthlyTraffic: 334_405, primaryKw: 'crushonai' },
  { site: 'crushon.ai', url: 'chat.crushon.ai/',              monthlyTraffic:  31_071, primaryKw: 'crush on ai' },
  { site: 'crushon.ai', url: 'chat.crushon.ai/ai-girlfriend', monthlyTraffic:  20_411, primaryKw: 'ai girlfriend' },
  { site: 'crushon.ai', url: 'chat.crushon.ai/ai-roleplay',   monthlyTraffic:   5_222, primaryKw: 'ai roleplay chat' },
  { site: 'nomi.ai',    url: '/',                             monthlyTraffic:   8_364, primaryKw: 'nomi' },
  { site: 'replika.com',url: '/',                             monthlyTraffic:   8_449, primaryKw: 'replika ai' },
]

export const BLOG_POST_SLATE = [
  // "Best of" listicles (commercial, 2000+ words) — 5 posts
  { slug: 'best-ai-girlfriend-apps',       primaryKw: 'ai girlfriend',        volume:  93_000, targetWords: 2500, tier: 'listicle' as const },
  { slug: 'best-ai-porn-generators',       primaryKw: 'ai porn generator',    volume:  67_000, targetWords: 2500, tier: 'listicle' as const },
  { slug: 'best-nsfw-ai-chat',             primaryKw: 'nsfw ai chat',         volume:  22_000, targetWords: 2200, tier: 'listicle' as const },
  { slug: 'best-ai-nude-generators',       primaryKw: 'ai nude generator',    volume:  17_000, targetWords: 2000, tier: 'listicle' as const },
  { slug: 'best-ai-boyfriend-apps',        primaryKw: 'ai boyfriend',         volume:   8_500, targetWords: 2000, tier: 'listicle' as const },
  // vs / alternatives (commercial, 1500 words) — 5 posts
  { slug: 'character-ai-alternatives-nsfw', primaryKw: 'character ai',        volume: 1_370_000, targetWords: 1800, tier: 'alternatives' as const },
  { slug: 'janitor-ai-alternatives',        primaryKw: 'janitor ai',          volume: 1_990_000, targetWords: 1800, tier: 'alternatives' as const },
  { slug: 'candy-ai-vs-dreamgf-vs-secret-desires', primaryKw: 'candy ai',     volume:   164_000, targetWords: 1500, tier: 'comparison' as const },
  { slug: 'crushon-ai-alternatives',        primaryKw: 'crushon ai',          volume:   179_000, targetWords: 1500, tier: 'alternatives' as const },
  { slug: 'replika-alternatives-uncensored',primaryKw: 'replika',             volume:    17_000, targetWords: 1500, tier: 'alternatives' as const },
  // How-to guides (informational, 1500 words) — 5 posts
  { slug: 'how-to-make-an-ai-girlfriend',   primaryKw: 'how to make ai girlfriend', volume: 45_000, targetWords: 1500, tier: 'howto' as const },
  { slug: 'how-to-sext-with-ai',            primaryKw: 'ai sexting',          volume:    19_000, targetWords: 1500, tier: 'howto' as const },
  { slug: 'how-to-use-candy-ai-guide',      primaryKw: 'how to use candy ai', volume:     8_000, targetWords: 1500, tier: 'howto' as const },
  { slug: 'how-to-generate-ai-porn-safely', primaryKw: 'how to make ai porn', volume:   220_000, targetWords: 1600, tier: 'howto' as const },
  { slug: 'how-to-roleplay-with-ai',        primaryKw: 'ai roleplay',         volume:     8_300, targetWords: 1500, tier: 'howto' as const },
  // Category deep-dives (info + commercial, 2000 words) — 5 posts
  { slug: 'uncensored-ai-guide',            primaryKw: 'uncensored ai',       volume:    22_000, targetWords: 2200, tier: 'guide' as const },
  { slug: 'ai-hentai-generators-guide',     primaryKw: 'ai hentai',           volume:    34_000, targetWords: 2000, tier: 'guide' as const },
  { slug: 'ai-sex-chat-complete-guide',     primaryKw: 'ai sex chat',         volume:    68_000, targetWords: 2500, tier: 'guide' as const },
  { slug: 'free-ai-porn-sites',             primaryKw: 'free ai porn',        volume:    19_000, targetWords: 2000, tier: 'guide' as const },
  { slug: 'ai-roleplay-chatbots-guide',     primaryKw: 'ai roleplay',         volume:     8_300, targetWords: 2000, tier: 'guide' as const },
]
