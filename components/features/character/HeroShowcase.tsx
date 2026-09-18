'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { characters, characterCover } from '@/lib/characters'
import { SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

// Auto-rotating character portrait for the hero. Two stacked <img> layers
// crossfade the incoming portrait over the outgoing one so the frame is
// never empty. The whole card is a sponsored link to Secret Desires —
// per-character profile URL when we have one, else the generic affiliate URL.
const ROTATE_MS = 3800
const FADE_MS = 900

export default function HeroShowcase() {
  const [idx, setIdx] = useState(0)
  const [showTop, setShowTop] = useState(true)
  const [topIdx, setTopIdx] = useState(0)
  const [botIdx, setBotIdx] = useState(1 % characters.length)
  const nextRef = useRef<'top' | 'bot'>('bot')

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => {
        const next = (i + 1) % characters.length
        if (nextRef.current === 'bot') {
          setBotIdx(next)
          setShowTop(false)
          nextRef.current = 'top'
        } else {
          setTopIdx(next)
          setShowTop(true)
          nextRef.current = 'bot'
        }
        return next
      })
    }, ROTATE_MS)
    return () => clearInterval(t)
  }, [])

  const current = characters[idx]
  const href = current.sdaiProfileUrl ?? SECRET_DESIRES_AFFILIATE_URL

  const layer = (visible: boolean): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    transition: `opacity ${FADE_MS}ms ease`,
    opacity: visible ? 1 : 0,
  })

  return (
    <div style={{ position: 'relative', justifySelf: 'end', width: '100%', maxWidth: 420 }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -30,
          background: 'radial-gradient(closest-side,rgba(230,73,128,0.25),transparent)',
          filter: 'blur(24px)',
        }}
      />

      <a
        href={href}
        rel="sponsored noopener nofollow"
        target="_blank"
        aria-label={`Meet ${current.name} on Secret Desires`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: 24,
          border: '4px solid #fff',
          boxShadow: '0 30px 70px rgba(120,30,70,0.28)',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {/* Bottom layer (preloading the next portrait). Not priority — it's the
            crossfade target for the next rotation, not the initial paint. */}
        <Image
          src={characterCover(characters[botIdx])}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 640px) 100vw, 420px"
          style={layer(!showTop)}
        />
        {/* Top layer (currently visible). `priority` on this one makes next/image
            emit <link rel="preload"> into <head> for the initial hero portrait —
            this is the homepage LCP element, so preload is worth ~1.5-2s off LCP. */}
        <Image
          src={characterCover(characters[topIdx])}
          alt={`${current.name} — AI-generated companion character portrait`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 420px"
          style={layer(showTop)}
        />

        {/* Name label — same visual as the previous static hero label */}
        <div
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid #f6d3e1',
            borderRadius: 12,
            padding: '10px 16px',
            fontSize: 13,
          }}
        >
          <span style={{ fontWeight: 700, color: '#2b0f1d' }}>{current.name}</span>{' '}
          <span style={{ color: '#8a6274' }}>· AI-generated character</span>
        </div>

        {/* Dot indicators — subtle count of rotation position */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            display: 'flex',
            gap: 5,
            padding: '5px 8px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {characters.slice(0, Math.min(characters.length, 8)).map((_, i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: i === idx % 8 ? '#d6336c' : 'rgba(214,51,108,0.35)',
              }}
            />
          ))}
        </div>
      </a>
    </div>
  )
}
