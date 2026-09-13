// Directory data — 56 sites × 12 categories, seed from prototype handoff Sept 2026.
// Ratings are provisional prototype values; verify before launch.
// SDAI is pinned #1 in every category it belongs to via `pinned: true` +
// sitesInCategory() sort function (not editorially — enforce in code).

import { SECRET_DESIRES_AFFILIATE_URL } from './site'

export type BadgeKey = 'ai' | 'hot' | 'new' | 'sale' | 'free' | 'pick'
export type CategorySlug =
  | 'ai-girlfriends' | 'ai-boyfriends' | 'ai-anime-waifu' | 'ai-sexting-apps'
  | 'ai-voice-phone-sex' | 'ai-nsfw-image-generators' | 'ai-video-generators'
  | 'ai-roleplay-fiction' | 'free-ai-companions' | 'uncensored-ai-chatbots'
  | 'ai-character-creators' | 'ai-companion-deals'

export interface Category {
  slug: CategorySlug
  name: string
  tag: string
  color: string
  icon: string
  target: number
}

export interface SitePrice {
  free?: string
  paid?: string
  life?: string
  code?: string
  save?: string
}

export interface Site {
  slug: string
  name: string
  domain: string
  rating: number
  cats: CategorySlug[]
  badge: BadgeKey | null
  tag: string
  pinned: boolean
  outbound: string
  isAffiliate?: boolean
  desc?: string
  feats?: string[]
  price?: SitePrice
}

export const CATS: Category[] = [
  { slug: 'ai-girlfriends',           name: 'AI Girlfriends',           tag: 'Chat, image and voice, build the AI girlfriend you want', color: '#d9480f', icon: 'heart',     target: 25 },
  { slug: 'ai-boyfriends',            name: 'AI Boyfriends',            tag: 'Male AI companions, romance, roleplay, voice',            color: '#F76707', icon: 'user',      target: 15 },
  { slug: 'ai-anime-waifu',           name: 'AI Anime & Waifu',         tag: 'Anime-styled AI companions and waifu chatbots',           color: '#e03131', icon: 'anime',     target: 20 },
  { slug: 'ai-sexting-apps',          name: 'AI Sexting Apps',          tag: 'Text-first NSFW chat and sexting AIs',                    color: '#E8590C', icon: 'chat',      target: 25 },
  { slug: 'ai-voice-phone-sex',       name: 'AI Voice & Phone Sex',     tag: 'Voice-enabled AI companions and AI adult audio',          color: '#FFA94D', icon: 'waveform',  target: 12 },
  { slug: 'ai-nsfw-image-generators', name: 'AI NSFW Image Generators', tag: 'Generate custom explicit AI images',                      color: '#f08c00', icon: 'image',     target: 25 },
  { slug: 'ai-video-generators',      name: 'AI Video Generators',      tag: 'Short-form AI adult video and animation tools',           color: '#D9480F', icon: 'video',     target: 10 },
  { slug: 'ai-roleplay-fiction',      name: 'AI Roleplay & Erotic Fiction', tag: 'Long-form roleplay and erotic story engines',          color: '#FF9A4D', icon: 'book',      target: 20 },
  { slug: 'free-ai-companions',       name: 'Free AI Companions',       tag: 'Meaningfully free tiers, no card required',               color: '#E67700', icon: 'gift',      target: 15 },
  { slug: 'uncensored-ai-chatbots',   name: 'Uncensored AI Chatbots',   tag: 'No filters, no refusals, adult chat',                     color: '#F08C00', icon: 'unlock',    target: 20 },
  { slug: 'ai-character-creators',    name: 'AI Character Creators',    tag: 'Build your own AI companion from scratch',                color: '#FF6B1A', icon: 'sparkles',  target: 15 },
  { slug: 'ai-companion-deals',       name: 'AI Companion Deals',       tag: 'Discount codes, promo offers and coupons',                color: '#FF922B', icon: 'tag',       target: 10 },
]

