import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AI Companions Labs — AI Girlfriends, Companions & Reviews'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 88px',
          background:
            'radial-gradient(1000px 600px at 20% 15%, rgba(255,150,190,0.55), transparent 60%), radial-gradient(900px 500px at 90% 90%, rgba(214,51,108,0.55), transparent 60%), linear-gradient(135deg, #2b0f1d 0%, #4a1530 55%, #d6336c 100%)',
          fontFamily: 'sans-serif',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              background:
                'linear-gradient(135deg, #ff6fa4 0%, #d6336c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10-1.5.98-2.5.98-4 0z"
                fill="#fff"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', opacity: 0.95 }}>
              AI Companions Labs
            </div>
            <div style={{ fontSize: 18, opacity: 0.65, marginTop: 2 }}>
              aicompanionslabs.com
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              maxWidth: 960,
            }}
          >
            AI Girlfriends,
            <br />
            Companions &amp; Reviews.
          </div>
          <div style={{ fontSize: 30, opacity: 0.85, maxWidth: 900, lineHeight: 1.35 }}>
            18+ discovery platform · original AI-generated characters · hands-on
            platform reviews.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 20px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            <span
              style={{
                background: '#fff',
                color: '#d6336c',
                borderRadius: 8,
                padding: '2px 10px',
                fontWeight: 800,
              }}
            >
              18+
            </span>
            Adults only · Reviews · Comparisons · Lab tests
          </div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>2026</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
