import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import Script from 'next/script'
import { SITE } from '@/lib/site'
import AgeGate from '@/components/AgeGate'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import './globals.css'

// GA4 property — configure once. Loaded via next/script with the 'afterInteractive'
// strategy so it never blocks first paint.
const GA_ID = 'G-JP3DY9TE7X'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'AI Girlfriends, AI Companions & Reviews 2026 | AI Companions Labs',
    template: '%s | AI Companions Labs',
  },
  description:
    'Reviews of the best AI girlfriend apps, AI companions, AI boyfriend platforms, AI sex chat and AI roleplay tools. Original AI-generated characters, hands-on tests, honest comparisons. 18+.',
  applicationName: SITE.name,
  category: 'entertainment',
  // Root canonical — homepage self-canonicalises to SITE.url. Nested routes
  // override this via pageMetadata() in lib/seo.ts.
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'AI Girlfriends, AI Companions & Virtual Partners — Reviewed 2026',
    description: SITE.descriptionLong,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Girlfriends, AI Companions & Reviews 2026',
    description: SITE.descriptionShort,
  },
  robots: {
    index: true,
    follow: true,
    // Mark as adult so aggregators / SafeSearch filter appropriately.
    // Google recognises `rating: adult` in a <meta> tag; served via `other`.
  },
  other: {
    rating: 'adult',
    'rating-standard': 'RTA-5042-1996-1400-1577-RTA',
  },
}

// Age-gate rendered by layout so every route on the site is behind it.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        {children}
        <AgeGate />
        <MobileStickyCTA />

        {/* Google Analytics 4 — loads asynchronously after the page becomes interactive. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
