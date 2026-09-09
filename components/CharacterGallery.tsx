'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

// Client-side gallery renderer with lightbox. Clicking any image opens a
// full-screen modal with the large image + a prominent SDAI CTA (deep-links
// to the character's SDAI profile if we have one, else generic sign-up).
// Keyboard: Esc closes, arrows navigate. Click-outside closes.

export type GalleryImage = {
  src: string
  alt: string
}

type Props = {
  images: GalleryImage[]     // unlocked images that open in the lightbox
  characterName: string
  ctaUrl: string             // SDAI profile URL or generic affiliate URL
  hasSdaiProfile: boolean    // controls CTA wording (specific vs generic)
}

export default function CharacterGallery({
  images,
  characterName,
  ctaUrl,
  hasSdaiProfile,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [screenshotNudgeOpen, setScreenshotNudgeOpen] = useState(false)
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  // Fire the flirty CTA nudge. Auto-dismisses after 10s so it never becomes
  // a permanent obstruction. Debounced via the ref so rapid triggers
  // (e.g. long-press → contextmenu → visibility change) don't stack.
  const fireScreenshotNudge = useCallback(() => {
    setScreenshotNudgeOpen(true)
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current)
    nudgeTimerRef.current = setTimeout(() => setScreenshotNudgeOpen(false), 10_000)
  }, [])

  // Keyboard handling — Esc close, arrows navigate + screenshot-key detection.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()

      // Screenshot-attempt heuristics — no browser exposes a "screenshot
      // taken" event, but these key combos strongly correlate with intent:
      //   • Windows / most Linux — PrintScreen
      //   • macOS  — Cmd+Shift+3 (full), Cmd+Shift+4 (region), Cmd+Shift+5 (tool)
      //   • Chrome DevTools / third-party tools can't be caught either way
      const key = e.key
      const isPrintScreen = key === 'PrintScreen' || key === 'PrtSc'
      const isMacScreenshot =
        e.metaKey && e.shiftKey && (key === '3' || key === '4' || key === '5')
      if (isPrintScreen || isMacScreenshot) {
        fireScreenshotNudge()
      }
    }

    // Visibility change — iOS Safari transitions to hidden briefly when the
    // screenshot editor pops up. Also fires on legitimate app-switch; we
    // accept the false positive rate because the nudge is friendly, not
    // adversarial.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        // Wait for the tab to come back before firing — nudging while the
        // user is elsewhere is pointless.
        const onReturn = () => {
          if (document.visibilityState === 'visible') {
            fireScreenshotNudge()
            document.removeEventListener('visibilitychange', onReturn)
          }
        }
        document.addEventListener('visibilitychange', onReturn)
      }
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)
    // Prevent body scroll while lightbox open.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
      document.body.style.overflow = prevOverflow
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current)
      setScreenshotNudgeOpen(false)
    }
  }, [isOpen, close, next, prev, fireScreenshotNudge])

  const activeImage = openIndex !== null ? images[openIndex] : null
  const ctaLabel = hasSdaiProfile
    ? `Chat with ${characterName} on Secret Desires`
    : 'Try Secret Desires'

  return (
    <>
      {/* Thumbnail grid — same look as before, but each tile is now a button
          that opens the lightbox instead of a static <Image>. */}
      <div style={{ display: 'contents' }}>
        {images.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open image ${i + 1} of ${characterName}`}
            style={thumbButton}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={600}
              height={800}
              loading={i > 1 ? 'lazy' : undefined}
              style={thumbImg}
            />
            <span aria-hidden="true" style={hoverHint}>
              Click to enlarge
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${characterName} — image ${openIndex! + 1} of ${images.length}`}
          onClick={close}
          style={backdrop}
        >
          {/* Close button — top-right */}
          <button
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            style={closeBtn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Prev / Next arrows — hide when only one image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                style={{ ...navBtn, left: 16 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
                style={{ ...navBtn, right: 16 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* Image + CTA panel — stopPropagation so clicking inside doesn't close. */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={panel}
          >
            <div style={imageFrame}>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={900}
                height={1200}
                priority
                draggable={false}
                onContextMenu={(e) => { e.preventDefault(); fireScreenshotNudge() }}
                onDragStart={(e) => { e.preventDefault(); fireScreenshotNudge() }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: 14,
                  display: 'block',
                  objectFit: 'contain',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              />

              {/* Flirty screenshot nudge — anchored to the image, auto-dismisses.
                  Copy is written in-character (first person) so it reads as the
                  character talking to the viewer, not a corporate popup. */}
              {screenshotNudgeOpen && (
                <div style={nudgeCard} role="alert">
                  <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={() => setScreenshotNudgeOpen(false)}
                    style={nudgeClose}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="#c2255c" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.25 }}>
                    Ohh — trying to take a screenshot of me?
                  </div>
                  <div style={{ fontSize: 14, color: '#5c3c4d', lineHeight: 1.5, margin: '6px 0 12px' }}>
                    Why not just talk to me instead? I promise I&rsquo;m more fun in person.
                  </div>
                  <a
                    href={ctaUrl}
                    rel="sponsored noopener nofollow"
                    target="_blank"
                    onClick={() => setScreenshotNudgeOpen(false)}
                    style={nudgeCta}
                  >
                    {hasSdaiProfile ? `Chat with ${characterName} now` : 'Come chat with me'}
                  </a>
                </div>
              )}
            </div>

            <div style={ctaBar}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>
                  {characterName}
                </div>
                <div style={{ fontSize: 13, color: '#ffd6e6' }}>
                  Image {openIndex! + 1} of {images.length} · AI-generated · 18+
                </div>
              </div>
              <a
                href={ctaUrl}
                rel="sponsored noopener nofollow"
                target="_blank"
                style={ctaButton}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const thumbButton: React.CSSProperties = {
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'zoom-in',
  position: 'relative',
  display: 'block',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
}

const thumbImg: React.CSSProperties = {
  width: '100%',
  aspectRatio: '3/4',
  objectFit: 'cover',
  objectPosition: 'top',
  borderRadius: 16,
  border: '3px solid #fff',
  display: 'block',
}

const hoverHint: React.CSSProperties = {
  position: 'absolute',
  right: 12,
  bottom: 12,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#fff',
  background: 'rgba(43,15,29,0.7)',
  padding: '5px 10px',
  borderRadius: 999,
  backdropFilter: 'blur(6px)',
}

const backdrop: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(20, 6, 14, 0.92)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
}

const closeBtn: React.CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  width: 40,
  height: 40,
  borderRadius: 999,
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.28)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  zIndex: 2,
}

const navBtn: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 44,
  height: 44,
  borderRadius: 999,
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.28)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  zIndex: 2,
}

