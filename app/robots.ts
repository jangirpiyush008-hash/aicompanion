import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Allow all crawlers; only block internal search / query-parameter noise.
// Named AI-crawler stanzas below explicitly welcome Google AI Overviews,
// ChatGPT/SearchGPT, Perplexity, Claude and Bing Copilot — an unambiguous
// permission signal is a documented ranking input for those surfaces.
export default function robots(): MetadataRoute.Robots {
  const commonDisallow = ['/api/', '/_next/', '/*?q=*', '/*?ref=*', '/*?utm_*']
  return {
    rules: [
      { userAgent: '*',              allow: '/', disallow: commonDisallow },
      { userAgent: 'GPTBot',         allow: '/', disallow: commonDisallow },
      { userAgent: 'OAI-SearchBot',  allow: '/', disallow: commonDisallow },
      { userAgent: 'ChatGPT-User',   allow: '/', disallow: commonDisallow },
      { userAgent: 'Google-Extended',allow: '/', disallow: commonDisallow },
      { userAgent: 'PerplexityBot',  allow: '/', disallow: commonDisallow },
      { userAgent: 'ClaudeBot',      allow: '/', disallow: commonDisallow },
      { userAgent: 'anthropic-ai',   allow: '/', disallow: commonDisallow },
      { userAgent: 'CCBot',          allow: '/', disallow: commonDisallow },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: commonDisallow },
      { userAgent: 'Bingbot',        allow: '/', disallow: commonDisallow },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
