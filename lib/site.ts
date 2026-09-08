// Central site configuration + affiliate URL. Every Secret Desires CTA
// resolves from SECRET_DESIRES_AFFILIATE_URL — never hard-code a partner URL
// elsewhere. Override at build time with env var of the same name.

export const SITE = {
  name: 'AI Companions Labs',
  domain: 'aicompanionslabs.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aicompanionslabs.com',
  tagline: 'AI Companion Discovery Platform',
  descriptionShort:
    'Reviews of the best AI girlfriend apps, AI companions, AI boyfriend and AI sex chat platforms. 18+.',
  descriptionLong:
    'Hands-on reviews of the best AI girlfriend apps, AI companions, AI boyfriend platforms, AI sex chat, AI sexting and AI roleplay tools. Original AI-generated characters, honest comparisons and lab tests. 18+.',
}

// Real Secret Desires affiliate URL (provided by site owner). Env var override
// still wins for staging / A-B testing — that way we can rotate the link without
// a code deploy.
export const SECRET_DESIRES_AFFILIATE_URL =
  process.env.NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL ||
  'https://secretdesires.ai/create-partner?via=saddam-299148'

// Top nav links. Every entry is a real route (no #anchors) so the nav works
// from any page on the site.
export const NAV = [
  { label: 'Characters',          href: '/characters/' },
  { label: 'AI Girlfriends',      href: '/ai-girlfriends/' },
  { label: 'Reviews',             href: '/reviews/' },
  { label: 'Comparisons',         href: '/comparisons/' },
  { label: 'Guides',              href: '/guides/' },
  { label: 'Lab',                 href: '/lab/' },
  { label: 'Blog',                href: '/blog/' },
  { label: 'Search',              href: '/search/' },
] as const

// icon is a semantic keyword resolved by <CategoryIcon /> into an inline SVG.
// Using icons (not emoji) so the section looks like a polished product surface
// rather than a chat message.
export const CATEGORIES = [
  { icon: 'heart',    name: 'AI Girlfriends',  desc: 'Explore virtual girlfriends and romantic AI companions.', href: '/ai-girlfriends/' },
  { icon: 'user',     name: 'AI Boyfriends',   desc: 'Discover AI male companions and virtual partners.',       href: '/ai-boyfriends/' },
  { icon: 'sparkles', name: 'AI Characters',   desc: 'Browse original AI Companions Labs characters.',          href: '/characters/' },
  { icon: 'image',    name: 'AI Images',       desc: 'Explore AI-generated companion imagery.',                 href: '/ai-girlfriend-images/' },
  { icon: 'play',     name: 'AI Videos',       desc: 'Discover AI companion video experiences.',                href: '/ai-girlfriend-videos/' },
  { icon: 'waveform', name: 'AI Voice & Calls',desc: 'Explore voice-enabled AI companions.',                    href: '/best-ai-girlfriend-for-voice/' },
  { icon: 'star',     name: 'Reviews',         desc: 'Read hands-on platform reviews.',                         href: '/reviews/' },
  { icon: 'chart',    name: 'Comparisons',     desc: 'Compare leading AI companion platforms.',                 href: '/comparisons/' },
] as const

// Homepage "Tested & Featured Platforms" strip. Every entry carries a status
// (editor-pick | testing | featured) — NEVER a numeric rank, because numeric
// ranks imply we've comparatively tested platforms we haven't. Only Secret
// Desires is currently marked editor-pick because it's the only platform we
// have full hands-on data for.
export type PlatformStatus = 'editor-pick' | 'testing' | 'planned'

export const PLATFORMS: {
  slug: string
  name: string
  status: PlatformStatus
  bestFor: string
  href: string
  cta: string
  external?: boolean
}[] = [
  {
    slug: 'secret-desires',
    name: 'Secret Desires',
    status: 'editor-pick',
    bestFor: 'Best for personalized AI companions — custom characters, images and immersive chat.',
    href: SECRET_DESIRES_AFFILIATE_URL,
    cta: 'Try Secret Desires',
    external: true,
  },
  { slug: 'candy-ai', name: 'Candy AI', status: 'testing', bestFor: 'Popular AI girlfriend platform with character variety.', href: '/reviews/candy-ai/',  cta: 'See details' },
  { slug: 'dreamgf',  name: 'DreamGF',  status: 'testing', bestFor: 'AI girlfriend creation with image generation.',         href: '/reviews/dreamgf/',   cta: 'See details' },
  { slug: 'nomi',     name: 'Nomi',     status: 'testing', bestFor: 'Long-term AI companion with strong memory focus.',      href: '/reviews/nomi/',      cta: 'See details' },
]

