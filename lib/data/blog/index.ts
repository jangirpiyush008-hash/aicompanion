// Aggregates blog data. Do not edit POSTS here — edit the per-category
// files under lib/data/blog/*.ts. This file only concatenates them (in
// original publication order via ORDERED_SLUGS) and exposes the same public
// surface lib/blog.ts used to.

import type { BlogPost, PlannedPost } from '../../types/blog'
import { POSTS as GUIDE_POSTS } from './guides'
import { POSTS as COMPARISON_POSTS } from './comparisons'
import { POSTS as REVIEW_POSTS } from './reviews'

export type { BlogPost, Block, FaqItem, PlannedPost } from '../../types/blog'

const ALL_POSTS: BlogPost[] = [
  ...GUIDE_POSTS,
  ...COMPARISON_POSTS,
  ...REVIEW_POSTS,
]

// Original publication order — auto-generated from the pre-split lib/blog.ts.
// Keeping this preserves `posts[0]` = featured post, sitemap ordering,
// blog index card ordering, and search-index ordering.
const ORDERED_SLUGS: string[] = [
  "what-is-an-ai-companion",
  "how-ai-companion-memory-works",
  "ai-companion-privacy-checklist",
  "ai-companion-vs-chatbot-vs-assistant",
  "ai-companion-features-2026",
  "character-consistency-in-ai-companions",
  "how-to-choose-an-ai-girlfriend",
  "what-is-an-ai-girlfriend",
  "ai-sexting-guide-2026",
  "best-ai-boyfriend-apps-2026",
  "ai-roleplay-guide-2026",
  "grok-ani-review-2026",
  "grok-companions-vs-candy-ai-vs-nomi-2026",
  "best-ai-sexting-apps-2026",
  "uncensored-ai-image-generators-2026",
  "herahaven-vs-lurvessa-vs-kupid-ai-2026",
  "nomi-ai-review-2026",
  "ki-freundin-apps-2026",
  "free-ai-girlfriend-sites-2026",
  "best-ai-boyfriend-apps-for-women-2026",
  "ai-companion-age-verification-2026",
  "best-ai-porn-generators-2026",
  "best-undress-ai-apps-2026",
  "candy-ai-alternatives-2026",
  "character-ai-nsfw-alternatives-2026",
  "janitor-ai-alternatives-2026",
  "replika-alternatives-uncensored-2026",
  "best-nsfw-ai-chatbots-2026",
  "free-nsfw-ai-chat-2026"
]

const BY_SLUG: Record<string, BlogPost> = Object.fromEntries(ALL_POSTS.map((p) => [p.slug, p]))
const POSTS: BlogPost[] = ORDERED_SLUGS
  .map((s) => BY_SLUG[s])
  .filter((p): p is BlogPost => !!p)


