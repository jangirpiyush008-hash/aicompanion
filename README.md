# AI Companions Labs

18+ AI companion discovery / review / affiliate site. Built from the
`design_handoff_aicompanionslabs` bundle (Home + Character-Karley design references).

**Stack:** Next.js 15 App Router · TypeScript · Tailwind CSS · Google Fonts (Playfair Display + Manrope).

## Requirements
- Node **20.x**

## Setup

```bash
npm install
cp .env.example .env.local  # set NEXT_PUBLIC_SITE_URL + affiliate link
npm run dev                 # http://localhost:4200
```

## Scripts

```bash
npm run dev     # dev server on :4200
npm run build   # production build
npm start       # serve production build on $PORT (default 8080)
```

## Environment variables

```
NEXT_PUBLIC_SITE_URL=https://aicompanionslabs.com
NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL=https://your-secret-desires-affiliate-link
```

Both are baked into the build at compile time (`NEXT_PUBLIC_*` convention). Set
them in whatever hosting environment you deploy to.

## Routes

```
/                                Home
/characters/<slug>/              Character detail (statically generated)
/sitemap.xml                     Auto-generated
/robots.txt                      Auto-generated
```

Character slugs currently live (seed 7): `karley`, `aj-parker`, `ami-tan`,
`barbs-pappas`, `nellie-cronen`, `rebecca`, `tiffany`.

## Adding a character

1. Drop images into `public/characters/<slug>/1.webp, 2.webp, 3.webp, …`
2. Append an entry to `CHARACTERS` in `lib/characters.ts` (see the existing
   entries — `slug`, `name`, `tags`, `subtitle`, `about`, `traits`, `gallery`, `seo`)
3. Rebuild — the character page is statically generated and the sitemap
   picks it up automatically.

Architecture scales to 40–50+ characters. When the list gets long, move
`CHARACTERS` into a headless CMS (Sanity, Contentlayer, Payload) — the render
code stays the same.

## Compliance rules baked into the build

- **Age gate** on every route (localStorage `acp_age_ok`). "Exit" redirects to
  google.com. Denied by default until acknowledged.
- Every character presented as a **fictional AI-generated adult**. Alt text and
  captions carry the "AI-generated character" disclosure.
- `<meta name="rating" content="adult">` + RTA label in the site head, so
  SafeSearch / family filters can respect the site's intended audience.
- **Never fabricate reviews / scores / pricing.** Platforms without a
  hands-on-test result display `"Score pending hands-on test"` — see
  `lib/site.ts` → `PLATFORMS`.
- **Affiliate disclosure** in the homepage FAQ intro + footer.
- All Secret Desires CTAs resolve from `SECRET_DESIRES_AFFILIATE_URL` — never
  hard-coded elsewhere. Outbound uses `rel="sponsored noopener nofollow"` +
  `target="_blank"`.

## Google Ads reality check

**Google Ads (and Google AdSense) will not approve this site** regardless of
how compliant the design is — this is a category-level restriction on adult
companion content, not something fixable with disclaimers.

If ad-network monetization is part of the plan, use adult-friendly networks
(TrafficJunky, ExoClick, JuicyAds) rather than Google Ads / AdSense. Otherwise
rely on SEO + the Secret Desires affiliate program as the primary revenue
channel.

## Deploy

### Vercel (Next.js native)
- Import repo → framework auto-detected as Next.js
- Add env vars `NEXT_PUBLIC_SITE_URL` + `NEXT_PUBLIC_SECRET_DESIRES_AFFILIATE_URL`
- Deploy

### Any Node host
- Build: `npm run build`
- Start: `npm start` (respects `$PORT`, defaults to 8080)

### AWS Amplify Hosting
- Framework: Next.js (SSR)
- Build command: `npm run build`
- Add env vars in the Amplify console
- Amplify's Next.js runtime handles SSR/ISR out of the box
