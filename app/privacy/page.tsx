import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/privacy'
const TITLE = 'Privacy Policy — AI Companions Labs'
const DESC = 'How AI Companions Labs handles visitor data, analytics and affiliate tracking.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function PrivacyPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Privacy Policy</H1>
      <Lede>
        AI Companions Labs is an editorial website. We collect minimal data and share it only
        with the services listed below.
      </Lede>

      <H2>What we collect</H2>
      <UL items={[
        'Anonymous analytics: page views, referrer, country, device type — via Google Analytics 4.',
        'Age-gate confirmation: a local browser flag (localStorage key acp_age_ok) that stays on your device. It is not sent to us.',
        'Affiliate click tracking: when you click a Secret Desires link, the destination platform sees the affiliate ID in the URL. We do not receive any information about your subsequent activity on that platform.',
      ]} />

      <H2>What we do not collect</H2>
      <UL items={[
        'We do not run our own account system.',
        'We do not require you to sign in.',
        'We do not sell data to third parties.',
        'We do not use retargeting pixels.',
      ]} />

      <H2>Cookies</H2>
      <P>
        Google Analytics sets standard analytics cookies. You can decline them via your browser
        settings or a cookie-blocking extension without losing access to the site.
      </P>

      <H2>Third-party services</H2>
      <UL items={[
        'Google Analytics 4 — anonymous site analytics.',
        'Railway / Vercel — hosting and edge delivery.',
        'Secret Desires (via affiliate links) — you leave our site to reach them; their privacy policy applies once you do.',
      ]} />

      <H2>Data requests</H2>
      <P>
        Because we do not collect personally-identifying data, there is generally nothing to
        request or delete on our side. If you have a specific concern, email
        <a href="mailto:stackpicks.dev@gmail.com"> stackpicks.dev@gmail.com</a>.
      </P>

      <H2>Updates</H2>
      <P>Material changes to this policy are noted with the date of change.</P>
    </PageLayout>
  )
}
