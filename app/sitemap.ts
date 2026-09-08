import type { MetadataRoute } from 'next'
import { characters } from '@/lib/characters'
import { posts } from '@/lib/blog'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`,      lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${SITE.url}/blog/`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ]

  const chars: MetadataRoute.Sitemap = characters.map((c) => ({
    url: `${SITE.url}/characters/${c.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blog: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}/`,
    lastModified: p.date,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  return [...staticPages, ...chars, ...blog]
}