export const PLATFORM_STATUS_LABELS: Record<PlatformStatus, { label: string; color: string; bg: string }> = {
  'editor-pick': { label: "Editor's Pick",       color: '#7c1236', bg: '#fde8f0' },
  'testing':     { label: 'Currently Testing',    color: '#a05a00', bg: '#fff5e6' },
  'planned':     { label: 'Not yet tested',       color: '#5b3d4b', bg: '#f6d3e1' },
}

// Standardised statuses: Published (linked to a real page), Testing (work in
// progress), Planned (on the roadmap). Never invent "hands-on tested" here —
// only "Published" entries should link to a real /reviews/ or /lab/ page.
export const LAB_TESTS = [
  { status: 'Published', statusColor: '#0b6e30', name: 'Secret Desires Review 2026',             desc: 'Full hands-on review, scored across 9 weighted categories.',              href: '/reviews/secret-desires/' },
  { status: 'Published', statusColor: '#0b6e30', name: 'Best AI Girlfriends 2026',               desc: 'Head-to-head ranking of every platform we\'ve tested.',                  href: '/best-ai-girlfriends/' },
  { status: 'Testing',   statusColor: '#e8590c', name: 'Image Consistency Test',                 desc: 'Same-character consistency across 50 generations, four platforms.',      href: undefined },
  { status: 'Planned',   statusColor: '#a3818f', name: 'Long-Term Memory Test',                  desc: 'Does the companion still remember you after 30 days offline?',           href: undefined },
] as const

// FAQ entries double as FAQPage JSON-LD (see websiteLd/faqLd in lib/seo). Each
// question is anchored on a top target keyword so we're eligible for AI
// Overview / featured-snippet citation. Keep answers direct, self-contained
// and factual — that's what generative engines cite.
export const FAQS = [
  { q: 'What is the best AI girlfriend app in 2026?', a: 'The best AI girlfriend app depends on what you value most — visual customisation, memory, roleplay depth or privacy. Secret Desires is our current editor\'s pick for personalised AI girlfriends with strong image generation; other tested picks are in our Best AI Girlfriends 2026 round-up.' },
  { q: 'How does AI sexting work?', a: 'AI sexting apps use large language models fine-tuned for romantic and explicit roleplay. You describe or design a character, then chat with them via text and often generated images. The best AI sexting platforms remember your preferences across sessions and support voice, image and video reply modes.' },
  { q: 'What is the difference between an AI girlfriend and an AI companion?', a: 'An AI girlfriend is a specific type of AI companion designed for romantic roleplay. AI companion is the broader category — it covers AI girlfriends, AI boyfriends, platonic AI friends, therapy-style companions and character AI roleplay bots.' },
  { q: 'Are AI companions and AI girlfriends safe to use?', a: 'Reputable AI companion platforms encrypt chats, let you delete data and never sell conversations. Risks include unclear data retention, surprise billing and platforms that share generated images with third parties. Our privacy checklist covers exactly what to ask before signing up for any AI girlfriend app.' },
  { q: 'What is the best free AI girlfriend?', a: 'Most AI girlfriend apps offer a free tier, but limits are strict — fewer daily messages, no image generation, no voice. The best free AI girlfriend depends on whether you value message volume, character customisation or image generation. See our comparison for tested free-tier picks.' },
  { q: 'Can I do AI roleplay with a custom character?', a: 'Yes. AI roleplay platforms let you create characters from scratch — appearance, personality, backstory, speaking style — then chat with them in scenarios you define. Some platforms specialise in NSFW AI chat with uncensored roleplay; others focus on family-friendly character creation.' },
  { q: 'What is Secret Desires?', a: 'Secret Desires is our editor\'s pick AI companion platform where adults create and interact with customisable virtual companions through conversation, AI-generated images and immersive chat.' },
  { q: 'Is AI Companions Labs 18+?', a: 'Yes. AI Companions Labs is an 18+ AI companion discovery platform, and every character on this site is a fictional, clearly adult, AI-generated persona.' },
] as const
