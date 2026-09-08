import Link from 'next/link'
import Image from 'next/image'
import { characters } from '@/lib/characters'

// Every gallery image from every character, flattened, deduped by src. Each
// image links back to the character page. Used by /ai-girlfriend-images and
// /ai-companion-images.
type FlatImage = {
  src: string
  alt: string
  characterSlug: string
  characterName: string
}

function allImages(): FlatImage[] {
  const seen = new Set<string>()
  const out: FlatImage[] = []
  for (const c of characters) {
    for (const g of c.gallery) {
      if (seen.has(g.src)) continue
      seen.add(g.src)
      out.push({ src: g.src, alt: g.alt || `${c.name} — AI-generated companion character`, characterSlug: c.slug, characterName: c.name })
    }
  }
  return out
}

export default function ImageHubGrid({ limit }: { limit?: number }) {
  const imgs = limit ? allImages().slice(0, limit) : allImages()
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
      gap: 10,
    }}>
      {imgs.map((img) => (
        <Link
          key={img.src}
          href={`/characters/${img.characterSlug}/`}
          aria-label={`View ${img.characterName}`}
          style={{
            position: 'relative', display: 'block',
            aspectRatio: '3/4',
            borderRadius: 14,
            overflow: 'hidden',
            border: '2px solid #fff',
            boxShadow: '0 6px 20px rgba(120,30,70,0.10)',
            textDecoration: 'none',
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 220px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top,rgba(43,15,29,0.72),transparent 55%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', left: 10, right: 10, bottom: 10,
            color: '#fff', fontFamily: 'Playfair Display, serif',
            fontSize: 15, fontWeight: 700,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>
            {img.characterName}
          </div>
        </Link>
      ))}
    </div>
  )
}

export { allImages }
export type { FlatImage }
