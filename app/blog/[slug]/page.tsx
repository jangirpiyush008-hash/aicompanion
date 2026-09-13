import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts, getPost, relatedPosts, type Block } from '@/lib/blog'
import { SITE } from '@/lib/site'
import { DirectoryHeader, DirectoryFooter } from '@/components/v2/DirectoryChrome'
import { AgeGate } from '@/components/v2/AgeGate'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

const CAT_ACCENT: Record<string, string> = {
  'Guide':            '#FF7A2E',
  'Explainer':        '#FFB366',
  'Comparison':       '#F76707',
  'Reviews':          '#FFA94D',
  'Trends':           '#FF922B',
  'Privacy & Safety': '#FFC078',
}

// Turn [Secret Desires](https://…) inline markdown links inside text blocks
// into real anchors. Everything else renders as plain text (no other markdown).
function renderText(text: string) {
  const parts: (string | { text: string; href: string })[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push({ text: m[1], href: m[2] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      <span key={i}>{part}</span>
    ) : (
      <a
        key={i}
        href={part.href}
        target="_blank"
        rel={part.href.includes('secretdesires') ? 'sponsored noopener nofollow' : 'noopener nofollow'}
        style={{ color: 'var(--accent)', fontWeight: 700 }}
      >
        {part.text}
      </a>
    )
  )
}

function renderBlock(b: Block, i: number) {
  switch (b.kind) {
    case 'p':
      return (
        <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text)', margin: '0 0 18px' }}>
          {renderText(b.text)}
        </p>
      )
    case 'h2':
      return (
        <h2 key={i} style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 26, letterSpacing: '-0.02em', color: 'var(--text)', margin: '36px 0 14px' }}>
          {b.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={i} style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--text)', margin: '26px 0 10px' }}>
          {b.text}
        </h3>
      )
    case 'ul':
      return (
        <ul key={i} style={{ margin: '0 0 20px', paddingLeft: 22, color: 'var(--text)', fontSize: 15.5, lineHeight: 1.7 }}>
          {b.items.map((it, j) => <li key={j} style={{ marginBottom: 6 }}>{renderText(it)}</li>)}
        </ul>
      )
    case 'ol':
      return (
        <ol key={i} style={{ margin: '0 0 20px', paddingLeft: 22, color: 'var(--text)', fontSize: 15.5, lineHeight: 1.7 }}>
          {b.items.map((it, j) => <li key={j} style={{ marginBottom: 6 }}>{renderText(it)}</li>)}
        </ol>
      )
    case 'callout':
      return (
        <aside key={i} style={{ background: 'rgba(255,122,46,.10)', border: '1px solid var(--border-glow)', borderLeft: '3px solid var(--accent)', borderRadius: 10, padding: '14px 18px', margin: '20px 0', color: 'var(--text)', fontSize: 15, lineHeight: 1.65 }}>
          {renderText(b.text)}
        </aside>
      )
    case 'quote':
      return (
        <blockquote key={i} style={{ borderLeft: '3px solid var(--accent-2)', paddingLeft: 16, margin: '20px 0', color: 'var(--text-muted)', fontSize: 15.5, fontStyle: 'italic', lineHeight: 1.65 }}>
          {renderText(b.text)}
          {b.cite && <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text-subtle)' }}>— {b.cite}</div>}
        </blockquote>
      )
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const p = getPost(slug)
  if (!p) return { title: 'Post not found' }
  const url = `${SITE.url}/blog/${p.slug}/`
  return {
    title: `${p.title} · AI Adult Directory`,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      type: 'article',
      publishedTime: p.date,
      modifiedTime: p.lastUpdated || p.date,
      authors: [p.author],
      tags: p.keywords,
    },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description },
    other: { rating: 'adult', 'RATING': 'RTA-5042-1996-1400-1577-RTA' },
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const p = getPost(slug)
  if (!p) notFound()

  const related = relatedPosts(p.slug)
  const accent = CAT_ACCENT[p.category] || 'var(--accent)'
  const url = `${SITE.url}/blog/${p.slug}/`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.lastUpdated || p.date,
    author: { '@type': 'Organization', name: p.author },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
    keywords: p.keywords.join(', '),
  }

  const faqLd = p.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <>
      <DirectoryHeader />

      <article style={{ maxWidth: 880, margin: '0 auto', padding: '28px 32px 60px' }}>
        <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--text-subtle)' }}>Home</Link> · <Link href="/blog" style={{ color: 'var(--text-subtle)' }}>Blog</Link> · <span style={{ color: 'var(--text)' }}>{p.title}</span>
        </div>

        <header style={{ margin: '18px 0 28px' }}>
          <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 12 }}>
            {p.category}
          </div>
          <h1 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--text)', margin: 0 }}>
            {p.title}
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, margin: '14px 0 18px', maxWidth: '68ch' }}>
            {p.description}
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--text-subtle)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span>{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span aria-hidden="true">·</span>
            <span>{p.readMin} min read</span>
            <span aria-hidden="true">·</span>
            <span>{p.author}</span>
            {p.lastUpdated && p.lastUpdated !== p.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {new Date(p.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </>
            )}
          </div>
        </header>

        {p.quickAnswer && (
          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '18px 22px', margin: '0 0 22px' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--accent-2)', marginBottom: 6 }}>
              Quick answer
            </div>
            <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.65 }}>{renderText(p.quickAnswer)}</div>
          </aside>
        )}

        {p.keyTakeaways && p.keyTakeaways.length > 0 && (
          <aside style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '18px 22px', margin: '0 0 24px' }}>
            <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--accent-2)', marginBottom: 8 }}>
              Key takeaways
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14.5, lineHeight: 1.7, color: 'var(--text)' }}>
              {p.keyTakeaways.map((k, i) => <li key={i} style={{ marginBottom: 4 }}>{renderText(k)}</li>)}
            </ul>
          </aside>
        )}

        <div>{p.body.map((b, i) => renderBlock(b, i))}</div>

        {p.faqs.length > 0 && (
          <section style={{ marginTop: 44 }}>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 26, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.faqs.map((f, i) => (
                <details key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 20px' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: 15.5, color: 'var(--text)', listStyle: 'none' }}>
                    {f.q}
                  </summary>
                  <div style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    {renderText(f.a)}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginTop: 44 }}>
            <h2 style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Related reading
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
              {related.map(r => {
                const rAccent = CAT_ACCENT[r.category] || 'var(--accent)'
                return (
                  <Link key={r.slug} href={`/blog/${r.slug}/`} style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '14px 16px', color: 'var(--text)' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', color: rAccent, marginBottom: 6 }}>{r.category}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>{r.title}</div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </article>

      <DirectoryFooter />
      <AgeGate />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  )
}
