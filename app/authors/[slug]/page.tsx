import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import { pageMetadata, absoluteUrl, personLd } from '@/lib/seo'
import { AUTHORS, getAuthor } from '@/lib/authors'
import { REVIEWS } from '@/lib/reviews'

export function generateStaticParams() {
  return Object.values(AUTHORS).map((a) => ({ slug: a.slug }))
}
export const dynamicParams = false

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const a = getAuthor(slug)
  if (!a) return { title: 'Author not found' }
  return pageMetadata({
    title: `${a.name} — ${a.jobTitle}`,
    description: a.shortBio,
    path: `/authors/${a.slug}`,
    type: 'profile',
    image: a.image,
  })
}

export default async function AuthorPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const a = getAuthor(slug)
  if (!a) notFound()

  // Every review credited to this author, published or planned.
  const reviewsByAuthor = REVIEWS.filter((r) => r.authorSlug === a.slug)

  return (
    <PageLayout
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Authors', path: '/authors' },
        { name: a.name, path: `/authors/${a.slug}` },
      ]}
      jsonLd={personLd({
        name: a.name,
        slug: a.slug,
        jobTitle: a.jobTitle,
        bio: a.shortBio,
        sameAs: a.sameAs,
        image: a.image,
      })}
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
        {a.image && (
          <div style={{
            position: 'relative', width: 128, height: 128, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0, background: '#fde8f0',
            border: '3px solid #f2b8cf',
          }}>
            <Image
              src={a.image}
              alt={`${a.name} — ${a.jobTitle}`}
              fill
              sizes="128px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a61e4d' }}>
            Author
          </div>
          <H1>{a.name}</H1>
          <div style={{ fontSize: 15, color: '#6f4a5d', fontWeight: 600 }}>
            {a.jobTitle}
          </div>
          <div style={{ fontSize: 13.5, color: '#8a6274' }}>
            Testing AI companion platforms since {a.testingSince}
          </div>
        </div>
      </div>

      <Lede>{a.shortBio}</Lede>

      <H2>About {a.name.split(' ')[0]}</H2>
      {a.fullBio.map((p, i) => (
        <P key={i}>{p}</P>
      ))}

      <H2>Credentials</H2>
      <UL items={a.credentials} />

      {reviewsByAuthor.length > 0 && (
        <>
          <H2>Reviews by {a.name.split(' ')[0]}</H2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12, margin: '10px 0 22px' }}>
            {reviewsByAuthor.map((r) => (
              <Link
                key={r.slug}
                href={`/reviews/${r.slug}/`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 6,
                  background: '#fff', border: '1px solid #f6d3e1', borderRadius: 12,
                  padding: '14px 16px', textDecoration: 'none', color: '#331523',
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#2b0f1d' }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 13, color: '#6f4a5d', lineHeight: 1.5 }}>
                  {r.tagline}
                </div>
                <div style={{ fontSize: 12, color: '#d6336c', fontWeight: 700 }}>
                  {r.status === 'published' ? `Read review · ${r.overall}/10` : 'On the testing queue'}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {(a.sameAs.length > 0 || a.email) && (
        <>
          <H2>Contact &amp; social</H2>
          <UL items={[
            ...a.sameAs.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#c2185b', fontWeight: 600, textDecoration: 'underline' }}
              >
                {url.replace(/^https?:\/\//, '')}
              </a>
            )),
            ...(a.email ? [
              <a
                key={a.email}
                href={`mailto:${a.email}`}
                style={{ color: '#c2185b', fontWeight: 600, textDecoration: 'underline' }}
              >
                {a.email}
              </a>,
            ] : []),
          ]} />
        </>
      )}

      <div style={{ fontSize: 12.5, color: '#8a6274', marginTop: 24 }}>
        Author page: {absoluteUrl(`/authors/${a.slug}`)}
      </div>
    </PageLayout>
  )
}
