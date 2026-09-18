import { SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

// One CTA component, several visual variants. Every variant reads its href
// from the central affiliate config so we never hard-code the partner URL.
// Every variant carries rel="sponsored noopener nofollow" for compliance.

type Variant =
  | 'editorPick'      // headline card used on the home/review pages
  | 'inline'          // small inline pill inside prose
  | 'bottom'          // full-width bottom conversion panel
  | 'sticky'          // mobile sticky footer bar
  | 'reviewCTA'       // inside a review sidebar / verdict card
  | 'comparisonCTA'   // "Winner" or preferred choice card in a comparison
  | 'characterCTA'    // shown on a character page (uses per-character URL)

export default function SecretDesiresCTA({
  variant,
  label,
  characterName,
  hrefOverride,
  note,
}: {
  variant: Variant
  label?: string
  characterName?: string
  hrefOverride?: string
  note?: string
}) {
  const href = hrefOverride ?? SECRET_DESIRES_AFFILIATE_URL
  const text =
    label ??
    (characterName ? `Meet ${characterName} on Secret Desires` : 'Try Secret Desires')

  switch (variant) {
    case 'editorPick':
      return (
        <a
          href={href}
          rel="sponsored noopener nofollow"
          target="_blank"
          style={{
            background: 'linear-gradient(135deg,#f0417e,#ad1457)',
            color: '#fff',
            borderRadius: 999,
            padding: '13px 28px',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {text}
        </a>
      )

    case 'inline':
      return (
        <a
          href={href}
          rel="sponsored noopener nofollow"
          target="_blank"
          style={{
            color: '#c2185b',
            fontWeight: 700,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          {text}
        </a>
      )

    case 'bottom':
      return (
        <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '0 40px 64px' }}>
          <div
            style={{
              textAlign: 'center',
              background: 'linear-gradient(150deg,#f0417e,#ad1457 55%,#7c1236)',
              borderRadius: 24,
              padding: '48px 40px',
              boxShadow: '0 24px 60px rgba(214,51,108,0.35)',
            }}
          >
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              {label ?? 'Ready to meet your AI companion?'}
            </div>
            <p style={{ color: '#ffd6e6', fontSize: 15, margin: '0 auto 24px', maxWidth: 560 }}>
              {note ?? 'Chat, customize and create with AI companions on Secret Desires.'}
            </p>
            <a
              href={href}
              rel="sponsored noopener nofollow"
              target="_blank"
              style={{
                display: 'inline-block',
                background: '#fff',
                color: '#c2255c',
                borderRadius: 999,
                padding: '16px 34px',
                fontSize: 16,
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              {characterName ? `Meet ${characterName}` : 'Try Secret Desires'}
            </a>
            <div style={{ fontSize: 12, color: '#ffc2da', marginTop: 14 }}>
              18+ only · Sponsored link
            </div>
          </div>
        </section>
      )

    case 'sticky':
      return (
        <a
          href={href}
          rel="sponsored noopener nofollow"
          target="_blank"
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 12,
            zIndex: 40,
            background: 'linear-gradient(135deg,#f0417e,#ad1457)',
            color: '#fff',
            borderRadius: 999,
            padding: '14px 22px',
            fontSize: 15,
            fontWeight: 800,
            textAlign: 'center',
            textDecoration: 'none',
            boxShadow: '0 12px 32px rgba(214,51,108,0.45)',
          }}
          className="acl-mobile-sticky-cta"
        >
          {text}
        </a>
      )

    case 'reviewCTA':
      return (
        <div
          style={{
            background: '#fff',
            border: '1.5px solid #f2b8cf',
            borderRadius: 16,
            padding: '22px 22px',
            boxShadow: '0 8px 30px rgba(214,51,108,0.14)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8590c' }}>
            ★ Editor&apos;s Pick
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#2b0f1d' }}>
            Secret Desires
          </div>
          {note && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#6f4a5d' }}>{note}</p>}
          <a
            href={href}
            rel="sponsored noopener nofollow"
            target="_blank"
            style={{
              alignSelf: 'flex-start',
              marginTop: 6,
              background: 'linear-gradient(135deg,#f0417e,#ad1457)',
              color: '#fff',
              borderRadius: 999,
              padding: '11px 22px',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {text}
          </a>
          <div style={{ fontSize: 11, color: '#a3818f' }}>Sponsored · 18+</div>
        </div>
      )

    case 'comparisonCTA':
      return (
        <div
          style={{
            background: 'linear-gradient(150deg,#fff, #fde8f0)',
            border: '1.5px solid #f2b8cf',
            borderRadius: 16,
            padding: '20px 22px',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 240px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8590c' }}>
              Our pick
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d', marginTop: 4 }}>
              Secret Desires
            </div>
            {note && <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6f4a5d', lineHeight: 1.6 }}>{note}</p>}
          </div>
          <a
            href={href}
            rel="sponsored noopener nofollow"
            target="_blank"
            style={{
              background: 'linear-gradient(135deg,#f0417e,#ad1457)',
              color: '#fff',
              borderRadius: 999,
              padding: '12px 22px',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {text}
          </a>
        </div>
      )

    case 'characterCTA':
      return (
        <a
          href={href}
          rel="sponsored noopener nofollow"
          target="_blank"
          style={{
            background: 'linear-gradient(135deg,#f0417e,#ad1457)',
            color: '#fff',
            borderRadius: 999,
            padding: '16px 34px',
            fontSize: 16,
            fontWeight: 700,
            boxShadow: '0 8px 28px rgba(214,51,108,0.32)',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {text}
        </a>
      )
  }
}
