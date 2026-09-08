import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/affiliate-disclosure'
const TITLE = 'Affiliate Disclosure — AI Companions Labs'
const DESC = 'How AI Companions Labs uses affiliate links, which partners we work with, and what this means for our reviews and rankings.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AffiliateDisclosurePage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Affiliate Disclosure', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Affiliate Disclosure</H1>
      <Lede>
        Some links on AI Companions Labs are affiliate links. If you sign up for a platform
        through one of our links, we may earn a commission at no additional cost to you.
      </Lede>

      <H2>Our current affiliate partners</H2>
      <P>
        Our primary affiliate partner is <strong>Secret Desires</strong>. Every "Try Secret Desires"
        button, every character page CTA, and the Editor&apos;s Pick placement on the homepage is an
        affiliate link.
      </P>
      <P>
        We may add other affiliate partners over time. Any new relationship will be disclosed here
        and on the review page for the relevant platform.
      </P>

      <H2>How affiliate links are marked</H2>
      <P>
        Every affiliate link on the site uses the HTML attribute <code>rel=&quot;sponsored&quot;</code>. This is
        the standard signal to search engines that a link is sponsored and should not pass ranking
        credit.
      </P>

      <H2>What affiliate relationships change</H2>
      <P>
        Which platform we feature most often. Secret Desires is our Editor&apos;s Pick and appears in
        the site nav, homepage hero and character-page CTAs because it is both our top-tested
        platform and our commercial partner.
      </P>

      <H2>What affiliate relationships do not change</H2>
      <P>
        Category winners. If another platform genuinely wins a category — better memory, better
        video, better free tier — we say so on the relevant best-of page and inside the review.
        Our scoring uses the published <a href="/methodology/">methodology</a> and is not adjusted
        because a platform is (or is not) a commercial partner.
      </P>

      <H2>What we do not accept</H2>
      <P>
        We do not accept payment to remove negative coverage, change a review score, or hide a
        competitor from a best-of list. If we ever accept a sponsored placement outside of an
        affiliate link, it will be clearly labelled as a sponsored placement or ad.
      </P>
    </PageLayout>
  )
}
