import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/corrections'
const TITLE = 'Corrections — Report an Error on AI Companions Labs'
const DESC = 'Spotted incorrect pricing, wrong feature information, a broken link or an outdated review? Report it and we will fix it.'
const SUPPORT_EMAIL = 'stackpicks.dev@gmail.com'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function CorrectionsPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Corrections', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Corrections</H1>
      <Lede>
        We fix mistakes. If something on the site is factually wrong, tell us.
      </Lede>

      <H2>What to report</H2>
      <UL items={[
        'Incorrect pricing.',
        'Incorrect feature claims (a platform does not actually support what we say it does, or vice versa).',
        'Broken links.',
        'Outdated review information — a platform has significantly changed and the review no longer matches.',
        'Any character or image that looks under-age or ambiguous. This is a priority.',
      ]} />

      <H2>How to report it</H2>
      <P>
        Email <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Correction')}`}>{SUPPORT_EMAIL}</a> with:
      </P>
      <UL items={[
        'The URL of the page.',
        'The specific claim or item that is wrong.',
        'What the correct information is, if you know.',
        'A source we can verify against, if possible.',
      ]} />

      <H2>What happens next</H2>
      <P>
        We reply within 3 business days. Factual corrections are made as quickly as we can verify
        them. Significant corrections are noted at the bottom of the affected article with a date.
      </P>
    </PageLayout>
  )
}
