import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import { characters, getCharacter, characterCover } from '@/lib/characters'
import { SECRET_DESIRES_AFFILIATE_URL, SITE } from '@/lib/site'

// Statically generate every character page.
export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const c = getCharacter(slug)
  if (!c) return { title: 'Character not found' }
  const url = `${SITE.url}/characters/${c.slug}/`
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: c.seo.title,
      description: c.seo.description,
      url,
      images: [{ url: characterCover(c), width: 840, height: 1120 }],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.seo.title,
      description: c.seo.description,
      images: [characterCover(c)],
    },
  }
}

export default async function CharacterPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const c = getCharacter(slug)
  if (!c) notFound()

  const related = characters.filter((x) => x.slug !== c.slug).slice(0, 4)
  const cover = characterCover(c)
  const canonical = `${SITE.url}/characters/${c.slug}/`

  // Breadcrumb JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Characters', item: `${SITE.url}/#characters` },
      { '@type': 'ListItem', position: 3, name: c.name, item: canonical },
    ],
  }

  // Article-style JSON-LD for the character profile (not a Person schema — this is a fictional AI-generated persona).
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.seo.title,
    description: c.seo.description,
    image: c.gallery.map((g) => `${SITE.url}${g.src}`),
    url: canonical,
    mainEntityOfPage: canonical,
  }

  return (
    <>
      <FloatingBackground density={12} />
      <Nav />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 0', fontSize: 13, color: '#a3818f' }}>
        <Link href="/" style={{ color: '#8a6274', textDecoration: 'none' }}>Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/#characters" style={{ color: '#8a6274', textDecoration: 'none' }}>Characters</Link>
        <span aria-hidden="true"> / </span>
        <span style={{ color: '#331523', fontWeight: 600 }}>{c.name}</span>
      </div>

      {/* Hero */}
      <header
        style={{
          position: 'relative',
          background: 'radial-gradient(900px 500px at 30% 10%,rgba(247,131,172,0.35),transparent 65%)',
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px,0.85fr) minmax(300px,1.15fr)',
          gap: 48, alignItems: 'center',
          padding: '36px 40px 64px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: -26,
              background: 'radial-gradient(closest-side,rgba(230,73,128,0.22),transparent)',
              filter: 'blur(24px)',
            }}
          />
          <Image
            src={cover}
            alt={c.gallery[0]?.alt || `${c.name} AI companion character portrait`}
            width={840} height={1120}
            priority
            style={{
              position: 'relative', width: '100%', aspectRatio: '3/4',
              objectFit: 'cover', objectPosition: 'top',
              borderRadius: 24, border: '4px solid #fff',
              boxShadow: '0 30px 70px rgba(120,30,70,0.28)',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute', left: 16, bottom: 16,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid #f6d3e1', borderRadius: 12,
              padding: '8px 14px', fontSize: 12, color: '#8a6274',
            }}
          >
            AI-generated character
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d6336c' }}>
            AICompanionPartner Original Character
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(44px,6vw,72px)', margin: 0, fontWeight: 700, color: '#2b0f1d', lineHeight: 1 }}>
            {c.name}
          </h1>
          <p style={{ fontSize: 19, color: '#6f4a5d', margin: 0, lineHeight: 1.6 }}>{c.subtitle}</p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[...c.tags, '18+'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12.5, fontWeight: 700,
                  background: '#fff', border: '1px solid #f0a3c2',
                  borderRadius: 999, padding: '6px 14px', color: '#a61e4d',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 6 }}>
            <a
              href={SECRET_DESIRES_AFFILIATE_URL}
              rel="sponsored noopener nofollow"
              target="_blank"
              style={{
                background: 'linear-gradient(135deg,#f0417e,#ad1457)',
                color: '#fff', borderRadius: 999, padding: '16px 34px',
                fontSize: 16, fontWeight: 700,
                boxShadow: '0 8px 28px rgba(214,51,108,0.32)',
                textDecoration: 'none',
              }}
            >
              Meet {c.name} on Secret Desires →
            </a>
            <Link
              href="#gallery"
              style={{
                color: '#a61e4d',
                border: '1.5px solid #f0a3c2',
                borderRadius: 999, padding: '16px 34px',
                fontSize: 16, fontWeight: 700, background: '#fff',
                textDecoration: 'none',
              }}
            >
              View Gallery
            </Link>
          </div>
        </div>
      </header>

      {/* About */}
      <section style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 40px 56px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, margin: '0 0 14px', fontWeight: 700, color: '#2b0f1d' }}>
          About {c.name}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: '#5c3c4d', margin: 0 }}>{c.about}</p>
      </section>

      {/* What X Is Like */}
      <section style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 40px 56px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, margin: '0 0 20px', fontWeight: 700, color: '#2b0f1d' }}>
          What {c.name} Is Like
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 14 }}>
          {c.traits.map((tr) => (
            <div
              key={tr.label}
              style={{
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14,
                padding: 20, display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6336c' }}>
                {tr.label}
              </div>
              <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.6 }}>{tr.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 40px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, margin: 0, fontWeight: 700, color: '#2b0f1d' }}>
            {c.name} Gallery
          </h2>
          <span style={{ fontSize: 13, color: '#a3818f' }}>
            All images AI-generated · New images added as they arrive
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
          {c.gallery.map((g, i) => (
            <Image
              key={g.src}
              src={g.src}
              alt={g.alt}
              width={600} height={800}
              loading={i > 1 ? 'lazy' : undefined}
              style={{
                width: '100%', aspectRatio: '3/4',
                objectFit: 'cover', objectPosition: 'top',
                borderRadius: 16, border: '3px solid #fff',
                boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
                display: 'block',
              }}
            />
          ))}
          {/* Empty placeholder slots — fill to a nice 6-slot minimum layout */}
          {Array.from({ length: Math.max(0, 6 - c.gallery.length) }).map((_, i) => (
            <div
              key={`slot-${i}`}
              aria-hidden="true"
              style={{
                aspectRatio: '3/4',
                borderRadius: 16,
                border: '2px dashed #f0a3c2',
                background: 'rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#a3818f', fontSize: 13,
                padding: 16, textAlign: 'center',
              }}
            >
              New {c.name} image coming soon
            </div>
          ))}
        </div>
      </section>

      {/* Conversion panel */}
      <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 40px 64px' }}>
        <div
          style={{
            textAlign: 'center',
            background: 'linear-gradient(150deg,#f0417e,#ad1457 55%,#7c1236)',
            borderRadius: 24, padding: '56px 40px',
            boxShadow: '0 24px 60px rgba(214,51,108,0.35)',
          }}
        >
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,3.6vw,40px)', margin: '0 0 12px', fontWeight: 700, color: '#fff' }}>
            Want to interact with {c.name}?
          </h2>
          <p style={{ color: '#ffd6e6', fontSize: 15, margin: '0 0 26px' }}>
            Chat, customize and create with AI companions like {c.name} on Secret Desires.
          </p>
          <a
            href={SECRET_DESIRES_AFFILIATE_URL}
            rel="sponsored noopener nofollow"
            target="_blank"
            style={{
              display: 'inline-block',
              background: '#fff', color: '#c2255c',
              borderRadius: 999, padding: '16px 36px',
              fontSize: 16, fontWeight: 800, textDecoration: 'none',
            }}
          >
            Try Secret Desires →
          </a>
          <div style={{ fontSize: 12, color: '#ffc2da', marginTop: 16 }}>18+ only.</div>
        </div>
      </section>

      {/* More characters */}
      <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 40px 80px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, margin: '0 0 20px', fontWeight: 700, color: '#2b0f1d' }}>
          More AI Characters
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/characters/${r.slug}/`}
              style={{
                position: 'relative', display: 'block',
                borderRadius: 16, overflow: 'hidden',
                border: '3px solid #fff',
                boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
                color: '#fff', textDecoration: 'none',
              }}
            >
              <Image
                src={characterCover(r)}
                alt={r.gallery[0]?.alt || `${r.name} AI companion character portrait`}
                width={500} height={666}
                loading="lazy"
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
                  boxShadow: 'inset 0 0 60px rgba(43,15,29,0.35)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#ffa8c9' }}>Meet {r.name} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer variant="compact" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  )
}
