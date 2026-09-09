# Images to generate

This file lists every image slot the site references but does not yet have a file for. Generate each one in Secret Desires (or upload the real photo for author headshots), drop it at the destination path, and commit. The code already points at these paths — the image will appear automatically on the next Railway deploy.

Format for every entry:
- **Where it appears** — the URL / component that consumes it
- **Destination** — the exact filepath under `/public`
- **Format + size** — target dimensions and file type
- **Prompt** — what to type into Secret Desires' image generator (or notes if not SDAI)

---

## Author headshots

The editor byline uses a persona name (Alex Whitmore) so the site can keep a consistent editorial voice regardless of who is drafting behind the scenes. The image should still look real and professional — but does not need to be anyone's actual face.

### Alex Whitmore — editor headshot
- **Where it appears**: `/authors/alex-whitmore/`, every review byline, author card at the bottom of every review
- **Destination**: `/public/authors/alex-whitmore.jpg`
- **Format + size**: JPG, square (400×400 minimum, 800×800 recommended for retina)
- **Options for sourcing**:
  1. **AI-generated headshot** (fastest, free) — use a service like [this-person-does-not-exist.com](https://this-person-does-not-exist.com/), [generated.photos](https://generated.photos/), or an image model prompt like:
     ```
     Professional headshot of a person in their 30s, warm smile, soft studio lighting,
     neutral grey background, business-casual grey/navy jumper, natural skin texture,
     shot with 85mm lens, editorial magazine style, high detail
     ```
  2. **Licensed stock portrait** — Unsplash / Pexels have plenty; look for something that looks candid, not overly staged. Attribute if the license requires it.
  3. **Illustrated avatar** — a stylised avatar is fine too (works well for editor personas), if you'd prefer to avoid a photorealistic face entirely.
- **Rule**: whatever you pick, keep it consistent across every touchpoint — swapping headshots breaks the persona.

_Add more author entries here as the roster grows._

---

## Review hero images

Every review at `/reviews/<slug>/` renders a hero image at the top if `heroImage` is set on the Review object in `lib/reviews.ts`. Skip a hero for any review that does not yet have a real image — the code omits the block entirely if the file is missing.

### Secret Desires — Editor's Pick review hero
- **Where it appears**: `/reviews/secret-desires/` — top of the page, above the verdict strip
- **Destination**: `/public/reviews/secret-desires-hero.webp`
- **Format + size**: WebP, 1200×630 (OG-image dimensions, so it also works as social share)
- **Prompt (Secret Desires)**:
  ```
  Portrait photograph, 25-year-old woman, warm café setting in soft afternoon light,
  cinematic shallow depth of field, casual fitted sweater, natural expression, 
  looking off-camera slightly, editorial fashion photography style, warm color grading,
  35mm film aesthetic, high detail on hair and skin texture
  ```
- **Alt text (already in code)**: "Secret Desires AI companion — character portrait generated on the platform during our August 2026 test."
- **Caption**: "A same-character image set generated during our August 2026 hands-on test — the visual consistency across generations is the platform's biggest single strength."
- **Notes**: Since the review calls out image consistency as the standout, this hero should be a strong showcase of that. Generate 3–4 images with slight variations, pick the best. The image proves the claim.

### Candy AI review hero (planned — generate once tested)
- **Where it appears**: `/reviews/candy-ai/` once the review moves from `planned` to `published`
- **Destination**: `/public/reviews/candy-ai-hero.webp`
- **Format + size**: WebP, 1200×630
- **Notes**: Generate an on-Candy image during your hands-on test — do NOT generate on Secret Desires and pretend it's from Candy. The whole trust anchor here is that the image comes from the platform being reviewed.

### DreamGF review hero (planned — generate once tested)
- **Where it appears**: `/reviews/dreamgf/` once published
- **Destination**: `/public/reviews/dreamgf-hero.webp`
- **Format + size**: WebP, 1200×630
- **Notes**: Same rule — generate on DreamGF during the actual test.

### Nomi review hero (planned — generate once tested)
- **Where it appears**: `/reviews/nomi/` once published
- **Destination**: `/public/reviews/nomi-hero.webp`
- **Format + size**: WebP, 1200×630
- **Notes**: Same rule.

_Repeat the pattern for every review as it moves to `published`._

---

## How to convert to WebP after generating

Secret Desires typically exports PNG or JPG. WebP loads faster (Core Web Vitals).

macOS one-liner (needs `cwebp` — install via `brew install webp`):
```bash
cwebp -q 85 downloaded.png -o public/reviews/secret-desires-hero.webp
```

Or use a browser tool like [squoosh.app](https://squoosh.app/) — quality 80–85 is a good balance.

Target file size: **under 200KB**. If a hero is heavier than that, downscale to 1600px wide and re-export at quality 75.

---

## What the code does when an image is missing

Every image slot degrades gracefully:
- **Author byline / card** — skips the avatar circle if `author.image` is unset
- **Review hero** — renders nothing (no placeholder box) if `heroImage` is unset
- **Author page headshot** — skips the avatar block if `author.image` is unset

So it is safe to ship this code before generating any of these images. The pages will still work — they just won't have visuals until the files land.

---

## Rule for future hero images

**Every review hero must be generated on the platform being reviewed, during the test.** Never reuse Secret Desires images to illustrate a competitor's review — that would misrepresent what a reader will actually see if they sign up. This is the same reason we do not publish scores for untested platforms.
