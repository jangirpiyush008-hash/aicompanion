import Link from 'next/link'
import Image from 'next/image'
import PageLayout, { H1, Lede, H2 } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { characterCover, type Character } from '@/lib/characters'
import { articleLd } from '@/lib/seo'
import type { CharacterCategory } from '@/lib/character-categories'

// Server component — rendered from /characters/[slug]/page.tsx when the slug
// matches a CharacterCategory instead of a Character.
export default function CategoryPage({
  category,
  chars,
}: {
  category: CharacterCategory
  chars: Character[]
}) {
  const path = `/characters/${category.slug}`
  return (
    <PageLayout
      wide
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Characters', path: '/characters' },
        { name: category.name, path },
      ]}
      jsonLd={[
        articleLd({ headline: category.title, description: category.description, path }),
      ]}
    >
      <H1>{category.name}</H1>
      <Lede>{category.intro}</Lede>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 16,
        margin: '10px 0 32px',
      }}>
        {chars.map((c) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}/`}
            style={{
              position: 'relative', display: 'block',
              borderRadius: 16, overflow: 'hidden',
              border: '3px solid #fff',
              boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
              color: '#fff', textDecoration: 'none',
            }}
          >
            <Image
              src={characterCover(c)}
              alt={c.gallery[0]?.alt || `${c.name} AI companion character portrait`}
              width={500} height={666}
              style={{
                width: '100%', aspectRatio: '3/4',
                objectFit: 'cover', objectPosition: 'top', display: 'block',
              }}
            />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top,rgba(43,15,29,0.85),rgba(43,15,29,0.15) 42%,transparent 62%)',
            }}/>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffa8c9' }}>Meet {c.name} →</div>
            </div>
          </Link>
        ))}
      </div>

      <H2>Related</H2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <Link href="/characters/" style={pill}>All characters</Link>
        <Link href="/best-ai-girlfriends/" style={pill}>Best AI girlfriends</Link>
        <Link href="/reviews/secret-desires/" style={pill}>Secret Desires review</Link>
      </div>

      <SecretDesiresCTA
        variant="bottom"
        label={`Want a companion like this?`}
        note="Create a custom AI companion — personality, appearance and roleplay style, all tunable — on Secret Desires."
      />
    </PageLayout>
  )
}

const pill: React.CSSProperties = {
  padding: '9px 16px',
  borderRadius: 999,
  background: '#fff',
  border: '1px solid #f0a3c2',
  color: '#a61e4d',
  fontSize: 13,
  fontWeight: 700,
  textDecoration: 'none',
}