export const BADGES: Record<BadgeKey, { bg: string; fg: string; label: string }> = {
  ai:   { bg: 'rgba(255,179,102,.16)', fg: '#FFB366', label: 'Ai' },
  hot:  { bg: 'rgba(255,122,46,.22)',  fg: '#FF7A2E', label: 'Hot' },
  new:  { bg: 'rgba(255,192,120,.16)', fg: '#FFC078', label: 'New' },
  sale: { bg: 'rgba(253,126,20,.2)',   fg: '#FD7E14', label: 'Sale' },
  free: { bg: 'rgba(255,169,77,.18)',  fg: '#FFA94D', label: 'Free' },
  pick: { bg: 'rgba(255,122,46,.18)',  fg: '#FFB366', label: '★ Editor’s Pick' },
}

export const VERIFIED = '2026-09-10'

const K = {
  gf: 'ai-girlfriends', bf: 'ai-boyfriends', an: 'ai-anime-waifu', sx: 'ai-sexting-apps',
  vo: 'ai-voice-phone-sex', im: 'ai-nsfw-image-generators', vd: 'ai-video-generators',
  rp: 'ai-roleplay-fiction', fr: 'free-ai-companions', un: 'uncensored-ai-chatbots',
  cc: 'ai-character-creators', dl: 'ai-companion-deals',
} as const
type CK = keyof typeof K

const S = (
  slug: string, name: string, domain: string, rating: number,
  cats: CK[], badge: BadgeKey | null, tag: string,
): Site => ({
  slug, name, domain, rating,
  cats: cats.map(c => K[c] as CategorySlug),
  badge, tag, pinned: false, outbound: 'https://' + domain,
})

