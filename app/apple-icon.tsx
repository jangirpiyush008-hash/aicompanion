import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Editorial monogram — matches app/icon.svg. Deliberately NOT a heart, so
// the site reads as an independent review publication rather than "another
// AI companion app". Dark plum plate + serif italic "A" + subtle pink rule.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3a1424 0%, #1a0810 100%)',
          borderRadius: 40,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: '"Times New Roman", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 140,
            color: '#f6ead6',
            lineHeight: 1,
            marginTop: -8,
            letterSpacing: -3,
          }}
        >
          A
        </div>
        <div
          style={{
            width: 62,
            height: 6,
            background: '#f0417e',
            borderRadius: 3,
            marginTop: -6,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
