import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import ImageHubGrid, { allImages } from '@/components/ImageHubGrid'
import { pageMetadata, articleLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

const PATH = '/ai-companion-images'
const TITLE = 'AI Companion Images — Original AI-Generated Character Gallery'
const DESC = 'Original AI companion imagery — the full character gallery across every original character on AI Companions Labs.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AICompanionImagesHub() {
  const imgs = allImages()
  const galleryLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: TITLE,
    description: DESC,
    url: `${SITE.url}${PATH}/`,
    image: imgs.slice(0, 24).map((im) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE.url}${im.src}`,
      caption: im.alt,
      creditText: 'AI Companions Labs',
      creator: { '@type': 'Organization', name: SITE.name },
    })),
  }
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'AI Companion Images', path: PATH }]}
      jsonLd={[articleLd({ headline: TITLE, description: DESC, path: PATH }), galleryLd]}
    >
      <H1>AI Companion Images</H1>
      <Lede>
        Every image is AI-generated for editorial use on AI Companions Labs. Click any portrait
        to reach the character&apos;s full profile.
      </Lede>

      <div style={{ margin: '10px 0 32px' }}>
        <ImageHubGrid />
      </div>

      <H2>Categories</H2>
      <P>
        Prefer to browse by style? See{' '}
        <a href="/characters/romantic-ai-girlfriends/" style={{ color: '#c2185b', fontWeight: 700 }}>romantic</a>,{' '}
        <a href="/characters/playful-ai-girlfriends/" style={{ color: '#c2185b', fontWeight: 700 }}>playful</a>,{' '}
        <a href="/characters/confident-ai-girlfriends/" style={{ color: '#c2185b', fontWeight: 700 }}>confident</a>,{' '}
        <a href="/characters/ai-boyfriends/" style={{ color: '#c2185b', fontWeight: 700 }}>AI boyfriends</a>,{' '}
        <a href="/characters/anime-ai-companions/" style={{ color: '#c2185b', fontWeight: 700 }}>anime</a>{' '}
        or{' '}
        <a href="/characters/realistic-ai-companions/" style={{ color: '#c2185b', fontWeight: 700 }}>realistic</a>.
      </P>

      <SecretDesiresCTA variant="bottom" />
    </PageLayout>
  )
}
