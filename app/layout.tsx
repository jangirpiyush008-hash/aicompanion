import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import Script from 'next/script'
import { SITE } from '@/lib/site'
import { organizationLd, websiteLd } from '@/lib/seo'
import AgeGate from '@/components/AgeGate'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import './globals.css'

// GA4 property — configure once. Loaded via next/script with the 'lazyOnload'
// strategy so it fires only after the browser idles (post-hydration). Trades
// slight measurement-timing precision for a ~150-200ms TBT/INP improvement,
// which is worth it since analytics is not on the critical path.
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
    default: 'AI Adult Directory · 60+ AI Girlfriend & NSFW AI Sites Ranked',
    template: '%s · AI Adult Directory',
  },
  description: SITE.descriptionShort,
  applicationName: SITE.name,
  category: 'entertainment',
  // Root canonical — homepage self-canonicalises to SITE.url. Nested routes
  // override this via pageMetadata() in lib/seo.ts.
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'AI Adult Directory · Every AI Girlfriend, Sexting & NSFW AI Site, Ranked',
    description: SITE.descriptionLong,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Adult Directory · 60+ NSFW AI Sites, Ranked',
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

        {/* Organization + WebSite JSON-LD emitted on every route. Establishes the
            brand entity for Google + LLMs so it's not tied to any one page's
            crawlability. WebSite carries the SearchAction that unlocks the
            Google sitelinks searchbox feature. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />

        {/* Google Analytics 4 — loads asynchronously after the page becomes interactive. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');

            // Outbound-click tracking. Delegates to a single document listener
            // so every SDAI link, character card, sticky CTA, header button and
            // future component fires 'affiliate_click' without per-component
            // wiring. Marks the event with the target URL + link text so we can
            // see which surface drives paid conversions.
            document.addEventListener('click', function(e) {
              var a = e.target && e.target.closest ? e.target.closest('a') : null;
              if (!a || !a.href) return;
              var isAffiliate = a.href.indexOf('secretdesires.ai') !== -1;
              var isOutbound = a.hostname && a.hostname !== window.location.hostname;
              if (isAffiliate) {
                gtag('event', 'affiliate_click', {
                  destination: 'secret_desires',
                  link_url: a.href,
                  link_text: (a.innerText || '').trim().slice(0, 80),
                  page_path: window.location.pathname,
                });
              } else if (isOutbound) {
                gtag('event', 'outbound_click', {
                  link_url: a.href,
                  link_domain: a.hostname,
                  page_path: window.location.pathname,
                });
              }
            }, { capture: true });
          `}
        </Script>
      </body>
    </html>
  )
}
