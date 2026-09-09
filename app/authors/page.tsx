import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout, { H1, Lede } from '@/components/PageLayout'
import { pageMetadata } from '@/lib/seo'
import { AUTHORS } from '@/lib/authors'
import { REVIEWS } from '@/lib/reviews'

const PATH = '/authors'
const TITLE = 'Authors — Who Reviews AI Companion Platforms Here'
const DESC =
  'Meet the people behind AI Companions Labs reviews. Every review on this site is written by a named person who has personally tested the platform.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AuthorsIndex() {
  const list = Object.values(AUTHORS)
  return (
    <PageLayout crumbs={[{ name: 'Home', path: '/' }, { name: 'Authors', path: PATH }]}>
      <H1>Authors</H1>
      <Lede>
        Every review on AI Companions Labs is written by a named person who has signed up
        for the platform with a real account and run it against our published nine-category
        methodology. This is that list.
      </Lede>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, marginTop: 20 }}>
        {list.map((a) => {
          const count = REVIEWS.filter((r) => r.authorSlug === a.slug).length
          return (
            <Link
              key={a.slug}
              href={`/authors/${a.slug}/`}
              style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16,
                padding: '20px 22px', textDecoration: 'none', color: '#331523',
              }}
            >
              {a.image && (
                <div style={{
                  position: 'relative', width: 64, height: 64, borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0, background: '#fde8f0',
                  border: '2px solid #f2b8cf',
                }}>
                  <Image src={a.image} alt={a.name} fill sizes="64px" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d' }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 13, color: '#6f4a5d' }}>{a.jobTitle}</div>
                <div style={{ fontSize: 12.5, color: '#8a6274', marginTop: 4 }}>
                  Testing since {a.testingSince} · {count} review{count === 1 ? '' : 's'}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </PageLayout>
  )
}
