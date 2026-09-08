import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P, Callout } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/ai-companion-videos'
const TITLE = 'AI Companion Videos — Where the Category Actually Is in 2026'
const DESC = 'Honest editorial coverage of AI companion video generation in 2026 — what works, what does not, and the best available platform.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AICompanionVideosHub() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'AI Companion Videos', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Companion Videos</H1>
      <Lede>
        Video generation in AI companion apps is still early in 2026. This page is an editorial
        summary of where the category actually stands — not a video-hosting hub.
      </Lede>

      <Callout title="Status: Video coverage is limited">
        We do not publish our own video clips yet — the platforms we&apos;ve tested don&apos;t produce
        video good enough for us to want to stake our editorial reputation on hosting. When that
        changes, this hub will grow.
      </Callout>

      <H2>Which platforms support video today</H2>
      <P>
        Secret Desires ships functional short-form video generation. A handful of other platforms
        offer video features but the quality is inconsistent. Nomi (our memory pick) does not
        prioritise video.
      </P>

      <H2>Related</H2>
      <P>
        Read our{' '}
        <Link href="/best-ai-girlfriend-for-video/" style={{ color: '#c2185b', fontWeight: 700 }}>best AI girlfriend for video</Link>{' '}
        ranking or the{' '}
        <Link href="/reviews/secret-desires/" style={{ color: '#c2185b', fontWeight: 700 }}>Secret Desires review</Link>{' '}
        for the current best-available pick.
      </P>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}
