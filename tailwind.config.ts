import type { Config } from 'tailwindcss'

// Design tokens — Dark Warm Orange v2 (per prototype handoff Sept 2026).
// Names preserved from the prior pink theme so existing components auto-inherit
// the new palette without any component-level rewrite.
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces (was pink pastels → now dark warm brown-orange)
        bg:        '#2A1810',
        surface:   '#3A2418',
        surface2:  '#4A2E1F',
        surfaceSdai: '#42250f',

        // Text (was dark plum → now warm off-white on dark)
        ink:       '#FFF5EC',
        ink2:      '#FFF5EC',
        body:      '#B8A090',
        body2:     '#B8A090',
        muted:     '#B8A090',
        muted2:    '#8f7a6a',

        // Borders / dividers (was pink tints → warm orange with alpha)
        border1:   'rgba(255,180,120,0.14)',
        border2:   'rgba(255,180,120,0.18)',
        border3:   'rgba(255,180,120,0.30)',
        border4:   'rgba(255,180,120,0.14)',

        // Accent family (was pink1-5 → now orange1-5, same slot names)
        pink1:     '#FF7A2E',
        pink2:     '#E8590C',
        pink3:     '#D9480F',
        pink4:     '#F76707',
        pink5:     '#FFB366',
        pinkTint:  'rgba(255,122,46,0.18)',
        pinkTint2: 'rgba(255,122,46,0.22)',
        pinkGlow:  'rgba(255,122,46,0.55)',

        // Deep panel + editor's-pick
        plum:       '#201008',
        plumBorder: 'rgba(255,180,120,0.14)',
        editor:     '#FFB366',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        body:    ['var(--font-manrope)', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        reading: '900px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg,#FF9A4D,#E8590C)',
        'panel-gradient':   'linear-gradient(150deg,#FF9A4D,#E8590C 55%,#D9480F)',
      },
      boxShadow: {
        card:     '0 8px 24px rgba(0,0,0,0.35)',
        cta:      '0 8px 24px rgba(255,122,46,0.32)',
        ctaHover: '0 12px 40px rgba(255,122,46,0.55)',
        hover:    '0 18px 60px rgba(255,122,46,0.35)',
        editors:  '0 16px 60px rgba(255,122,46,0.22)',
        panel:    '0 24px 60px rgba(0,0,0,0.5)',
        hero:     '0 30px 70px rgba(0,0,0,0.5)',
      },
      keyframes: {
        aspFloat: {
          '0%':   { transform: 'translateY(105vh) rotate(-8deg)' },
          '100%': { transform: 'translateY(-15vh) rotate(10deg)' },
        },
        aspSway: {
          '0%,100%': { marginLeft: '0' },
          '50%':     { marginLeft: '38px' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
