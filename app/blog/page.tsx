import type { Metadata } from 'next'
import Link from 'next/link'
import { posts, categories } from '@/lib/blog'
import { SITE } from '@/lib/site'
import { DirectoryHeader, DirectoryFooter } from '@/components/v2/DirectoryChrome'

export const metadata: Metadata = {
  title: 'Blog · AI Adult Directory',
  description:
    'Guides, comparisons and how-tos for AI girlfriend, AI porn, AI sexting and NSFW AI tools. Verified rankings and hands-on testing, updated weekly.',
  alternates: { canonical: `${SITE.url}/blog/` },
  openGraph: {
    title: 'AI Adult Directory Blog',
    description:
      'Guides, comparisons and how-tos across AI girlfriend, AI porn generation, AI sexting and NSFW chat.',
    url: `${SITE.url}/blog/`,
    type: 'website',
  },
  other: { rating: 'adult', 'RATING': 'RTA-5042-1996-1400-1577-RTA' },
}

const CAT_ACCENT: Record<string, string> = {
  'Guide':            '#FF7A2E',
  'Explainer':        '#FFB366',
  'Comparison':       '#F76707',
  'Reviews':          '#FFA94D',
  'Trends':           '#FF922B',
  'Privacy & Safety': '#FFC078',
}

export default function BlogIndex() {
  const featured = posts[0]
  const rest = posts.slice(1)

  const blogListLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AI Adult Directory Blog',
    url: `${SITE.url}/blog/`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE.url}/blog/${p.slug}/`,
      datePublished: p.date,
      dateModified: p.lastUpdated || p.date,
      author: { '@type': 'Organization', name: p.author },
      keywords: p.keywords.join(', '),
    })),
  }

  return (
    <>
      <DirectoryHeader />

      <section style={{ padding: '28px 28px 20px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--text-subtle)' }}>Home</Link> · <span style={{ color: 'var(--text)' }}>Blog</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '14px 0 0' }}>
          Guides, comparisons &amp; <span style={{ color: 'var(--accent)' }}>how-tos</span>.
        </h1>
        <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: '10px 0 0', maxWidth: '62ch', lineHeight: 1.55 }}>
          Hands-on writing on AI girlfriend apps, AI porn generation, AI sexting, uncensored chat, and everything else covered in the directory. Ranked lists and honest reviews, no filler.
        </p>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 28px 0' }}>
        <Link
          href={`/blog/${featured.slug}/`}
          style={{
            display: 'block',
            background: 'var(--surface)',
            border: '1px solid var(--border-glow)',
            borderRadius: 16,
            padding: '28px 32px',
            color: 'var(--text)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-2)', marginBottom: 10 }}>
            ★ Editor&apos;s Pick
          </div>
          <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {featured.title}
          </div>
          <p style={{ margin: '10px 0 14px', color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.65, maxWidth: '78ch' }}>
            {featured.description}
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <span style={{ color: CAT_ACCENT[featured.category] || 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 11 }}>
              {featured.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>{featured.readMin} min read</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Read the guide</span>
          </div>
        </Link>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 28px 8px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <span
            key={c}
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              background: c === 'All' ? 'var(--accent)' : 'var(--surface)',
              color: c === 'All' ? 'var(--bg)' : 'var(--text)',
              border: '1px solid var(--border-mid)',
              borderRadius: 999,
              padding: '6px 14px',
            }}
          >
            {c}
          </span>
        ))}
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '12px 28px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {rest.map((p) => {
            const accent = CAT_ACCENT[p.category] || 'var(--accent)'
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  color: 'var(--text)',
                  minHeight: 200,
                }}
              >
                <div style={{ height: 3, background: accent }} />
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: accent }}>
                    {p.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 4 }}>
                    {p.description}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-subtle)', display: 'flex', gap: 8, marginTop: 'auto', flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                    <span>{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.readMin} min read</span>
                    <span aria-hidden="true">·</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Read</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <DirectoryFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListLd) }} />
    </>
  )
}
