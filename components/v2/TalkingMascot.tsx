'use client'
import { useEffect, useRef, useState } from 'react'

// 6 mouth-shape frames + 1 wink. Same character, same pose — only mouth changes.
// Cycling through them ~7 fps simulates a talking loop; occasional wink adds life.
const FRAMES = [
  '/brand/frames/frame-0-rest.jpg',   // 0 closed / rest
  '/brand/frames/frame-1-slight.jpg', // 1 slight open
  '/brand/frames/frame-2-open.jpg',   // 2 small open
  '/brand/frames/frame-3-mid.jpg',    // 3 medium open, teeth
  '/brand/frames/frame-4-wide.jpg',   // 4 wide open
  '/brand/frames/frame-5-wink.jpg',   // 5 wink + tongue (gesture)
] as const

// Sample "sentences" — short talking bursts with a pause between.
// Each entry is [frameIndex, holdMs]. Rest (0) at start + end of each sentence.
const SENTENCES: [number, number][][] = [
  [[0,120],[1,120],[2,130],[3,140],[2,120],[1,120],[3,140],[2,120],[1,130],[0,900]],
  [[0,100],[2,130],[4,150],[3,140],[2,120],[3,130],[1,120],[2,130],[0,1200]],
  [[0,100],[1,120],[3,140],[4,160],[3,130],[2,120],[1,120],[0,1000]],
  [[0,100],[5,320],[0,900]], // pure wink beat
  [[0,100],[2,130],[3,140],[1,120],[2,130],[3,140],[4,150],[2,130],[1,120],[0,1400]],
]

export function TalkingMascot({ alt = 'AI Adult Directory anime mascot' }: { alt?: string }) {
  const [current, setCurrent] = useState(0)
  const [sentenceIdx, setSentenceIdx] = useState(0)
  const [beatIdx, setBeatIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Preload all frames so no flicker on first cycle.
  useEffect(() => {
    FRAMES.forEach(src => { const img = new Image(); img.src = src })
  }, [])

  useEffect(() => {
    if (paused) return
    const sentence = SENTENCES[sentenceIdx]
    const [frame, hold] = sentence[beatIdx]
    setCurrent(frame)
    timer.current = setTimeout(() => {
      const nextBeat = beatIdx + 1
      if (nextBeat >= sentence.length) {
        setBeatIdx(0)
        setSentenceIdx((sentenceIdx + 1) % SENTENCES.length)
      } else {
        setBeatIdx(nextBeat)
      }
    }, hold)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [beatIdx, sentenceIdx, paused])

  // Pause when tab is hidden — saves cycles, resumes on visible.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div
      style={{ position: 'relative', aspectRatio: '3 / 4', maxHeight: 300, justifySelf: 'end', width: '100%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={alt}
    >
      {FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ''}
          aria-hidden={i !== 0}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 15%',
            opacity: current === i ? 1 : 0,
            transition: 'opacity 40ms linear',
            willChange: 'opacity',
          }}
          draggable={false}
        />
      ))}
    </div>
  )
}
