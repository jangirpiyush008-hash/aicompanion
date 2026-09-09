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

    // Tracks whether we recently saw a Cmd+Shift keydown — used to catch
    // the immediate window blur that happens when macOS grabs focus for the
    // screenshot region tool.
    let macShortcutArmed = false

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()

      // Screenshot-attempt heuristics — no browser exposes a "screenshot
      // taken" event on any OS, but these key combos strongly correlate:
      //   • Windows / Linux — PrintScreen
      //   • macOS  — Cmd+Shift+3 (full), Cmd+Shift+4 (region), Cmd+Shift+5 (tool)
      //
      // IMPORTANT: use e.code (physical key) not e.key (typed character).
      // Shift+4 sends e.key = "$", not "4" — checking e.key silently missed
      // every Cmd+Shift+4 attempt. e.code is layout-agnostic and correct.
      const isPrintScreen = e.code === 'PrintScreen' || e.key === 'PrintScreen'
      const isMacScreenshot =
        e.metaKey && e.shiftKey &&
        (e.code === 'Digit3' || e.code === 'Digit4' || e.code === 'Digit5')

      if (isPrintScreen || isMacScreenshot) {
        fireScreenshotNudge()
        // Arm the blur listener — on macOS the screenshot tool immediately
        // steals focus, so we also treat the imminent blur as confirmation.
        macShortcutArmed = true
        setTimeout(() => { macShortcutArmed = false }, 1500)
      }

      // Belt-and-braces: any Cmd+Shift while lightbox is open with meta
      // arms the fallback in case the specific key event was swallowed by
      // the OS before it reached JS (some Safari builds do this).
      if (e.metaKey && e.shiftKey) {
        macShortcutArmed = true
        setTimeout(() => { macShortcutArmed = false }, 1500)
      }
    }

    // Blur fallback — macOS screenshot tools cause the window to lose focus
    // instantly. If we just saw Cmd+Shift, treat blur as a screenshot.
    const onBlur = () => {
      if (macShortcutArmed) {
        fireScreenshotNudge()
        macShortcutArmed = false
      }
    }

    // Visibility change — iOS Safari transitions to hidden briefly when the
    // screenshot editor pops up. Also fires on legitimate app-switch; we
    // accept the false positive rate because the nudge is friendly, not
    // adversarial. Only fire once per hide→show cycle.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        const onReturn = () => {
          if (document.visibilityState === 'visible') {
            fireScreenshotNudge()
            document.removeEventListener('visibilitychange', onReturn)
          }
        }
        document.addEventListener('visibilitychange', onReturn)
      }
    }

    // Listen at capture phase on document so we intercept before any child
    // handler can stop propagation.
    document.addEventListener('keydown', onKey, true)
    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onVisibility)
    // Prevent body scroll while lightbox open.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      window.removeEventListener('blur', onBlur)
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
              {/* Inline-block wrapper so the popup + CTA bar anchor to the
                  actual image dimensions, not the wider centering flex frame. */}
              <div style={imageWrap}>
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
                    maxHeight: '78vh',
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

                {/* Slim CTA bar overlaid at the bottom of the image — glass
                    instead of a heavy pink slab. Meta on the left, one-tap
                    CTA on the right. Reads as part of the image, not below. */}
                <div style={ctaBar}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {characterName}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.04em' }}>
                      {openIndex! + 1} / {images.length} · AI-generated · 18+
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

                {/* Flirty screenshot nudge — centered over the top of the
                    image so it reads immediately without covering her face.
                    Copy is in-character, first-person. Auto-dismisses in 10s. */}
                {screenshotNudgeOpen && (
                  <div style={nudgeCard} role="alert">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'nowrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>
                          Screenshot? Just talk to me instead
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.35 }}>
                          I promise I&rsquo;m more fun in person
                        </div>
                      </div>
                      <a
                        href={ctaUrl}
                        rel="sponsored noopener nofollow"
                        target="_blank"
                        onClick={() => setScreenshotNudgeOpen(false)}
                        style={nudgeCta}
                      >
                        {hasSdaiProfile ? `Chat with ${characterName.split(' ')[0]}` : 'Chat now'}
                      </a>
                      <button
                        type="button"
                        aria-label="Dismiss"
                        onClick={() => setScreenshotNudgeOpen(false)}
                        style={nudgeClose}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M6 6l12 12M18 6L6 18" stroke="rgba(255,255,255,0.85)" strokeWidth="2.4" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
  display: 'flex',
  justifyContent: 'center',
}

// Positioned wrapper sized to the actual image — everything anchored inside
// (CTA bar, screenshot nudge) tracks the image's true bounds, not the
// wider centering flex frame. Also gives the image its own rounded shadow.
const imageWrap: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  maxWidth: '100%',
}

// Slim overlaid CTA bar — glass, sits at the bottom of the image.
// Gradient scrim ensures readability even against light image content.
const ctaBar: React.CSSProperties = {
  position: 'absolute',
  left: 10,
  right: 10,
  bottom: 10,
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient(180deg, rgba(20,6,14,0.55), rgba(20,6,14,0.85))',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 12,
  padding: '10px 14px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
}

const ctaButton: React.CSSProperties = {
  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
  color: '#fff',
  borderRadius: 999,
  padding: '9px 18px',
  fontSize: 13,
  fontWeight: 800,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 12px rgba(214,51,108,0.4)',
  flexShrink: 0,
}

// Screenshot-nudge popup — compact horizontal chip, centered near the top
// of the image. Deliberately dark glass so it doesn't clash with the image
// and never fully covers the character's face.
const nudgeCard: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: 'calc(100% - 28px)',
  background: 'linear-gradient(180deg, rgba(20,6,14,0.72), rgba(43,15,29,0.88))',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 14,
  padding: '10px 12px 10px 16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
  zIndex: 4,
}

const nudgeClose: React.CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: 999,
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.16)',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const nudgeCta: React.CSSProperties = {
  display: 'inline-block',
  background: '#fff',
  color: '#c2255c',
  borderRadius: 999,
  padding: '8px 14px',
  fontSize: 12.5,
  fontWeight: 800,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}
