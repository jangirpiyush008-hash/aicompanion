'use client'

import { useEffect, useState } from 'react'

const KEY = 'acp_age_ok'

/**
 * 18+ age gate. Shown once per browser; choice persists in localStorage.
 * "I am 18+" → dismiss immediately (no transition). "Exit" → redirect to google.com.
 */
export default function AgeGate() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true)
    } catch {
      // localStorage blocked — safest to show the gate.
      setOpen(true)
    }
  }, [])

  if (!open) return null

  const enter = () => {
    try { localStorage.setItem(KEY, '1') } catch { /* noop */ }
    setOpen(false)
  }
  const exit = () => {
    window.location.href = 'https://www.google.com'
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(253,241,246,0.9)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 460,
          width: '100%',
          background: '#fff',
          border: '1px solid #f9c8da',
          borderRadius: 20,
          overflow: 'hidden',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(214,51,108,0.18)',
        }}
      >
        {/* Companion hero image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: '#fbd0e0', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/characters/karley/1.webp"
            alt="Featured AI companion — Karley (AI-generated character)"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 22%',
              display: 'block',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 55%, rgba(255,255,255,0.92) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute', left: 14, bottom: 14,
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid #f6d3e1',
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 11.5, fontWeight: 600, color: '#8a6274', lineHeight: 1,
            }}
          >
            <span aria-hidden="true" style={{ color: '#d6336c' }}>♥</span>
            AI-generated character
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px 40px 40px' }}>
          <div
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 13, letterSpacing: '0.22em', color: '#d6336c',
              textTransform: 'uppercase', marginBottom: 12, fontWeight: 600,
            }}
          >
            AICompanionPartner
          </div>
          <h2
            id="age-gate-title"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 28, margin: '0 0 12px', fontWeight: 600,
              color: '#2b0f1d', lineHeight: 1.15,
            }}
          >
            Welcome — meet your next AI companion.
          </h2>
          <p style={{ color: '#8a6274', fontSize: 14.5, lineHeight: 1.6, margin: '0 0 24px' }}>
            This website contains adult-oriented AI companion content and is intended for
            adults <strong style={{ color: '#c2255c' }}>18+</strong>.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={enter}
              style={{
                background: 'linear-gradient(135deg,#f0417e,#ad1457)',
                color: '#fff', border: 'none', borderRadius: 999,
                padding: '14px 32px',
                fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', boxShadow: '0 4px 24px rgba(214,51,108,0.35)',
              }}
            >
              I am 18+
            </button>
            <button
              type="button"
              onClick={exit}
              style={{
                background: 'transparent', color: '#8a6274',
                border: '1px solid #f0b7cc', borderRadius: 999,
                padding: '14px 32px',
                fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Exit
            </button>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: '#a3818f' }}>
            All characters are fictional, AI-generated adults.
          </div>
        </div>
      </div>
    </div>
  )
}
