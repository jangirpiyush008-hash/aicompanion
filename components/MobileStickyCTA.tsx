'use client'

import { useEffect, useState } from 'react'
import { SECRET_DESIRES_AFFILIATE_URL } from '@/lib/site'

// Bottom-of-screen sticky affiliate CTA — mobile only. Appears after the user
// scrolls past the hero (500px) so it doesn't compete with the hero CTA. Uses
// media query in inline style so it stays out of the way on desktop.
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={SECRET_DESIRES_AFFILIATE_URL}
      rel="sponsored noopener nofollow"
      target="_blank"
      className="acl-mobile-sticky"
      aria-label="Try Secret Desires"
      style={{
        position: 'fixed',
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 60,
        background: 'linear-gradient(135deg,#f0417e,#ad1457)',
        color: '#fff',
        borderRadius: 999,
        padding: '14px 22px',
        fontSize: 15,
        fontWeight: 800,
        textAlign: 'center',
        textDecoration: 'none',
        boxShadow: '0 12px 32px rgba(214,51,108,0.45)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 240ms ease',
      }}
    >
      Try Secret Desires →
    </a>
  )
}
