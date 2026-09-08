import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import { posts, getPost, relatedPosts, type Block } from '@/lib/blog'
import { SITE, SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const p = getPost(slug)
  if (!p) return { title: 'Post not found' }
  const url = `${SITE.url}/blog/${p.slug}/`
  return {
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      type: 'article',
      publishedTime: p.date,
      authors: [p.author],
      tags: p.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description,
    },
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const p = getPost(slug)
  if (!p) notFound()

  const related = relatedPosts(p.slug)
  const url = `${SITE.url}/blog/${p.slug}/`
  const dateStr = new Date(p.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url,
    datePublished: p.date,
    dateModified: p.date,
    author: { '@type': 'Organization', name: p.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: url,
    articleSection: p.category,
    keywords: p.keywords.join(', '),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: p.title, item: url },
    ],
  }

  return (
    <>
      <FloatingBackground density={8} />
      <Nav />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 40px 0', fontSize: 13, color: '#a3818f' }}>
        <Link href="/" style={{ color: '#8a6274', textDecoration: 'none' }}>Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/blog/" style={{ color: '#8a6274', textDecoration: 'none' }}>Blog</Link>
        <span aria-hidden="true"> / </span>
        <span style={{ color: '#331523', fontWeight: 600 }}>{p.category}</span>
      </div>

      {/* Article header */}
      <header style={{ maxWidth: 900, margin: '0 auto', padding: '36px 40px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6336c', marginBottom: 12 }}>
          {p.category}
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px,4.4vw,52px)', margin: 0, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.1, textWrap: 'balance' }}>
          {p.title}
        </h1>
        <p style={{ fontSize: 18, color: '#6f4a5d', lineHeight: 1.65, margin: '20px 0 0', maxWidth: '68ch' }}>
          {p.description}
        </p>
        <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 13, color: '#8a6274' }}>
          <span>By <strong style={{ color: '#331523' }}>{p.author}</strong></span>
          <span aria-hidden="true">·</span>
          <span>{dateStr}</span>
          <span aria-hidden="true">·</span>
          <span>{p.readMin} min read</span>
        </div>
      </header>

      {/* Article body */}
      <article style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 40px' }}>
        <div style={{ maxWidth: '68ch' }}>
          {p.body.map((b, i) => <BlockRender key={i} b={b} />)}
        </div>
      </article>

      {/* FAQ (rendered + JSON-LD) */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 40px 40px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, margin: '0 0 20px', fontWeight: 700, color: '#2b0f1d' }}>
          Common questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '68ch' }}>
          {p.faqs.map((f) => (
            <details
              key={f.q}
              style={{
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14,
                padding: '18px 22px',
              }}
            >
              <summary style={{ fontWeight: 700, fontSize: 15.5, cursor: 'pointer', color: '#2b0f1d', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ margin: '12px 0 2px', fontSize: 14.5, color: '#6f4a5d', lineHeight: 1.7 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Affiliate CTA — soft, in-context */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px 40px' }}>
        <div
          style={{
            background: 'linear-gradient(150deg,#f0417e,#ad1457 55%,#7c1236)',
            borderRadius: 20, padding: '32px 30px',
            boxShadow: '0 24px 60px rgba(214,51,108,0.35)',
            display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start',
            color: '#fff',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffd6e6' }}>
            Editor&apos;s Pick
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>
            Try the platform we ranked #1 — Secret Desires.
          </div>
          <div style={{ fontSize: 14.5, color: '#ffd6e6', lineHeight: 1.55 }}>
            Custom characters, image consistency, real memory. Free tier available; paid
            tier unlocks voice and long-term memory.
          </div>
          <a
            href={SECRET_DESIRES_AFFILIATE_URL}
            rel="sponsored noopener nofollow"
            target="_blank"
            style={{
              display: 'inline-block',
              background: '#fff', color: '#c2255c',
              borderRadius: 999, padding: '12px 26px',
              fontSize: 15, fontWeight: 800, textDecoration: 'none',
              marginTop: 6,
            }}
          >
            Try Secret Desires →
          </a>
          <div style={{ fontSize: 11.5, color: '#ffc2da' }}>Affiliate link · 18+ only.</div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 80px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, margin: '0 0 20px', fontWeight: 700, color: '#2b0f1d' }}>
            Keep reading
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}/`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 8,
                  background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16,
                  padding: 22, textDecoration: 'none', color: '#331523',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6336c' }}>
                  {r.category}
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.3 }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 13, color: '#6f4a5d', lineHeight: 1.6 }}>
                  {r.description}
                </div>
                <div style={{ fontSize: 13, color: '#d6336c', fontWeight: 700 }}>Read →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer variant="full" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  )
}

function BlockRender({ b }: { b: Block }) {
  if (b.kind === 'p') {
    return <p style={{ fontSize: 17, lineHeight: 1.75, color: '#331523', margin: '0 0 18px' }}>{b.text}</p>
  }
  if (b.kind === 'h2') {
    return <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#2b0f1d', margin: '36px 0 12px' }}>{b.text}</h2>
  }
  if (b.kind === 'h3') {
    return <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: '#2b0f1d', margin: '24px 0 8px' }}>{b.text}</h3>
  }
  if (b.kind === 'ul') {
    return (
      <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'disc' }}>
        {b.items.map((it, i) => (
          <li key={i} style={{ fontSize: 17, lineHeight: 1.7, color: '#331523', marginBottom: 8 }}>{it}</li>
        ))}
      </ul>
    )
  }
  if (b.kind === 'ol') {
    return (
      <ol style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'decimal' }}>
        {b.items.map((it, i) => (
          <li key={i} style={{ fontSize: 17, lineHeight: 1.7, color: '#331523', marginBottom: 8 }}>{it}</li>
        ))}
      </ol>
    )
  }
  if (b.kind === 'callout') {
    return (
      <aside
        role="note"
        style={{
          margin: '20px 0',
          padding: '18px 22px',
          background: 'linear-gradient(160deg,#fff,#fde8f0)',
          border: '1px solid #f0a3c2',
          borderLeft: '4px solid #d6336c',
          borderRadius: 12,
          fontSize: 16, lineHeight: 1.7, color: '#5c3c4d',
        }}
      >
        {b.text}
      </aside>
    )
  }
  if (b.kind === 'quote') {
    return (
      <blockquote
        style={{
          margin: '20px 0',
          padding: '10px 0 10px 22px',
          borderLeft: '3px solid #f0a3c2',
          fontStyle: 'italic',
          color: '#5c3c4d',
          fontSize: 17, lineHeight: 1.7,
        }}
      >
        {b.text}
        {b.cite && <cite style={{ display: 'block', marginTop: 8, fontSize: 13, color: '#8a6274', fontStyle: 'normal' }}>— {b.cite}</cite>}
      </blockquote>
    )
  }
  return null
}
