// Central site configuration + affiliate URL. Every Secret Desires CTA
// resolves from SECRET_DESIRES_AFFILIATE_URL — never hard-code a partner URL
// elsewhere. Override at build time with env var of the same name.

export const SITE = {
  name: 'AI Companions Labs',
  domain: 'aicompanionslabs.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aicompanionslabs.com',
  tagline: 'AI Companion Discovery Platform',
  descriptionShort:
    '18+ AI companion discovery, honest reviews and original AI-generated characters.',
  descriptionLong:
    'AI Companions Labs is an 18+ discovery platform for AI girlfriends, AI boyfriends, and virtual companions. Original AI-generated characters, hands-on platform reviews, side-by-side comparisons, and lab tests.',
}

// Real Secret Desires affiliate URL (provided by site owner). Env var override
// still wins for staging / A-B testing — that way we can rotate the link without
// a code deploy.
export const SECRET_DESIRES_AFFILIATE_URL =
  process.env.NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL ||
  'https://secretdesires.ai/create-partner?via=saddam-299148'

// Homepage nav links (in-page anchors on / plus real routes).
export const NAV = [
  { label: 'Characters',          href: '/#characters' },
  { label: 'Best AI Girlfriends', href: '/#trending' },
  { label: 'Reviews',             href: '/#reviews' },
  { label: 'Blog',                href: '/blog/' },
  { label: 'Lab',                 href: '/#lab' },
  { label: 'FAQ',                 href: '/#faq' },
] as const

// icon is a semantic keyword resolved by <CategoryIcon /> into an inline SVG.
// Using icons (not emoji) so the section looks like a polished product surface
// rather than a chat message.
export const CATEGORIES = [
  { icon: 'heart',    name: 'AI Girlfriends',  desc: 'Explore virtual girlfriends and romantic AI companions.', href: '/#characters' },
  { icon: 'user',     name: 'AI Boyfriends',   desc: 'Discover AI male companions and virtual partners.',       href: '/#characters' },
  { icon: 'sparkles', name: 'AI Characters',   desc: 'Browse original AI Companions Labs characters.',          href: '/#characters' },
  { icon: 'image',    name: 'AI Images',       desc: 'Explore AI-generated companion imagery.',                 href: '/#characters' },
  { icon: 'play',     name: 'AI Videos',       desc: 'Discover AI companion video experiences.',                href: '/#lab' },
  { icon: 'waveform', name: 'AI Voice & Calls',desc: 'Explore voice-enabled AI companions.',                    href: '/#lab' },
  { icon: 'star',     name: 'Reviews',         desc: 'Read hands-on platform reviews.',                         href: '/#reviews' },
  { icon: 'chart',    name: 'Comparisons',     desc: 'Compare leading AI companion platforms.',                 href: '/#trending' },
] as const

// Trending platforms — "Score pending" for every entry we haven't hands-on-tested,
// per the compliance rule: never fabricate reviews/scores/pricing.
export const PLATFORMS = [
  {
    rank: 1,
    name: 'Secret Desires',
    rating: "Editor's Pick",
    bestFor: 'Best for personalized AI companions — custom characters, images and immersive chat.',
    href: SECRET_DESIRES_AFFILIATE_URL,
    cta: 'Try Secret Desires →',
    btnBg: 'linear-gradient(135deg,#f0417e,#ad1457)',
  },
  { rank: 2, name: 'Candy AI',  rating: 'Score pending hands-on test', bestFor: 'Popular AI girlfriend platform with character variety.', href: '/#reviews', cta: 'Review coming', btnBg: '#b98ba0' },
  { rank: 3, name: 'DreamGF',   rating: 'Score pending hands-on test', bestFor: 'AI girlfriend creation with image generation.',           href: '/#reviews', cta: 'Review coming', btnBg: '#b98ba0' },
  { rank: 4, name: 'Nomi',      rating: 'Score pending hands-on test', bestFor: 'Long-term AI companionship and memory.',                  href: '/#reviews', cta: 'Review coming', btnBg: '#b98ba0' },
] as const

export const LAB_TESTS = [
  { status: 'In progress', statusColor: '#e8590c', name: 'Secret Desires Image Consistency Test', desc: 'Can one character keep the same face across 50 generations?' },
  { status: 'Up next',     statusColor: '#d6336c', name: 'Best AI Girlfriend Apps 2026',           desc: 'Head-to-head ranking across 9 weighted categories.' },
  { status: 'Up next',     statusColor: '#d6336c', name: 'AI Companion Memory Test',               desc: 'Which platforms actually remember week-old conversations?' },
  { status: 'Planned',     statusColor: '#a3818f', name: 'AI Video Generation Comparison',         desc: 'Testing motion quality and character consistency in video.' },
] as const

export const FAQS = [
  { q: 'What is an AI girlfriend?', a: 'An AI girlfriend is a virtual companion powered by AI that you can chat with, customize and interact with through text, images, voice and sometimes video.' },
  { q: 'Can AI companions generate images and videos?', a: 'Many platforms generate images of your companion; video support varies by platform. Our reviews note exactly which features each platform offers.' },
  { q: 'What is Secret Desires?', a: 'Secret Desires is an AI companion platform where adults create and interact with customizable virtual companions through conversation and AI-generated media.' },
  { q: 'Are AI companions private?', a: 'Privacy varies by platform. Check each service’s data handling and billing practices — our reviews cover the privacy questions worth asking.' },
  { q: 'Is AI Companions Labs 18+?', a: 'Yes. AI Companions Labs is intended for adults 18+ only, and every character on this site is a fictional, clearly adult, AI-generated persona.' },
] as const
