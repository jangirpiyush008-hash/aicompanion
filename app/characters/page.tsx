import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { characters, characterCover } from '@/lib/characters'
import { CHARACTER_CATEGORIES } from '@/lib/character-categories'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/characters'
const TITLE = 'AI Characters — Original AI Companion Character Gallery'
const DESC = 'Browse original AI-generated companion characters. Each with a full personality profile, gallery and Secret Desires profile link.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function CharactersIndexPage() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Characters', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Characters</H1>
      <Lede>
        {characters.length} original AI-generated companion characters. Each with a personality
        profile, editorial write-up, and a gallery you can preview here — and unlock in full on
        Secret Desires.
      </Lede>

      <H2>Browse by category</H2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
        gap: 12,
        margin: '10px 0 32px',
      }}>
        {CHARACTER_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/characters/${cat.slug}/`}
            style={{
              padding: '16px 18px',
              background: '#fff',
              border: '1px solid #f6d3e1',
              borderRadius: 12,
              color: '#331523',
              textDecoration: 'none',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700 }}>
              {cat.name}
            </span>
            <span style={{ fontSize: 13, color: '#8a6274' }}>Explore →</span>
          </Link>
        ))}
      </div>

      <H2>All characters</H2>
      <P>
        Every character on the site is a fictional adult, generated for editorial use on
        AI Companions Labs. Click a card to see the full profile and gallery.
      </P>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 16,
        margin: '10px 0 40px',
      }}>
        {characters.map((c) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}/`}
            style={{
              position: 'relative',
              display: 'block',
              borderRadius: 16,
              overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <Image
              src={characterCover(c)}
              alt={c.gallery[0]?.alt || `${c.name} AI companion character portrait`}
              width={500} height={666}
              style={{
                width: '100%', aspectRatio: '3/4',
                objectFit: 'cover', objectPosition: 'top',
                display: 'block',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top,rgba(43,15,29,0.85),rgba(43,15,29,0.15) 42%,transparent 62%)',
              }}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffa8c9' }}>Meet {c.name} →</div>
            </div>
          </Link>
        ))}
      </div>

      <SecretDesiresCTA
        variant="bottom"
        label="Want to design your own?"
        note="Create a custom AI companion — personality, appearance and roleplay style, all tunable — on Secret Desires."
      />
    </PageLayout>
  )
}
