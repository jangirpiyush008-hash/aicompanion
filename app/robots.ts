import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

// Allow all crawlers; only block internal search / query-parameter noise.
// Do NOT block characters, images, video, reviews, comparisons, guides.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/*?q=*',       // internal search
          '/*?ref=*',     // affiliate/tracking params — canonical always wins,
          '/*?utm_*',     //   but block just to keep crawlers focused.
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
