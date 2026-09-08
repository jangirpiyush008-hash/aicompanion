import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

const PATH = '/about'
const TITLE = `About ${SITE.name} — AI Companion Discovery Platform`
const DESC = `${SITE.name} is an 18+ AI companion discovery platform. Original characters, hands-on reviews, honest comparisons and lab tests.`

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AboutPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>About AI Companions Labs</H1>
      <Lede>
        AI Companions Labs is an editorial platform for discovering, comparing and understanding
        AI companion apps — the 18+ chat products where the person on the other side is a
        persistent AI character.
      </Lede>

      <H2>What we do</H2>
      <P>
        We publish four kinds of content: original AI-generated characters with full profiles and
        galleries; hands-on reviews of AI companion platforms; head-to-head comparisons; and lab
        tests that stress-test specific features like memory, image consistency or voice quality.
      </P>

      <H2>Why we exist</H2>
      <P>
        The AI companion category grew fast, discovery is bad, and most existing coverage is either
        marketing copy or thinly-veiled affiliate content that treats every platform as "amazing".
        We want a serious media property that helps adults compare these apps on their real
        differences: memory depth, image consistency, character creation, pricing, privacy.
      </P>

      <H2>How our characters are created</H2>
      <P>
        Every character on the site is a fictional, AI-generated adult. We design the persona
        (personality, interests, aesthetic), generate the imagery, and write the editorial profile
        ourselves. We do not use real people, we do not scrape social media, and we do not publish
        anything that reads as underage or ambiguous.
      </P>

      <H2>How we work with platforms</H2>
      <P>
        We accept affiliate relationships and we disclose them in the review header, the article
        header, and every CTA. Secret Desires is currently our primary commercial partner and
        appears as Editor&apos;s Pick on the homepage. That relationship affects which platform we
        recommend most often, but it does not affect our category winners — if another platform
        genuinely wins a category, we say so.
      </P>
      <P>See the <a href="/affiliate-disclosure/">affiliate disclosure</a> for details and the
        <a href="/methodology/"> methodology</a> for how we score.</P>

      <H2>Editorial standards</H2>
      <UL items={[
        'We separate fact from opinion. Editorial takes are labelled.',
        'We only publish scores for platforms we have hands-on tested. Everything else is marked "Not yet independently tested".',
        'We do not fabricate pricing, features or ratings. When we cannot verify something, we say so.',
        'We update pricing and feature information as it changes and log significant changes in each article.',
        'All imagery is AI-generated and labelled as such. No real people are depicted.',
      ]} />

      <H2>Who runs it</H2>
      <P>
        Written and maintained by the AI Companions Labs Editorial Team. Contact details are on
        the <a href="/contact/">contact page</a>.
      </P>

      <SecretDesiresCTA variant="bottom" label="Ready to explore an AI companion platform?" />
    </PageLayout>
  )
}
