import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import { posts, categories } from '@/lib/blog'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Companion Guides, Explainers & Reviews',
  description:
    'Original editorial writing on AI companions — what they are, how the memory actually works, privacy checklists, feature landscapes, and honest reviews. Updated regularly.',
  alternates: { canonical: `${SITE.url}/blog/` },
  openGraph: {
    title: 'AICompanionPartner Blog',
    description:
      'Guides, explainers and reviews on AI companion apps — memory, privacy, features, and the honest state of the category.',
    url: `${SITE.url}/blog/`,
    type: 'website',
  },
}

export default function BlogIndex() {
  const featured = posts[0]
  const rest = posts.slice(1)

  const blogListLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AICompanionPartner Blog',
    url: `${SITE.url}/blog/`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE.url}/blog/${p.slug}/`,
      datePublished: p.date,
      dateModified: p.date,
      author: { '@type': 'Organization', name: p.author },
      keywords: p.keywords.join(', '),
    })),
  }

  return (
    <>
      <FloatingBackground density={10} />
      <Nav />

      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 0', fontSize: 13, color: '#a3818f' }}>
        <Link href="/" style={{ color: '#8a6274', textDecoration: 'none' }}>Home</Link>
        <span aria-hidden="true"> / </span>
        <span style={{ color: '#331523', fontWeight: 600 }}>Blog</span>
      </div>

      {/* Hero */}
      <header
        style={{
          position: 'relative',
          background: 'radial-gradient(900px 500px at 30% 10%,rgba(247,131,172,0.35),transparent 65%)',
          maxWidth: 1200, margin: '0 auto', padding: '36px 40px 40px',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d6336c', marginBottom: 14 }}>
          Journal
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(38px,5.5vw,60px)', margin: 0, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.05, textWrap: 'balance', maxWidth: '20ch' }}>
          Guides, explainers &amp; reviews for the AI companion category.
        </h1>
        <p style={{ fontSize: 17, color: '#6f4a5d', margin: '18px 0 0', maxWidth: '58ch', lineHeight: 1.65 }}>
          Original editorial writing on what AI companions actually are, how the tech under
          the hood really works, what to check before you sign up, and which features are
          worth paying for in 2026.
        </p>
      </header>

      {/* Featured post */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 32px' }}>
        <Link
          href={`/blog/${featured.slug}/`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr)',
            background: '#fff', border: '1.5px solid #f2b8cf', borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 16px 60px rgba(214,51,108,0.22)',
            textDecoration: 'none', color: '#331523',
            padding: '36px 40px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8590c', marginBottom: 10 }}>
            ★ Editor&apos;s Pick
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 700, color: '#2b0f1d', lineHeight: 1.2 }}>
            {featured.title}
          </div>
          <p style={{ margin: '10px 0 12px', color: '#6f4a5d', fontSize: 15.5, lineHeight: 1.65 }}>
            {featured.description}
          </p>
          <div style={{ fontSize: 13, color: '#8a6274', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <span style={{ color: '#d6336c', fontWeight: 700 }}>{featured.category}</span>
            <span aria-hidden="true">·</span>
            <span>{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>{featured.readMin} min read</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: '#a61e4d', fontWeight: 700 }}>Read the guide →</span>
          </div>
        </Link>
      </section>

      {/* Category chips */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <span
            key={c}
            style={{
              fontSize: 12.5, fontWeight: 700,
              background: c === 'All' ? '#fff' : '#fde8f0',
              color: '#a61e4d',
              border: '1px solid #f0a3c2',
              borderRadius: 999, padding: '6px 14px',
            }}
          >
            {c}
          </span>
        ))}
      </section>

      {/* Post grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 18 }}>
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16,
                padding: 24, textDecoration: 'none', color: '#331523',
                boxShadow: '0 2px 10px rgba(214,51,108,0.05)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6336c' }}>
                {p.category}
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 21, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.25 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.6, marginBottom: 4 }}>
                {p.description}
              </div>
              <div style={{ fontSize: 12.5, color: '#8a6274', display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
                <span>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span aria-hidden="true">·</span>
                <span>{p.readMin} min read</span>
              </div>
              <div style={{ fontSize: 13.5, color: '#d6336c', fontWeight: 700, marginTop: 4 }}>Read →</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer variant="full" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListLd) }} />
    </>
  )
}
