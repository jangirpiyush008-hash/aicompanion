# Contributing

How to add each content type. `npm run build` **must** pass before you
commit.

---

## Add a blog post

Blog posts live in `lib/data/blog/<bucket>.ts` (`guides`, `comparisons`,
`reviews`). Pick the bucket that matches the post's category.

1. Open the appropriate file and append a `BlogPost` entry to the `POSTS`
   array. Copy an existing entry as your template.
2. Required fields: `slug`, `title`, `description`, `category`, `date`
   (ISO), `readMin`, `body` (array of `Block`), `faqs`, `keywords`,
   `related` (other post slugs), `author`.
3. Optional but recommended: `heroImage`, `quickAnswer`, `keyTakeaways`,
   `relatedCharacters`, `relatedReviews`.
4. Add your slug to `ORDERED_SLUGS` in `lib/data/blog/index.ts` — this
   controls where the post appears on the blog index (index 0 = featured).
5. For any Secret Desires link inside `text:` / `quickAnswer`, use a
   template literal:
   `` text: `Here's a [link](${SECRET_DESIRES_AFFILIATE_URL}) to try.` `` —
   import `SECRET_DESIRES_AFFILIATE_URL` at the top of the file (already
   imported in each bucket file).

The post is automatically picked up by the sitemap, blog index, and
`/blog/[slug]/` route.

---

## Add a character

1. Drop images into `public/characters/<slug>/1.webp, 2.webp, 3.webp, …`
   (WebP, portrait 3:4 recommended).
2. Append a `Character` entry to the `CHARACTERS` array in
   `lib/data/characters.ts`.
3. Required: `slug`, `name`, `tags`, `subtitle`, `about`, `traits`,
   `gallery`, `seo`. Optional: `sdaiProfileUrl` (use `sdaiProfileHref()`
   from `lib/utils/affiliate.ts`), `age`, `gender`, `relationshipStyle`,
   `visualStyle`, `videos`, `faq`.
4. Character page is statically generated at `/characters/<slug>/` and
   automatically added to the sitemap.

If the character maps to a real Secret Desires profile, get the profile ID
(e.g. `agnieszka-kolczyk-OwrmCw`) and write
`sdaiProfileUrl: sdaiProfileHref('agnieszka-kolczyk-OwrmCw')`.
**Never** hard-code the affiliate URL — use the helper.

---

## Add a review

Reviews live in `lib/data/reviews.ts`.

1. Append a `Review` entry to the `REVIEWS` array.
2. `status: 'planned'` for reviews with no hands-on test yet — the page
   renders "Score pending hands-on test" and no score number leaks.
3. `status: 'published'` requires a full `score` object hitting every
   weighted category in `METHODOLOGY_WEIGHTS`. Overall score is computed
   via `computeOverall(score)` — never hand-write it.
4. Fill `authorSlug` (must exist in `lib/data/authors.ts`), `pros`, `cons`,
   `keyFeatures`, `testingNarrative`, `faqs`, `sources`.
5. Review page renders at `/reviews/<slug>/`.

---

## Add a comparison (X vs Y)

Comparisons live in `lib/data/comparisons.ts`.

1. Append a `Comparison` entry to the `COMPARISONS` array.
2. Each row of the comparison table is a `{ feature, a, b, winner? }`
   object.
3. Both platforms should exist in `REVIEWS` — set `a.slug` / `b.slug` so
   the comparison page can link back to the review pages.
4. Renders at `/comparisons/<slug>/`.

---

## Add an alternatives page

`lib/data/alternatives.ts`. Append an `AlternativesPage` entry to
`ALTERNATIVES`. Each `entries[].reviewSlug` must exist in `REVIEWS`.

Renders at `/alternatives/<slug>/`.

---

## Add a character category

`lib/data/character-categories.ts`. Append a `CharacterCategory` entry.
The `match` function decides which characters land in the category.

Renders at `/characters/<slug>/`.

---

## Naming conventions

- Files: kebab-case for pages/data, PascalCase for components.
- Slugs: kebab-case, lowercase, no trailing slash in the data.
- Image files: `<slug>/N.webp` (1-indexed).
- Every URL that renders on the page ends with a trailing `/`.

## Where things live

| Kind | Location |
| --- | --- |
| Blog posts | `lib/data/blog/{guides,comparisons,reviews}.ts` |
| Characters | `lib/data/characters.ts` |
| Reviews | `lib/data/reviews.ts` |
| Comparisons | `lib/data/comparisons.ts` |
| Alternatives | `lib/data/alternatives.ts` |
| Authors | `lib/data/authors.ts` |
| Character categories | `lib/data/character-categories.ts` |
| Types | `lib/types/*.ts` |
| Affiliate helper | `lib/utils/affiliate.ts` |
| Route constants | `lib/constants/routes.ts` |
| Nav / platforms / FAQ | `lib/site.ts` |
| Metadata / JSON-LD | `lib/seo.ts` |
| UI primitives | `components/ui/` |
| Site chrome | `components/layout/` |
| Feature components | `components/features/{blog,character,hub,review}/` |
| CTAs | `components/cta/` |

## Before you commit

```bash
npm run build   # must exit 0 (this catches broken imports + type errors)
```

If the build passes, you're good. There's no test suite — the build IS
the smoke test.
