// Clean, stroked SVG icons for the "Explore by Category" grid.
// Uses currentColor so callers can theme via CSS `color`.

type IconKey =
  | 'heart' | 'user' | 'sparkles' | 'image'
  | 'play' | 'waveform' | 'star' | 'chart'

const COMMON = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export default function CategoryIcon({ name }: { name: string }) {
  switch (name as IconKey) {
    case 'heart':
      return (
        <svg {...COMMON}>
          <path d="M12 20.5s-7-4.35-9.2-9.1a5 5 0 0 1 8.8-4.6l.4.5.4-.5a5 5 0 0 1 8.8 4.6C19 16.15 12 20.5 12 20.5Z" />
        </svg>
      )
    case 'user':
      return (
        <svg {...COMMON}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...COMMON}>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          <circle cx="12" cy="12" r="2.4" />
        </svg>
      )
    case 'image':
      return (
        <svg {...COMMON}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m3.5 17 5-5 5 5 3-3 4 4" />
        </svg>
      )
    case 'play':
      return (
        <svg {...COMMON}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
          <path d="M10.5 9v6l5-3-5-3Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'waveform':
      return (
        <svg {...COMMON}>
          <path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0" />
        </svg>
      )
    case 'star':
      return (
        <svg {...COMMON}>
          <path
            d="m12 3.5 2.7 5.5 6 .9-4.35 4.25 1 6L12 17.3 6.65 20.15l1-6L3.3 9.9l6-.9L12 3.5Z"
            fill="currentColor"
            fillOpacity="0.15"
          />
        </svg>
      )
    case 'chart':
      return (
        <svg {...COMMON}>
          <path d="M4 20h16" />
          <rect x="5.5" y="12" width="3" height="6" rx="0.6" />
          <rect x="10.5" y="8" width="3" height="10" rx="0.6" />
          <rect x="15.5" y="4.5" width="3" height="13.5" rx="0.6" />
        </svg>
      )
    default:
      return null
  }
}