const panel: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  maxWidth: 900,
  width: '100%',
}

const imageFrame: React.CSSProperties = {
  position: 'relative',   // anchors the screenshot nudge popup
  display: 'flex',
  justifyContent: 'center',
}

const ctaBar: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  background: 'linear-gradient(135deg, rgba(240,65,126,0.9), rgba(173,20,87,0.9))',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 14,
  padding: '14px 18px',
}

const ctaButton: React.CSSProperties = {
  background: '#fff',
  color: '#c2255c',
  borderRadius: 999,
  padding: '12px 22px',
  fontSize: 14,
  fontWeight: 800,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

// Flirty screenshot-nudge popup — floats over the bottom-right of the image
// inside the lightbox. Kept compact so it never fully obstructs the view.
const nudgeCard: React.CSSProperties = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  maxWidth: 300,
  background: 'linear-gradient(160deg, #fff, #fde8f0)',
  border: '1.5px solid #f2b8cf',
  borderRadius: 16,
  padding: '16px 18px',
  boxShadow: '0 12px 40px rgba(120,30,70,0.35)',
  zIndex: 3,
}

const nudgeClose: React.CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 8,
  width: 22,
  height: 22,
  borderRadius: 999,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const nudgeCta: React.CSSProperties = {
  display: 'inline-block',
  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
  color: '#fff',
  borderRadius: 999,
  padding: '10px 18px',
  fontSize: 13.5,
  fontWeight: 800,
  textDecoration: 'none',
  boxShadow: '0 6px 16px rgba(214,51,108,0.32)',
}
