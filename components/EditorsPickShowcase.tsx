'use client'

import { useEffect, useRef, useState } from 'react'
import { characters, characterCover } from '@/lib/characters'
import { SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

// Rotates a portrait of one of our characters every ROTATE_MS. Uses two
// stacked <img> layers so the incoming image crossfades over the outgoing
// one — nothing behind ever peeks through. The whole card is a single
// sponsored link to the Secret Desires landing page (per-character profile
// URL when we have one, else the generic affiliate URL).
const ROTATE_MS = 3500
const FADE_MS = 800

export default function EditorsPickShowcase() {
  const [idx, setIdx] = useState(0)
  const [showTop, setShowTop] = useState(true) // which layer is currently visible
  const [topIdx, setTopIdx] = useState(0)
  const [botIdx, setBotIdx] = useState(1 % characters.length)
  const nextRef = useRef<'top' | 'bot'>('bot')

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => {
        const next = (i + 1) % characters.length
        // Load the next character into the layer that's about to become
        // visible, then flip which layer is on top.
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

  const layerStyle = (visible: boolean): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 22%',
    transition: `opacity ${FADE_MS}ms ease`,
    opacity: visible ? 1 : 0,
  })

  return (
    <a
      href={href}
      rel="sponsored noopener nofollow"
      target="_blank"
      aria-label={`Meet ${current.name} on Secret Desires`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        minHeight: 320,
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#fff',
      }}
    >
      {/* Bottom layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={characterCover(characters[botIdx])}
        alt=""
        aria-hidden="true"
        style={layerStyle(!showTop)}
      />
      {/* Top layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={characterCover(characters[topIdx])}
        alt={`${current.name} — AI companion character`}
        style={layerStyle(showTop)}
      />

      {/* Scrim for legibility */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(43,15,29,0.78) 0%, rgba(43,15,29,0.18) 45%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Featured Partner ribbon */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          background: 'rgba(255,255,255,0.9)',
          color: '#a3818f',
          fontFamily: 'monospace',
          padding: '5px 10px',
          borderRadius: 999,
        }}
      >
        Featured Partner
      </div>

      {/* Name + CTA */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>
          {current.name}
        </div>
        <div
          style={{
            alignSelf: 'flex-start',
            background: 'linear-gradient(135deg,#f0417e,#ad1457)',
            color: '#fff',
            borderRadius: 999,
            padding: '9px 16px',
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 6px 20px rgba(214,51,108,0.4)',
          }}
        >
          Meet {current.name} →
        </div>
      </div>

      {/* Dot indicators */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          display: 'flex',
          gap: 4,
        }}
      >
        {characters.slice(0, Math.min(characters.length, 8)).map((_, i) => (
          <span
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: i === idx % 8 ? '#fff' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>
    </a>
  )
}
