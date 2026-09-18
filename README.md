# AI Companions Labs

18+ AI companion discovery, review, and affiliate platform. Original
AI-generated characters, honest hands-on reviews, comparisons, and lab tests.

**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS · Static
generation (no runtime DB). Deploys as a single Next.js app to Railway or
any Node host.

## Requirements
- Node **20.x**

## Local dev

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL + affiliate link
npm run dev                  # http://localhost:4200
```

## Scripts

```bash
npm run dev        # dev server on :4200
npm run build      # production build (also generates sitemap/robots)
npm run start      # serve production build on $PORT (default 8080)
npm run indexnow   # submit URLs to Bing/IndexNow (post-deploy hook)
```

## Environment variables

See [`.env.example`](.env.example) for the full list.

- `NEXT_PUBLIC_SITE_URL` — production origin (used for canonical URLs,
  sitemap, OG images).
- `NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL` — affiliate URL for every
  Secret Desires CTA. The site has a hard-coded fallback so it builds
  without any env vars, but always set this in production to make link
  rotation possible without a code deploy.

Both are baked into the build at compile time (`NEXT_PUBLIC_*` convention).

## Deploy (Railway)

Railway auto-deploys the `main` branch. `npm run build` runs on push;
`npm run start` runs the container. Set env vars in the Railway service
before the first deploy.

## Project structure

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the full folder map. Quick
overview:

```
app/          Next.js App Router pages (30 routes)
components/   UI (grouped by ui / layout / features / cta)
lib/
  data/       Content collections (blog posts, characters, reviews, ...)
  types/      Shared TypeScript types
  utils/      Small helpers (affiliate URL builder, etc.)
  constants/  Route constants
  config/     Site config barrel
  site.ts     Nav + platforms + FAQ + affiliate constant (source of truth)
  seo.ts      Metadata + JSON-LD helpers
public/       Character galleries + review hero images (WebP)
scripts/      Post-build tasks (IndexNow ping, etc.)
```

## Adding content

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for step-by-step guides to add a
blog post, character, review, or comparison.

## Compliance rules baked into the build

- **Age gate** on every route (localStorage `acp_age_ok`). "Exit" redirects
  to google.com. Denied by default until acknowledged.
- Every character presented as a **fictional AI-generated adult**. Alt text
  and captions carry the "AI-generated character" disclosure.
- `<meta name="rating" content="adult">` + RTA label in the site head, so
  SafeSearch / family filters can respect the site's intended audience.
- **Never fabricate reviews / scores / pricing.** Platforms without a
  hands-on-test result display "Score pending hands-on test" — see
  `lib/site.ts` → `PLATFORMS` and `lib/data/reviews.ts`.
- **Affiliate disclosure** in the homepage FAQ intro + footer.
- All Secret Desires CTAs resolve from `SECRET_DESIRES_AFFILIATE_URL` (via
  `lib/utils/affiliate.ts` helpers) — never hard-coded elsewhere. Outbound
  uses `rel="sponsored noopener nofollow"` + `target="_blank"`.

## Google Ads reality check

**Google Ads (and Google AdSense) will not approve this site** regardless
of how compliant the design is — this is a category-level restriction on
adult companion content, not something fixable with disclaimers.

Use adult-friendly networks (TrafficJunky, ExoClick, JuicyAds) if you need
display ads. Otherwise rely on SEO + the Secret Desires affiliate program
as the primary revenue channel.
