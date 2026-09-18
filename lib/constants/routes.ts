// Internal route constants. Prefer these over inline string literals so
// route changes are safe and grep-able.

export const ROUTES = {
  HOME: '/',
  CHARACTERS: '/characters',
  BLOG: '/blog',
  REVIEWS: '/reviews',
  COMPARISONS: '/comparisons',
  ALTERNATIVES: '/alternatives',
  GUIDES: '/guides',
  LAB: '/lab',
  SEARCH: '/search',
  AUTHORS: '/authors',
  ABOUT: '/about',
  CONTACT: '/contact',
  METHODOLOGY: '/methodology',
  RESEARCH: '/research',
  CORRECTIONS: '/corrections',
  EDITORIAL_POLICY: '/editorial-policy',
  AFFILIATE_DISCLOSURE: '/affiliate-disclosure',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  AGE_GATE: '/18-plus',
  AI_GIRLFRIENDS: '/ai-girlfriends',
  AI_BOYFRIENDS: '/ai-boyfriends',
  AI_CHARACTERS: '/ai-characters',
  AI_COMPANIONS: '/ai-companions',
  ANIME_AI_COMPANIONS: '/anime-ai-companions',
  AI_COMPANION_IMAGES: '/ai-companion-images',
  AI_COMPANION_VIDEOS: '/ai-companion-videos',
  AI_GIRLFRIEND_IMAGES: '/ai-girlfriend-images',
  AI_GIRLFRIEND_VIDEOS: '/ai-girlfriend-videos',
} as const

export const blogPost = (slug: string): string => `${ROUTES.BLOG}/${slug}/`
export const characterPage = (slug: string): string => `${ROUTES.CHARACTERS}/${slug}/`
export const reviewPage = (slug: string): string => `${ROUTES.REVIEWS}/${slug}/`
export const comparisonPage = (slug: string): string => `${ROUTES.COMPARISONS}/${slug}/`
export const alternativesPage = (slug: string): string => `${ROUTES.ALTERNATIVES}/${slug}/`
export const authorPage = (slug: string): string => `${ROUTES.AUTHORS}/${slug}/`
export const characterCategoryPage = (slug: string): string => `${ROUTES.CHARACTERS}/${slug}/`
