import Link from 'next/link'
import Image from 'next/image'
import type { Author } from '@/lib/authors'

// Compact byline: shown at the top of every review / article. Links to the
// author page so readers (and Google) can trace who reviewed the platform.
// Also carries the "Tested by a real person on <date>" trust cue.
export function AuthorByline({
  author,
  testedOn,
  updatedOn,
}: {
  author: Author
  testedOn?: string
  updatedOn?: string
}) {
  return (
    <div style={row}>
      {author.image && (
        <div style={{
          position: 'relative', width: 40, height: 40, borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0, background: '#fde8f0',
          border: '1.5px solid #f2b8cf',
        }}>
          <Image
            src={author.image}
            alt={`${author.name} — ${author.jobTitle}`}
            fill
            sizes="40px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 13.5, color: '#4a3040' }}>
          Reviewed by{' '}
          <Link
            href={`/authors/${author.slug}/`}
            style={{ color: '#a61e4d', fontWeight: 700, textDecoration: 'none' }}
          >
            {author.name}
          </Link>
        </div>
        <div style={{ fontSize: 12, color: '#8a6274' }}>
          {author.jobTitle}
          {testedOn && <> · Tested {formatDate(testedOn)}</>}
          {updatedOn && <> · Updated {formatDate(updatedOn)}</>}
        </div>
      </div>
    </div>
  )
}

// Expanded author card — shown at the bottom of every review, with bio + link
// to the full author page. This is the second E-E-A-T anchor on a review page.
export function AuthorCard({ author }: { author: Author }) {
  return (
    <aside style={card}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {author.image && (
          <div style={{
            position: 'relative', width: 72, height: 72, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0, background: '#fde8f0',
            border: '2px solid #f2b8cf',
          }}>
            <Image
              src={author.image}
              alt={`${author.name} — ${author.jobTitle}`}
              fill
              sizes="72px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a61e4d' }}>
            Written by
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#2b0f1d' }}>
            {author.name}
          </div>
          <div style={{ fontSize: 13.5, color: '#6f4a5d' }}>
            {author.jobTitle} · Testing platforms since {author.testingSince}
          </div>
        </div>
      </div>
      <p style={{ margin: '14px 0 12px', fontSize: 14.5, lineHeight: 1.65, color: '#4a3040' }}>
        {author.shortBio}
      </p>
      <Link
        href={`/authors/${author.slug}/`}
        style={{ fontSize: 13.5, fontWeight: 700, color: '#c2185b', textDecoration: 'none' }}
      >
        Read {author.name.split(' ')[0]}&rsquo;s full profile
      </Link>
    </aside>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '14px 16px',
  background: '#fff',
  border: '1px solid #f6d3e1',
  borderRadius: 12,
  margin: '10px 0 22px',
}

const card: React.CSSProperties = {
  background: '#fff',
  border: '1.5px solid #f2b8cf',
  borderRadius: 16,
  padding: '22px 24px',
  margin: '32px 0 28px',
  boxShadow: '0 4px 16px rgba(214,51,108,0.08)',
}
