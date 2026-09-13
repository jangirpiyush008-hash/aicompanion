'use client'
import { useEffect, useState } from 'react'

const KEY = 'aiadult_age_gate'

export function AgeGate() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true) } catch { setShow(true) }
  }, [])
  if (!show) return null
  const accept = () => { try { localStorage.setItem(KEY, new Date().toISOString().slice(0, 10)) } catch {} setShow(false) }
  const leave = () => { window.location.href = 'https://www.google.com' }
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,10,5,.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-mid)', width: 480, maxWidth: '100%', borderRadius: 20, padding: 40, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20 }}>AI Adult Directory</div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500, marginTop: 2 }}>18+ · Updated weekly</div>
        <p style={{ fontSize: 15, lineHeight: 1.65, margin: '20px 0 24px' }}>
          This site contains adult content and lists platforms intended for users 18 and older.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={accept} style={{ background: 'var(--accent)', color: 'var(--bg)', border: 'none', fontWeight: 800, fontSize: 14, padding: '13px 24px', borderRadius: 999, cursor: 'pointer' }}>
            I am 18 or older
          </button>
          <button onClick={leave} style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-strong)', fontWeight: 700, fontSize: 14, padding: '13px 24px', borderRadius: 999, cursor: 'pointer' }}>
            Leave
          </button>
        </div>
        <p style={{ fontSize: 11.5, color: 'var(--text-subtle)', fontWeight: 500, marginTop: 20 }}>
          RTA-labeled site. Use parental control software to block adult content.
        </p>
      </div>
    </div>
  )
}