export const SITES: Site[] = [
  {
    ...S('secret-desires', 'Secret Desires', 'secretdesires.ai', 9.5,
      ['gf','bf','an','sx','vo','im','vd','rp','un','cc','dl'], 'pick',
      'Editor’s Pick, AI companion with consistent image generation, memory and character depth'),
    pinned: true, isAffiliate: true,
    outbound: SECRET_DESIRES_AFFILIATE_URL,
    desc: 'Secret Desires is our Editor’s Pick across the directory. In our testing it scored highest on image consistency, long-term memory, character depth and value for money. Characters stay visually consistent across generated images, remember prior conversations, and can be customized from appearance down to personality detail. Full transparency: we have an ongoing business relationship with Secret Desires beyond a standard affiliate link. Our rating rubric would put them at or near the top even without it, but you should know it exists.',
    feats: [
      'Consistent character image generation',
      'Long-term conversation memory',
      'Deep character customization',
      'Strong value for money',
      'Voice and roleplay modes',
    ],
    price: { free: 'Limited free chat', paid: 'unknown', life: 'unknown', code: 'SDAI20', save: '20% off first month' },
  },
  S('candy-ai',        'Candy AI',        'candy.ai',        8.8, ['gf','sx','im','dl'],       'ai',   'Popular AI girlfriend with image generation'),
  S('dreamgf',         'DreamGF',         'dreamgf.ai',      8.1, ['gf','sx','im','dl'],       null,   'AI girlfriend builder with photo requests'),
  S('nomi',            'Nomi',            'nomi.ai',         8.6, ['gf','bf','vo','cc'],       'hot',  'Companion AI known for memory and voice'),
  S('crushon-ai',      'CrushOn AI',      'crushon.ai',      8.2, ['gf','an','rp','un'],       null,   'Unfiltered character chat, large community library'),
  S('ourdream-ai',     'OurDream AI',     'ourdream.ai',     7.7, ['gf','im','dl'],            null,   'AI girlfriend with image and video generation'),
  S('kupid-ai',        'Kupid AI',        'kupid.ai',        7.5, ['gf','dl'],                 null,   'AI companion chat with voice messages'),
  S('kindroid',        'Kindroid',        'kindroid.ai',     8.5, ['gf','bf','vo','cc'],       null,   'Highly customizable AI companion with calls'),
  S('replika',         'Replika',         'replika.com',     8.4, ['gf','bf','vo'],            null,   'The longest-running AI companion app'),
  S('spicychat',       'SpicyChat',       'spicychat.ai',    8.0, ['an','rp','fr','un'],       'free', 'Free NSFW character chat, community characters'),
  S('character-ai',    'Character.AI',    'character.ai',    8.3, ['bf','fr','cc'],            null,   'Mainstream character chat platform (filtered)'),
  S('lovescape',       'Lovescape',       'lovescape.com',   7.2, ['gf'],                      null,   'AI girlfriend chat and images'),
  S('joi',             'Joi',             'joi.ai',          7.0, ['sx'],                      null,   'Text-first AI sexting companion'),
  S('darlink-ai',      'DarLink AI',      'darlink.ai',      6.8, ['sx'],                      null,   'AI companion chat app'),
  S('aisoul',          'AISOUL',          'aisoul.io',       6.6, ['sx'],                      null,   'AI companion and NSFW chat'),
  S('muah-ai',         'Muah AI',         'muah.ai',         7.8, ['gf','sx','vo','un','fr'],  'free', 'Uncensored chat, photo exchange and voice'),
  S('soulfun',         'Soulfun',         'soulfun.ai',      7.3, ['gf','sx'],                 null,   'AI girlfriend chat with lifelike voice'),
  S('girlfriendgpt',   'GirlfriendGPT',   'girlfriendgpt.ai',7.6, ['sx'],                      null,   'NSFW chat with a large character hub'),
  S('fantasygf',       'FantasyGF',       'fantasygf.ai',    7.4, ['gf','sx'],                 null,   'AI girlfriend with sexting and images'),
  S('janitor-ai',      'Janitor AI',      'janitorai.com',   8.0, ['an','rp','fr','un'],       'free', 'Community roleplay characters, NSFW allowed'),
  S('herahaven',       'HeraHaven',       'herahaven.ai',    7.5, ['gf','un'],                 null,   'AI girlfriend with uncensored chat'),
  S('lurvessa',        'Lurvessa',        'lurvessa.com',    6.9, ['gf','un'],                 'new',  'Newer AI girlfriend service'),
  S('aiuncensored',    'Aiuncensored',    'aiuncensored.info', 6.4, ['un'],                    null,   'Unfiltered AI chat tools'),
  S('chatfai',         'ChatFAI',         'chatfai.com',     6.7, ['cc'],                      null,   'Chat with and create fictional characters'),
  S('botify-ai',       'Botify AI',       'botify.ai',       7.1, ['cc'],                      null,   'Create and chat with AI characters'),
  S('polybuzz',        'PolyBuzz',        'polybuzz.ai',     7.2, ['fr','cc'],                 null,   'Free character chat, formerly Poly.AI'),
  S('boyfriendgpt',    'BoyfriendGPT',    'boyfriendgpt.io', 7.0, ['bf'],                      null,   'Male AI companion chat'),
  S('himeros',         'HimEros',         'himeros.ai',      6.8, ['bf'],                      null,   'AI boyfriend experience'),
  S('anima',           'Anima',           'myanima.ai',      7.4, ['bf'],                      null,   'AI friend and romantic companion'),
  S('yourboyfriendai', 'YourBoyfriendAI', 'yourboyfriend.ai',6.5, ['bf'],                      null,   'AI boyfriend chat'),
  S('waifuchat',       'WaifuChat',       'waifuchat.ai',    6.9, ['an'],                      null,   'Anime waifu chatbot'),
  S('genesia-ai',      'Genesia AI',      'genesia.ai',      7.1, ['an'],                      null,   'Anime-style AI companion app'),
  S('talkie-ai',       'Talkie AI',       'talkie-ai.com',   7.8, ['an','bf','fr'],            null,   'Character chat with voice, anime styles'),
  S('call-annie',      'Call Annie',      'callannie.ai',    7.6, ['vo'],                      null,   'Real-time AI video and voice calls'),
  S('chai',            'Chai',            'chai.ml',         7.6, ['vo','fr'],                 null,   'Mobile AI chat with community bots'),
  S('pornx-ai',        'PornX AI',        'pornx.ai',        7.9, ['im'],                      null,   'AI porn image generator with presets'),
  S('unstability-ai',  'Unstability AI',  'unstability.ai',  7.4, ['im'],                      null,   'Unfiltered AI image generation'),
  S('pornmake-ai',     'PornMake AI',     'pornmake.ai',     6.8, ['im'],                      null,   'AI adult image generator'),
  S('picso',           'PicSo',           'picso.ai',        7.0, ['im'],                      null,   'AI art and character image generator'),
  S('pornpen',         'PornPen',         'pornpen.ai',      7.5, ['im'],                      null,   'Tag-based AI adult image generator'),
  S('soulgen',         'SoulGen',         'soulgen.net',     7.8, ['im'],                      null,   'AI image generator, real and anime styles'),
  S('perchance-ai',    'Perchance AI',    'perchance.org',   7.7, ['im','fr'],                 'free', 'Free browser-based AI image generation'),
  S('nudeai',          'NudeAI',          'nudeai.com',      6.6, ['im'],                      null,   'AI nude image generation'),
  S('undress-ai',      'Undress AI',      'undress.app',     6.3, ['im'],                      null,   'AI undress image tool'),
  S('seduced-ai',      'Seduced AI',      'seduced.ai',      8.0, ['im'],                      'hot',  'High-quality NSFW image and video generation'),
  S('fantasyflix',     'FantasyFlix',     'fantasyflix.ai',  7.2, ['vd'],                      'new',  'AI adult video generation'),
  S('pornjourney',     'PornJourney',     'pornjourney.ai',  7.6, ['vd','im'],                 null,   'AI porn images with video features'),
  S('hentaiengine',    'HentaiEngine',    'hentaiengine.ai', 6.7, ['vd','an'],                 null,   'AI hentai image and animation'),
  S('ai-dungeon',      'AI Dungeon',      'aidungeon.io',    7.9, ['rp'],                      null,   'Open-ended AI text adventure'),
  S('novelai',         'NovelAI',         'novelai.net',     8.2, ['rp','im'],                 null,   'AI storytelling with anime image gen'),
  S('sudowrite',       'SudoWrite',       'sudowrite.com',   7.7, ['rp'],                      null,   'AI writing partner for fiction'),
  S('chub-ai',         'Chub AI',         'chub.ai',         7.8, ['rp','an','un','cc'],       null,   'Character cards and unfiltered roleplay'),
  S('venus-chub',      'Venus Chub AI',   'venus.chub.ai',   7.5, ['fr','un'],                 'free', 'Free frontend for unfiltered character chat'),
  S('yodayo',          'Yodayo',          'yodayo.com',      7.4, ['an','fr'],                 null,   'Anime AI art and character platform'),
  S('sakurafm',        'SakuraFM',        'sakura.fm',       7.3, ['an','fr'],                 null,   'Free character chat with voice'),
  S('botmake',         'Botmake',         'botmake.io',      6.5, ['cc'],                      null,   'Simple no-code chatbot builder'),
]

