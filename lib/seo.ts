// Central SEO + JSON-LD helpers.
// Every route imports pageMetadata() / breadcrumbLd() / articleLd() etc. so we
// have exactly one source of truth for canonical URLs, OG images, schema, etc.

import type { Metadata } from 'next'
import { SITE } from './site'

// Auto-generated at build time by app/opengraph-image.tsx (next/og ImageResponse).
// Next serves it at /opengraph-image.png and auto-injects <meta og:image> on any
// route that doesn't override — kept as the fallback here for blog posts and
// other pages that go through pageMetadata().
const DEFAULT_OG = '/opengraph-image.png'

// Absolute URL builder. Accepts a path (with or without leading slash) and
// always emits `${SITE.url}/<path>/`. Trailing slash is enforced for
// canonical consistency (matches Next's default output for static routes).
export function absoluteUrl(path: string): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '')
  return clean ? `${SITE.url}/${clean}/` : `${SITE.url}/`
}

export type PageMetaInput = {
  title: string
  description: string
  path: string            // e.g. "/reviews/secret-desires"
  image?: string          // absolute or root-relative
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path)
  const image = input.image
    ? input.image.startsWith('http') ? input.image : `${SITE.url}${input.image.startsWith('/') ? '' : '/'}${input.image}`
    : `${SITE.url}${DEFAULT_OG}`

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: input.type ?? 'website',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  }
}

// ─── JSON-LD helpers ────────────────────────────────────────────────

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logos/secret-desires.svg`, // TODO: replace with dedicated brand mark
    description: SITE.descriptionLong,
    // sameAs strengthens the entity graph: Google + LLMs use this to link
    // this Organization to its official presence on other platforms. Only
    // include profiles we actually control — pointing at unclaimed handles
    // can pollute the entity graph or worse, credit someone else's profile.
    sameAs: [
      'https://twitter.com/aicompanionslabs',
    ],
  }
}

// Person schema for author bylines. Passed into reviewLd/articleLd so we get
// real Person authorship (E-E-A-T) instead of a generic Organization author.
export function personLd(author: {
  name: string
  slug: string
  jobTitle: string
  bio: string
  sameAs?: string[]
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: absoluteUrl(`/authors/${author.slug}`),
    jobTitle: author.jobTitle,
    description: author.bio,
    ...(author.image && { image: `${SITE.url}${author.image.startsWith('/') ? '' : '/'}${author.image}` }),
    ...(author.sameAs?.length && { sameAs: author.sameAs }),
    worksFor: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.descriptionLong,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export type Crumb = { name: string; path: string }

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export type AuthorRef = {
  name: string
  slug: string          // maps to /authors/<slug>
  jobTitle?: string
}

// Build the Article/Review `author` node from an AuthorRef (Person) or a
// plain string (Organization). Google prefers Person authorship for E-E-A-T.
function authorNode(author?: AuthorRef | string) {
  if (!author) {
    return { '@type': 'Organization', name: 'AI Companions Labs Editorial Team' }
  }
  if (typeof author === 'string') {
    return { '@type': 'Organization', name: author }
  }
  return {
    '@type': 'Person',
    name: author.name,
    url: absoluteUrl(`/authors/${author.slug}`),
    ...(author.jobTitle && { jobTitle: author.jobTitle }),
  }
}

export function articleLd(input: {
  headline: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: AuthorRef | string
}) {
  const url = absoluteUrl(input.path)
  // Always emit an `image` — falls back to the default OG image so Article
  // rich-result eligibility is never blocked by missing this required field.
  const image = input.image
    ? (input.image.startsWith('http') ? input.image : `${SITE.url}${input.image}`)
    : `${SITE.url}${DEFAULT_OG}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: url,
    url,
    image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    author: authorNode(input.author),
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}${DEFAULT_OG}`, width: 1200, height: 630 },
    },
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function reviewLd(input: {
  itemName: string
  itemUrl?: string
  reviewBody: string
  ratingValue?: number   // omit for un-tested platforms — never fabricate
  bestRating?: number
  worstRating?: number
  reviewer?: AuthorRef | string
  datePublished?: string
}) {
  const bestRating = input.bestRating ?? 10
  const worstRating = input.worstRating ?? 1
  // Strip affiliate query params from the canonical `url` — schema URLs must
  // point to the clean product page. Affiliate tracking belongs in <a href>.
  const cleanItemUrl = input.itemUrl?.split('?')[0].split('#')[0]
  const itemReviewed: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    name: input.itemName,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Web',
    ...(cleanItemUrl && { url: cleanItemUrl }),
  }
  // AggregateRating on the SoftwareApplication lets Google show star ratings
  // in Product/Software rich results. We have one editorial rating so
  // ratingCount is 1 — accurate, not inflated.
  if (input.ratingValue != null) {
    itemReviewed.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue,
      bestRating,
      worstRating,
      ratingCount: 1,
    }
  }
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed,
    reviewBody: input.reviewBody,
    author: authorNode(input.reviewer),
    ...(input.datePublished && { datePublished: input.datePublished }),
  }
  if (input.ratingValue != null) {
    base.reviewRating = {
      '@type': 'Rating',
      ratingValue: input.ratingValue,
      bestRating,
      worstRating,
    }
  }
  return base
}

// ItemList schema — for comparison pages and hub pages that enumerate a
// finite set of products/platforms. Helps Google understand the page is a
// ranked or curated list, which can qualify for list-style rich results.
export function itemListLd(input: {
  name: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    itemListElement: input.items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: it.name,
        url: it.url,
        applicationCategory: 'EntertainmentApplication',
        ...(it.description && { description: it.description }),
      },
    })),
  }
}
