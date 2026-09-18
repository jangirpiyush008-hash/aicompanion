import type { Config } from 'tailwindcss'

// Design tokens straight from the handoff — 1:1 with the spec.
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#fcecf4',
        surface:   '#fff',
        ink:       '#2b0f1d',
        ink2:      '#331523',
        body:      '#6f4a5d',
        body2:     '#5c3c4d',
        muted:     '#8a6274',
        muted2:    '#a3818f',
        border1:   '#f6d3e1',
        border2:   '#f2b8cf',
        border3:   '#f0a3c2',
        border4:   '#f9c8da',
        pink1:     '#d6336c',
        pink2:     '#c2255c',
        pink3:     '#a61e4d',
        pink4:     '#e64980',
        pink5:     '#f783ac',
        pinkTint:  '#fde8f0',
        pinkTint2: '#fbd0e0',
        pinkGlow:  'rgba(230,73,128,0.25)',
        plum:      '#2b0f1d',
        plumBorder: 'rgba(255,255,255,0.12)',
        editor:    '#e8590c',
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
        'primary-gradient': 'linear-gradient(135deg,#f0417e,#ad1457)',
        'panel-gradient':   'linear-gradient(150deg,#f0417e,#ad1457 55%,#7c1236)',
      },
      boxShadow: {
        card:     '0 6px 24px rgba(120,30,70,0.14)',
        cta:      '0 8px 28px rgba(214,51,108,0.32)',
        ctaHover: '0 12px 40px rgba(214,51,108,0.55)',
        hover:    '0 18px 60px rgba(214,51,108,0.45)',
        editors:  '0 16px 60px rgba(214,51,108,0.22)',
        panel:    '0 24px 60px rgba(214,51,108,0.35)',
        hero:     '0 30px 70px rgba(120,30,70,0.28)',
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
