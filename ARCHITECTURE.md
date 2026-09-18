# Architecture

A living map of how AI Companions Labs is organized, what lives where, and
why. Update this doc whenever the folder layout changes materially.

## Folder map

```
app/                             Next.js App Router pages (30 routes)
  layout.tsx                     Root layout — nav/footer wrapper injected per-page
  page.tsx                       Homepage
  characters/[slug]/page.tsx     Character detail (SSG)
  blog/[slug]/page.tsx           Blog post detail (SSG)
  reviews/[slug]/page.tsx        Review detail (SSG)
  comparisons/[slug]/page.tsx    Comparison detail (SSG)
  alternatives/[slug]/page.tsx   Alternatives page (SSG)
  sitemap.ts                     Generates /sitemap.xml
  robots.ts                      Generates /robots.txt
  opengraph-image.tsx            Default OG image
  ... hub pages (ai-girlfriends, ai-boyfriends, ai-companion-images, etc.)

components/
  ui/                            Pure primitives (no domain knowledge)
    JsonLd.tsx                     Injects <script type="application/ld+json">
  layout/                        Site chrome — appears on multiple pages
    Nav.tsx
    Footer.tsx
    PageLayout.tsx               Standard page wrapper
    Breadcrumbs.tsx
    FloatingBackground.tsx
    AgeGate.tsx                  18+ interstitial
  features/                      Domain UI, grouped by feature
    character/
      CharacterGallery.tsx
      HeroShowcase.tsx
      CategoryIcon.tsx
    blog/
      AuthorByline.tsx
    review/
      ReviewHero.tsx
      RelatedReviews.tsx
    hub/
      HubPage.tsx                Reusable hub template
      ImageHubGrid.tsx
      BestOfPage.tsx
  cta/                           Conversion surfaces
    SecretDesiresCTA.tsx
    SDAIShowcase.tsx
    MobileStickyCTA.tsx

lib/
  data/                          Content collections — the source of truth
    blog/
      guides.ts                    Guide + Explainer + Trends + Privacy posts
      comparisons.ts               Comparison-category posts
      reviews.ts                   Review-category posts
      index.ts                     Aggregates buckets + preserves publication order
    characters.ts
    reviews.ts
    comparisons.ts
    alternatives.ts
    authors.ts
    character-categories.ts
  types/                         Shared TypeScript types
    blog.ts
    character.ts
    review.ts
    comparison.ts
  utils/
    affiliate.ts                 sdaiHref() + sdaiProfileHref() builders
  constants/
    routes.ts                    Internal route constants + helpers
  config/
    site.ts                      Barrel re-export of lib/site.ts
  site.ts                        Nav + platforms + FAQ + affiliate constants
  seo.ts                         pageMetadata() + JSON-LD helpers
  search-index.ts                Search page index generator
  alternatives.ts                Compat re-export → data/alternatives.ts
  authors.ts                     Compat re-export → data/authors.ts
  blog.ts                        Compat re-export → data/blog/
  character-categories.ts        Compat re-export → data/character-categories.ts
  characters.ts                  Compat re-export → data/characters.ts
  comparisons.ts                 Compat re-export → data/comparisons.ts
  reviews.ts                     Compat re-export → data/reviews.ts

public/                          Static assets (WebP images, favicons)
scripts/
  indexnow-ping.mjs              Post-deploy: submit URLs to Bing/IndexNow
```

The compat re-exports in `lib/*.ts` exist because pages/components still
import via the historical paths (`@/lib/characters`, `@/lib/blog`, ...).
New code should import from `@/lib/data/...` directly. The compat shims
are safe to remove once every consumer is migrated.

## Data flow

```
lib/data/*  ──►  app/**/page.tsx  ──►  components/features/**
                     │
                     └──►  lib/seo.ts (metadata, JSON-LD)
```

Pages are the composition layer. Data is loaded from `lib/data/*`,
metadata + JSON-LD are built via `lib/seo.ts`, and layout comes from
`components/layout/PageLayout.tsx`. Feature components handle the
content-specific rendering (character galleries, review score tables, blog
Block rendering, etc.).

There is no runtime database, no ISR, no on-demand generation. Every
route is statically pre-rendered at build time. Adding a piece of content
= edit a `lib/data/*` file + rebuild.

## Affiliate architecture

Every Secret Desires link on the site MUST come from one of two central
sources. Never hard-code the URL in a component or a piece of content.

1. **`SECRET_DESIRES_AFFILIATE_URL`** (in `lib/site.ts`) — the canonical
   affiliate URL. Reads from `NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL`
   env var with a hard-coded fallback so the site builds without env.
   Used directly by top-level CTAs (Nav, mobile sticky, homepage hero).

2. **`sdaiHref(options?)` + `sdaiProfileHref(profileId)`** (in
   `lib/utils/affiliate.ts`) — helpers built on top of the constant.
   - `sdaiHref()` — no args, returns the base affiliate URL (drop-in
     replacement for the constant).
   - `sdaiHref({ profile, subId })` — appends `&profile=` / `&sub_id=`
     for per-page attribution.
   - `sdaiProfileHref('agnieszka-kolczyk-OwrmCw')` — builds a character
     profile deep link. Profile IDs are opaque and come from Secret
     Desires (they are not derivable from the site's own character slug).

Blog markdown links use `` `${SECRET_DESIRES_AFFILIATE_URL}` `` template
interpolation inside `text:` fields — the string is a template literal so
env override still propagates.

### Why the indirection?
- Env override for staging / A-B testing without a code deploy.
- Grep-able audit: `grep saddam-299148` should only match the constants
  and the two helpers. Everything else routes through them.
- Rotating the affiliate URL becomes a one-line change.

## SEO architecture

- **Per-page metadata**: `pageMetadata({ title, description, path })` in
  `lib/seo.ts`. Every page exports `metadata` — no default fallback.
- **JSON-LD**: `articleLd()`, `breadcrumbLd()`, `faqLd()`, `productLd()`,
  `websiteLd()`, `personLd()` helpers. Pages pass `jsonLd={[...]}` to
  `PageLayout` and it renders via `components/ui/JsonLd.tsx`.
- **Canonical URLs**: derived from `SITE.url` + path. All URLs render
  with trailing slash.
- **Sitemap**: `app/sitemap.ts` — enumerates static routes + iterates
  every `posts` / `characters` / `REVIEWS` / `COMPARISONS` / `ALTERNATIVES`
  collection.
- **Robots**: `app/robots.ts` — allows everything; sitemap link.
- **OG image**: `app/opengraph-image.tsx` (default) + per-page overrides
  where warranted.
- **Compliance meta**: `<meta name="rating" content="adult">` + RTA label
  in root layout so SafeSearch respects adult flag.

## Route groups

None currently. If you add one (e.g. `app/(marketing)/`), the group name
in parens does NOT leak into the URL — that's the point of route groups.
Verify by checking `app/sitemap.ts` output before shipping.

## Static generation

Every dynamic route (`characters/[slug]`, `blog/[slug]`, `reviews/[slug]`,
etc.) exports `generateStaticParams` that returns every slug in the data
collection. The build pre-renders all of them.

There is no ISR (`revalidate`) and no runtime fetching. This keeps
hosting cheap and shifts all editorial work to build time.
