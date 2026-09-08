import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import SecretDesiresCTA from '@/components/SecretDesiresCTA'
import ImageHubGrid, { allImages } from '@/components/ImageHubGrid'
import { pageMetadata, articleLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

const PATH = '/ai-girlfriend-images'
const TITLE = 'AI Girlfriend Images — Original AI-Generated Companion Gallery'
const DESC = 'Original AI-generated girlfriend images. Curated character galleries — tasteful, editorial, and clearly labelled as AI. Meet each character on Secret Desires.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function AIGirlfriendImagesHub() {
  const imgs = allImages()

  // ImageGallery + ImageObject payload for the whole hub. Each image is
  // hosted on our domain, so contentUrl and thumbnailUrl point back to us.
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
      copyrightNotice: '© AI Companions Labs',
      isFamilyFriendly: false,
    })),
  }

  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'AI Girlfriend Images', path: PATH }]}
      jsonLd={[
        articleLd({ headline: TITLE, description: DESC, path: PATH }),
        galleryLd,
      ]}
    >
      <H1>AI Girlfriend Images</H1>
      <Lede>
        Every image on this page is AI-generated for AI Companions Labs. No real people. Each
        image links to the character&apos;s full profile — and to their Secret Desires page where
        you can meet them properly.
      </Lede>

      <H2>The gallery</H2>
      <div style={{ margin: '10px 0 32px' }}>
        <ImageHubGrid />
      </div>

      <H2>How these images are made</H2>
      <P>
        Every character portrait on the site starts with a persona brief — personality,
        aesthetic, wardrobe, lighting — and is generated with modern image-diffusion models. The
        challenge is not producing one nice picture; it is producing 50 pictures of the same
        person in different scenes. That is the same-character consistency problem, and it is why
        we weight image consistency heavily in our AI companion reviews.
      </P>

      <H2>See the platforms we test</H2>
      <P>
        Curious how the platforms behind AI companion imagery actually compare?{' '}
        <a href="/reviews/secret-desires/" style={{ color: '#c2185b', fontWeight: 700 }}>Read our Secret Desires review</a>{' '}
        or see our{' '}
        <a href="/best-ai-girlfriend-for-images/" style={{ color: '#c2185b', fontWeight: 700 }}>best AI girlfriend for image generation</a>{' '}
        ranking.
      </P>

      <SecretDesiresCTA
        variant="bottom"
        label="Want an AI girlfriend that looks like this?"
        note="Create a custom AI companion with same-character image consistency on Secret Desires."
      />
    </PageLayout>
  )
}
