import type { MetadataRoute } from 'next'
import { characters } from '@/lib/characters'
import { posts } from '@/lib/blog'
import { REVIEWS } from '@/lib/reviews'
import { COMPARISONS } from '@/lib/comparisons'
import { CHARACTER_CATEGORIES } from '@/lib/character-categories'
import { ALTERNATIVES } from '@/lib/alternatives'
import { AUTHORS } from '@/lib/authors'
import { SITE } from '@/lib/site'

// Single sitemap.xml (Next.js only supports one for this file). Sub-splits
// (sitemap-characters, etc.) are TODO; the current volume comfortably fits
// under Google's 50k-URL limit so one file is correct.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`,                       lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${SITE.url}/blog/`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/characters/`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/reviews/`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE.url}/comparisons/`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/alternatives/`,          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Hubs
    { url: `${SITE.url}/ai-girlfriends/`,        lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/ai-boyfriends/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/anime-ai-companions/`,   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/ai-companions/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/ai-characters/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/ai-girlfriend-images/`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE.url}/ai-companion-images/`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${SITE.url}/ai-girlfriend-videos/`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/ai-companion-videos/`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Lab / Research / Guides landing pages
    { url: `${SITE.url}/lab/`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/research/`,              lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE.url}/guides/`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },

    // Best-of pages
    { url: `${SITE.url}/best-ai-girlfriends/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/best-ai-companions/`,                lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/best-ai-girlfriend-apps/`,           lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/best-ai-girlfriend-for-images/`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/best-ai-girlfriend-for-video/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/best-ai-girlfriend-for-voice/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/best-ai-companion-for-memory/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/best-ai-character-creator/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Author pages — E-E-A-T anchors
    { url: `${SITE.url}/authors/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Trust pages
    { url: `${SITE.url}/about/`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE.url}/editorial-policy/`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${SITE.url}/methodology/`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE.url}/affiliate-disclosure/`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${SITE.url}/contact/`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${SITE.url}/privacy/`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE.url}/terms/`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE.url}/18-plus/`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE.url}/corrections/`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const chars: MetadataRoute.Sitemap = characters.map((c) => ({
    url: `${SITE.url}/characters/${c.slug}/`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.8,
  }))

  const charCats: MetadataRoute.Sitemap = CHARACTER_CATEGORIES.map((c) => ({
    url: `${SITE.url}/characters/${c.slug}/`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.7,
  }))

  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}/`,
    lastModified: p.date, changeFrequency: 'monthly', priority: 0.85,
  }))

  const reviews: MetadataRoute.Sitemap = REVIEWS.map((r) => ({
    url: `${SITE.url}/reviews/${r.slug}/`,
    lastModified: r.lastUpdated || now,
    changeFrequency: 'monthly',
    priority: r.status === 'published' ? 0.85 : 0.5,
  }))

  const comps: MetadataRoute.Sitemap = COMPARISONS.map((c) => ({
    url: `${SITE.url}/comparisons/${c.slug}/`,
    lastModified: c.lastUpdated || now, changeFrequency: 'monthly', priority: 0.8,
  }))

  const alts: MetadataRoute.Sitemap = ALTERNATIVES.map((a) => ({
    url: `${SITE.url}/alternatives/${a.slug}/`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.7,
  }))

  const authorPages: MetadataRoute.Sitemap = Object.values(AUTHORS).map((a) => ({
    url: `${SITE.url}/authors/${a.slug}/`,
    lastModified: now, changeFrequency: 'monthly', priority: 0.6,
  }))

  return [...staticPages, ...chars, ...charCats, ...blog, ...reviews, ...comps, ...alts, ...authorPages]
}
