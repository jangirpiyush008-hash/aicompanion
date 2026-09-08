'use client'

import { useEffect, useState } from 'react'

/**
 * Fixed, full-viewport pointer-events:none floating layer.
 * Density 0–30 (default 14 for home, 12 for character pages).
 *
 * Item mix, cycling by index % 3:
 *   - 0: romantic emoji (💗💋❤️💕✨🌹💫)
 *   - 1: magenta glow orb
 *   - 2: soft rose silhouette
 *
 * The design brief also asked for two more emoji sets — swapped for tasteful
 * alternatives to keep the "sensual, not vulgar" rule the brief itself sets.
 */
export default function FloatingBackground({ density = 14 }: { density?: number }) {
  // Only render on the client so the first paint doesn't flash the animation.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const glyphs = ['💗', '💋', '❤️', '💕', '✨', '🌹', '💫']
  const items = Array.from({ length: density }, (_, i) => {
    const dur = 20 + ((i * 7) % 22)
    const anim = `aspFloat ${dur}s linear ${-(((i * 5.3) % dur))}s infinite, aspSway ${6 + (i % 5)}s ease-in-out infinite`
    const left = `${((i * 37 + 5) % 100)}%`
    const kind = i % 3

    if (kind === 2) {
      // Soft rose silhouette — a small vertical capsule + a rounded bud on top.
      const h = 42 + ((i * 13) % 40)
      const w = Math.round(h * 0.35)
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left,
            top: 0,
            opacity: 0.14,
            filter: 'blur(2.5px)',
            animation: anim,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{
            width: `${w * 1.6}px`, height: `${w * 1.6}px`,
            borderRadius: '999px 999px 40% 40%',
            background: 'radial-gradient(circle at 40% 35%, #f0417e, #7c1236)',
          }} />
          <div style={{
            width: '2px', height: `${h}px`, marginTop: '-2px',
            background: 'linear-gradient(180deg, #ad1457, transparent)',
          }} />
        </div>
      )
    }
    if (kind === 1) {
      // Magenta glow orb.
      const s = 50 + ((i * 17) % 70)
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left,
            top: 0,
            width: `${s}px`, height: `${s}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(240,65,142,0.45),transparent 70%)',
            filter: 'blur(8px)',
            animation: anim,
          }}
        />
      )
    }
    // Romantic emoji.
    return (
      <span
        key={i}
        style={{
          position: 'absolute',
          left,
          top: 0,
          fontSize: `${20 + ((i * 11) % 28)}px`,
          opacity: 0.16,
          filter: 'blur(1px)',
          animation: anim,
        }}
      >
        {glyphs[i % glyphs.length]}
      </span>
    )
  })

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {items}
    </div>
  )
}
