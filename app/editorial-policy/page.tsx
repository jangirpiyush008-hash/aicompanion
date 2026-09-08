import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/editorial-policy'
const TITLE = 'Editorial Policy — AI Companions Labs'
const DESC = 'How AI Companions Labs writes, reviews, updates and corrects its content. Editorial standards and affiliate disclosure principles.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function EditorialPolicyPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Editorial Policy', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Editorial Policy</H1>
      <Lede>
        These are the standards every piece of content on AI Companions Labs is written to.
      </Lede>

      <H2>Fact vs opinion</H2>
      <P>
        We distinguish factual claims from editorial opinion. Facts (pricing, features,
        availability) come from the platform itself or our own tests, are dated, and are updated
        when they change. Opinion (rankings, "best for", "our pick") is clearly framed as our
        editorial position and grounded in the published <a href="/methodology/">methodology</a>.
      </P>

      <H2>Testing</H2>
      <UL items={[
        'We only claim a platform has been "tested" when we have actually used it under the conditions described in the methodology.',
        'Every published score comes from real, dated testing. Untested platforms are labelled "Not yet independently tested" and do not receive a numeric score.',
        'When a platform is significantly updated, we retest and update the review with a new "Last updated" date.',
      ]} />

      <H2>Affiliate relationships</H2>
      <P>
        Some links on this site are affiliate links. If you sign up for a platform through one of
        our links, we may earn a commission at no additional cost to you. This is disclosed in the
        <a href="/affiliate-disclosure/"> affiliate disclosure</a> and again at the top of any page
        where the primary CTA is an affiliate link. Affiliate relationships do not affect our
        methodology or category winners.
      </P>

      <H2>Sponsorship</H2>
      <P>
        We do not accept payment to change a review score, remove negative coverage, or manipulate
        rankings. We may accept sponsorship for clearly-labelled ads or promoted placements — but
        never inside editorial content.
      </P>

      <H2>AI-generated content</H2>
      <UL items={[
        'All character imagery is AI-generated and labelled as such.',
        'No real people are depicted, and no minor / minor-coded characters are permitted.',
        'Editorial articles are written by the AI Companions Labs Editorial Team. When AI is used to draft or edit an article, a human editor reviews and approves the final published version.',
      ]} />

      <H2>Corrections</H2>
      <P>
        Mistakes get fixed. If you spot an error — incorrect pricing, wrong feature, broken link —
        report it via the <a href="/corrections/">corrections page</a>. Significant factual
        corrections are noted at the bottom of the affected article with a date.
      </P>

      <H2>Updates</H2>
      <P>
        Reviews, comparisons and best-of pages carry a "Last updated" date. We aim to revisit
        reviews at least every 90 days and any time a platform ships a major update.
      </P>
    </PageLayout>
  )
}
