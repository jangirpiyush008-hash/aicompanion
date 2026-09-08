'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { SearchDoc } from '@/lib/search-index'

// Client-side substring search. No external dependency — the index is small
// (well under 1k rows for the foreseeable future) and simple substring scoring
// is more than good enough here. Each search term must match somewhere in the
// keywords string; docs are ranked by title match > kind match > keyword match.
export default function SearchClient({ index }: { index: SearchDoc[] }) {
  const [q, setQ] = useState('')
  const [kindFilter, setKindFilter] = useState<string>('All')

  const kinds = useMemo(() => ['All', ...Array.from(new Set(index.map((i) => i.kind)))], [index])

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return []
    const terms = query.split(/\s+/).filter(Boolean)
    const scored = index
      .filter((d) => kindFilter === 'All' || d.kind === kindFilter)
      .map((d) => {
        const t = d.title.toLowerCase()
        const k = d.keywords
        let score = 0
        for (const term of terms) {
          const inTitle = t.includes(term)
          const inKw = k.includes(term)
          if (!inTitle && !inKw) return { d, score: -1 }
          if (t === term) score += 100
          if (inTitle) score += 20 - Math.abs(t.length - term.length) / 10
          if (inKw) score += 5
        }
        return { d, score }
      })
      .filter(({ score }) => score > 0)
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 40).map(({ d }) => d)
  }, [index, q, kindFilter])

  return (
    <div style={{ margin: '10px 0 40px' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '4px 0 18px' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search characters, reviews, comparisons, guides…"
          type="search"
          autoFocus
          style={{
            flex: '1 1 320px',
            padding: '13px 18px',
            borderRadius: 999,
            border: '1.5px solid #f0a3c2',
            fontSize: 15,
            color: '#331523',
            outline: 'none',
          }}
        />
        <select
          value={kindFilter}
          onChange={(e) => setKindFilter(e.target.value)}
          style={{
            padding: '12px 18px',
            borderRadius: 999,
            border: '1.5px solid #f0a3c2',
            fontSize: 14, fontWeight: 700,
            color: '#a61e4d', background: '#fff',
          }}
        >
          {kinds.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      {q.trim().length === 0 ? (
        <div style={emptyState}>
          Start typing to search across characters, reviews, comparisons, guides and hubs.
        </div>
      ) : results.length === 0 ? (
        <div style={emptyState}>
          No results for &ldquo;{q}&rdquo;. Try a different phrase or clear the filter.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              style={{
                padding: '14px 18px',
                background: '#fff',
                border: '1px solid #f6d3e1',
                borderRadius: 12,
                textDecoration: 'none',
                color: '#331523',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#2b0f1d' }}>{r.title}</span>
                <span style={kindPill}>{r.kind}</span>
              </div>
              <span style={{ fontSize: 13.5, color: '#6f4a5d', lineHeight: 1.55 }}>{r.blurb}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const emptyState: React.CSSProperties = {
  padding: '18px 20px',
  background: '#fff',
  border: '1px dashed #f0a3c2',
  borderRadius: 12,
  color: '#6f4a5d',
  fontSize: 14,
}
const kindPill: React.CSSProperties = {
  fontSize: 10.5, fontWeight: 800,
  padding: '2px 8px', borderRadius: 999,
  background: '#fde8f0', color: '#a61e4d',
  letterSpacing: '0.06em', textTransform: 'uppercase',
}
