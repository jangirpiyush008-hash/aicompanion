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
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/?q={search_term_string}`,
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

export function articleLd(input: {
  headline: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
}) {
  const url = absoluteUrl(input.path)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: url,
    url,
    ...(input.image && { image: input.image.startsWith('http') ? input.image : `${SITE.url}${input.image}` }),
    ...(input.datePublished && { datePublished: input.datePublished }),
    ...(input.dateModified && { dateModified: input.dateModified }),
    author: {
      '@type': 'Organization',
      name: input.authorName ?? 'AI Companions Labs Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
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
  reviewerName?: string
  datePublished?: string
}) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: input.itemName,
      applicationCategory: 'EntertainmentApplication',
      ...(input.itemUrl && { url: input.itemUrl }),
    },
    reviewBody: input.reviewBody,
    author: {
      '@type': 'Organization',
      name: input.reviewerName ?? 'AI Companions Labs Editorial Team',
    },
    ...(input.datePublished && { datePublished: input.datePublished }),
  }
  if (input.ratingValue != null) {
    base.reviewRating = {
      '@type': 'Rating',
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 10,
    }
  }
  return base
}
