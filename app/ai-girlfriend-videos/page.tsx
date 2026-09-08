import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout, { H1, Lede, H2, P, Callout } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/ai-girlfriend-videos'
const TITLE = 'AI Girlfriend Videos — The Honest State of Video in 2026'
const DESC = 'AI girlfriend video generation in 2026. Where the category actually is, what works today, and how to try the best available option.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AIGirlfriendVideosHub() {
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'AI Girlfriend Videos', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>AI Girlfriend Videos</H1>
      <Lede>
        We do not host AI girlfriend videos on this page. This is an editorial hub that
        summarises where video generation actually stands in the AI companion category in 2026 —
        because most other articles you&apos;ll find on this topic are selling you something.
      </Lede>

      <Callout title="Editorial position">
        AI girlfriend video is early. Every platform we&apos;ve tested produces short clips, none
        produce long fluid video. We say this on every review, every best-of, and here. Anyone
        promising something else is over-selling.
      </Callout>

      <H2>What actually works today</H2>
      <P>
        Short-form video — a few seconds, one action, one scene — works reliably on the leading
        platforms. Longer videos, complex motion, and multi-character scenes are still hit-or-miss
        and often break same-character consistency mid-clip.
      </P>

      <H2>The best available option in 2026</H2>
      <P>
        Secret Desires is our current best-available pick for video in the AI girlfriend category.
        It ships functional short-form video with reasonable character consistency, packaged
        alongside the strongest chat + image feature set we&apos;ve tested. See our{' '}
        <Link href="/reviews/secret-desires/" style={{ color: '#c2185b', fontWeight: 700 }}>full Secret Desires review</Link>{' '}
        or the{' '}
        <Link href="/best-ai-girlfriend-for-video/" style={{ color: '#c2185b', fontWeight: 700 }}>best AI girlfriend for video</Link>{' '}
        ranking.
      </P>

      <H2>What to expect in 2026-2027</H2>
      <P>
        The underlying video models are improving quickly. We expect long-form fluid video with
        character consistency to become genuinely usable within the next 12-18 months. When it
        happens, our video hub will grow to host our own testing clips.
      </P>

      <SecretDesiresCTA
        variant="bottom"
        label="Try the best available video today"
        note="Short-form AI companion video paired with the strongest chat + image experience we've tested."
      />
    </PageLayout>
  )
}