// SDAI pinned first, then rating desc — enforced in code, not editorially.
export function sitesInCategory(slug: CategorySlug): Site[] {
  const inCat = SITES.filter(s => s.cats.includes(slug))
  const pinned = inCat.filter(s => s.pinned)
  const rest = inCat.filter(s => !s.pinned).sort((a, b) => b.rating - a.rating)
  return [...pinned, ...rest]
}

export function getSite(slug: string): Site | undefined { return SITES.find(s => s.slug === slug) }
export function getCat(slug: string): Category | undefined { return CATS.find(c => c.slug === slug) }
export function initials(name: string): string {
  const w = name.split(/\s+/)
  return (w[0][0] + (w[1] ? w[1][0] : '')).toUpperCase()
}
export function bars(site: Site): [string, number][] {
  let h = 0
  for (const ch of site.slug) h = (h * 31 + ch.charCodeAt(0)) % 97
  const r = site.rating * 10
  const c = (v: number) => Math.max(38, Math.min(100, Math.round(v)))
  return [['Overall', c(r)], ['Image', c(r - 8 + (h % 14))], ['Chat', c(r - 4 + (h % 9))], ['Value', c(r - 10 + (h % 16))]]
}
export function logo(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}
export function catColor(slug: string): string {
  const c = getCat(slug)
  return c ? c.color : '#e8590c'
}

// Every outbound link honors affiliate-vs-nofollow. SDAI = sponsored,
// everyone else = plain nofollow.
export function outboundRel(site: Site): string {
  return site.isAffiliate ? 'sponsored noopener nofollow' : 'noopener nofollow'
}