// ─── The 50-topic pipeline ────────────────────────────────────────
// Published articles above become part of `posts`. Everything below is
// a scaffold record — real headline + slug + category — that appears in
// the internal editorial pipeline but not in the public blog index or
// sitemap. When one is written, delete the record here and add it to POSTS.
export const PLANNED_POSTS: PlannedPost[] = [
  { slug: 'how-do-ai-girlfriend-apps-work',       title: 'How Do AI Girlfriend Apps Work?',                   description: 'Under the hood of AI girlfriend apps — models, memory, image generation, and where the current bottlenecks are.', category: 'Explainer', keywords: ['how AI girlfriend apps work', 'AI girlfriend technology'] },
  { slug: 'how-ai-girlfriend-images-are-generated', title: 'How AI Girlfriend Images Are Generated',           description: 'A plain-English explanation of the diffusion models and character-consistency techniques behind AI girlfriend images.', category: 'Explainer', keywords: ['AI girlfriend images', 'AI image generation'] },
  { slug: 'how-ai-companion-voice-works',         title: 'How AI Companion Voice Works',                      description: 'From text to speech to real-time voice calls — how modern AI companion voice systems actually work.', category: 'Explainer', keywords: ['AI companion voice', 'AI voice chat'] },
  { slug: 'how-ai-companion-video-works',         title: 'How AI Companion Video Works',                      description: 'Video generation in AI companion apps — what works today, what is still early, and what to expect in 2026-2027.', category: 'Explainer', keywords: ['AI companion video', 'AI generated video'] },
  { slug: 'what-is-an-ai-character-creator',      title: 'What Is an AI Character Creator?',                  description: 'AI character creators explained — what they let you tune, why persona depth matters, and which apps have the best one.', category: 'Explainer', keywords: ['AI character creator', 'custom AI companion'] },
  { slug: 'how-to-create-your-own-ai-girlfriend', title: 'How to Create Your Own AI Girlfriend',              description: 'A step-by-step walkthrough of creating a custom AI girlfriend character on the leading platforms in 2026.', category: 'Guide',     keywords: ['create AI girlfriend', 'custom AI companion character'] },
  { slug: 'best-ai-girlfriend-with-image-generation', title: 'Best AI Girlfriend With Image Generation',      description: 'AI girlfriend apps with the strongest image generation — ranked on quality and same-character consistency.', category: 'Guide', keywords: ['AI girlfriend images', 'best AI companion for images'] },
  { slug: 'best-ai-girlfriend-with-video',        title: 'Best AI Girlfriend With Video',                     description: 'The best AI girlfriend apps for video generation in 2026. Video is early — we are honest about that.', category: 'Guide',     keywords: ['AI girlfriend video', 'best AI companion for video'] },
  { slug: 'best-ai-girlfriend-with-voice',        title: 'Best AI Girlfriend With Voice',                     description: 'AI girlfriend apps with voice replies and calls, ranked by voice quality and latency.', category: 'Guide',     keywords: ['AI girlfriend voice', 'AI voice calls'] },
  { slug: 'best-ai-companion-with-memory',        title: 'Best AI Companion With Memory',                     description: 'AI companion apps ranked by long-term memory depth — which platforms actually remember you.', category: 'Guide',     keywords: ['AI companion memory', 'AI that remembers'] },
  { slug: 'ai-girlfriend-vs-chatbot',             title: 'AI Girlfriend vs Chatbot — What is the Difference?',description: 'AI girlfriend vs chatbot — persistent persona, long-term memory, and multi-modal presence are the real differences.', category: 'Comparison', keywords: ['AI girlfriend vs chatbot', 'chatbot vs companion'] },
  { slug: 'ai-companion-vs-virtual-assistant',    title: 'AI Companion vs Virtual Assistant',                 description: 'AI companion vs virtual assistant — why one is built to remember you and the other is built to forget.', category: 'Comparison', keywords: ['AI companion vs assistant', 'AI companion vs Alexa'] },
  { slug: 'can-ai-girlfriends-generate-images',   title: 'Can AI Girlfriends Generate Images?',               description: 'Yes — most modern AI girlfriend apps generate images. Here is what to expect and where the current limits are.', category: 'Explainer', keywords: ['AI girlfriend images', 'can AI companions generate images'] },
  { slug: 'can-ai-companions-generate-videos',    title: 'Can AI Companions Generate Videos?',                description: 'AI companion video generation in 2026 — the current state, what works, and what still does not.', category: 'Explainer', keywords: ['AI companion video', 'can AI make video'] },
  { slug: 'can-ai-companions-make-voice-calls',   title: 'Can AI Companions Make Voice Calls?',               description: 'Real-time voice calls with AI companions — which platforms support them and how well they actually work.', category: 'Explainer', keywords: ['AI voice call', 'AI companion phone call'] },
  { slug: 'most-realistic-ai-girlfriend',         title: 'What Is the Most Realistic AI Girlfriend in 2026?', description: 'Realism in AI girlfriends is multi-dimensional — image, voice, memory, character. Here is which apps lead each.', category: 'Guide', keywords: ['most realistic AI girlfriend', 'realistic AI companion'] },
  { slug: 'what-makes-an-ai-companion-feel-real', title: 'What Makes an AI Companion Feel Real?',             description: 'Beyond the surface — the design choices that make one AI companion feel present and another feel scripted.', category: 'Explainer', keywords: ['AI companion feels real', 'realistic AI companion'] },
  { slug: 'how-to-choose-an-ai-companion',        title: 'How to Choose an AI Companion',                     description: 'A decision framework for choosing an AI companion in 2026 — same shape as our AI girlfriend guide, wider category.', category: 'Guide', keywords: ['how to choose AI companion', 'AI companion buyer guide'] },
  { slug: 'what-should-you-look-for-in-an-ai-companion', title: 'What Should You Look for in an AI Companion?', description: 'The eight things that separate a great AI companion app from a mediocre one.', category: 'Guide', keywords: ['what to look for in AI companion', 'AI companion features'] },
  { slug: 'are-ai-companions-private',            title: 'Are AI Companions Private?',                        description: 'The privacy state of the AI companion category — what each platform stores, what it does with it, and what to avoid sharing.', category: 'Privacy & Safety', keywords: ['AI companion privacy', 'is AI girlfriend private'] },
  { slug: 'what-data-do-ai-companion-apps-collect', title: 'What Data Do AI Companion Apps Collect?',         description: 'An honest look at the data AI companion apps collect — and which ones are transparent about it.', category: 'Privacy & Safety', keywords: ['AI companion data', 'AI girlfriend data collection'] },
  { slug: 'ai-companion-memory-test',             title: 'AI Companion Memory Test',                          description: 'Head-to-head lab test of long-term memory across the leading AI companion apps. Objective: does it actually remember?', category: 'Trends', keywords: ['AI memory test', 'AI companion memory'] },
  { slug: 'ai-girlfriend-image-consistency-test', title: 'AI Girlfriend Image Consistency Test',              description: 'Fifty generations per character across the leading AI girlfriend apps — which platforms hold the same face?', category: 'Trends', keywords: ['AI image consistency', 'character consistency test'] },
  { slug: 'ai-companion-video-quality-test',      title: 'AI Companion Video Quality Test',                   description: 'Video generation stress test across the leading AI companion platforms — motion, consistency, prompt adherence.', category: 'Trends', keywords: ['AI companion video test', 'AI video quality'] },
  { slug: 'ai-companion-voice-quality-test',      title: 'AI Companion Voice Quality Test',                   description: 'Voice reply and voice call quality tested across the leading AI companion platforms.', category: 'Trends', keywords: ['AI voice test', 'AI companion voice quality'] },
  { slug: 'secret-desires-review-2026',           title: 'Secret Desires Review 2026',                        description: 'Full hands-on Secret Desires review for 2026 — features, pricing, image, voice, memory, verdict.', category: 'Reviews', keywords: ['Secret Desires review', 'Secret Desires 2026'] },
  { slug: 'candy-ai-review-2026',                 title: 'Candy AI Review 2026',                              description: 'Candy AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['Candy AI review', 'Candy AI 2026'] },
  { slug: 'dreamgf-review-2026',                  title: 'DreamGF Review 2026',                               description: 'DreamGF review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['DreamGF review', 'DreamGF 2026'] },
  { slug: 'crushon-ai-review-2026',               title: 'CrushOn AI Review 2026',                            description: 'CrushOn AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['CrushOn AI review'] },
  { slug: 'ourdream-ai-review-2026',              title: 'OurDream AI Review 2026',                           description: 'OurDream AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['OurDream review'] },
  { slug: 'secret-desires-vs-candy-ai',           title: 'Secret Desires vs Candy AI 2026',                   description: 'Head-to-head between Secret Desires and Candy AI — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs Candy AI'] },
  { slug: 'secret-desires-vs-dreamgf',            title: 'Secret Desires vs DreamGF 2026',                    description: 'Head-to-head between Secret Desires and DreamGF — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs DreamGF'] },
  { slug: 'secret-desires-vs-nomi',               title: 'Secret Desires vs Nomi 2026',                       description: 'Head-to-head between Secret Desires and Nomi — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs Nomi'] },
  { slug: 'secret-desires-vs-crushon',            title: 'Secret Desires vs CrushOn AI',                      description: 'Secret Desires vs CrushOn AI — pending our full comparison.', category: 'Comparison', keywords: ['Secret Desires vs CrushOn'] },
  { slug: 'candy-ai-alternatives',                title: 'Candy AI Alternatives',                             description: 'Genuine Candy AI alternatives — with reasons, not just our top pick.', category: 'Guide', keywords: ['Candy AI alternatives'] },
  { slug: 'dreamgf-alternatives',                 title: 'DreamGF Alternatives',                              description: 'Genuine DreamGF alternatives — with reasons.', category: 'Guide', keywords: ['DreamGF alternatives'] },
  { slug: 'nomi-alternatives',                    title: 'Nomi Alternatives',                                 description: 'Genuine Nomi alternatives — with reasons.', category: 'Guide', keywords: ['Nomi alternatives'] },
  { slug: 'best-ai-companion-platforms-for-custom-characters', title: 'Best AI Companion Platforms for Custom Characters', description: 'Which platforms let you actually build a custom AI companion character from scratch.', category: 'Guide', keywords: ['custom AI companion', 'best AI character creator'] },
  { slug: 'best-ai-companion-for-roleplay',       title: 'Best AI Companion for Roleplay',                    description: 'AI companion apps ranked for roleplay — scenario depth, character consistency and content latitude.', category: 'Guide', keywords: ['AI roleplay', 'best AI companion roleplay'] },
  { slug: 'best-ai-companion-for-long-term-use',  title: 'Best AI Companion for Long-Term Use',               description: 'Which AI companion apps actually hold up over months of daily use — the memory and consistency you need for the long haul.', category: 'Guide', keywords: ['long term AI companion', 'AI companion memory'] },
  { slug: 'best-ai-girlfriend-mobile-app',        title: 'Best AI Girlfriend Mobile App',                     description: 'AI girlfriend apps ranked specifically for the mobile experience — where mobile UX makes or breaks daily use.', category: 'Guide', keywords: ['AI girlfriend mobile app'] },
  { slug: 'ai-companion-industry-trends-2026',    title: 'AI Companion Industry Trends 2026',                 description: 'The state of the AI companion category in 2026 — what changed, what is coming, and where the whole thing is heading.', category: 'Trends', keywords: ['AI companion trends', 'AI companion industry 2026'] },
]

// Only published posts appear in the public index / sitemap / detail routes.
export const posts = POSTS.filter((p) => (p.status ?? 'published') === 'published')

export const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPost(slug)
  if (!post) return []
  return post.related
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => !!p)
    .slice(0, limit)
}

