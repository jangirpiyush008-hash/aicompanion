import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P, UL } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/18-plus'
const TITLE = '18+ Notice — AI Companions Labs'
const DESC = 'AI Companions Labs is an 18+ site. All characters are fictional, AI-generated adults. No real people, no minors, no ambiguous ages.'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function EighteenPlusPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: '18+ Notice', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>18+ Notice</H1>
      <Lede>
        AI Companions Labs is intended for adults 18 years or older. If you are under 18, please
        leave this site.
      </Lede>

      <H2>Characters</H2>
      <UL items={[
        'Every character on this site is fictional and AI-generated.',
        'Every character is a clearly adult persona.',
        'No real people are depicted.',
        'No minor, minor-coded, ambiguous-age or youthful-looking sexual characters are permitted anywhere on this site.',
        'This applies to hero images, galleries, article thumbnails, and every other visual asset.',
      ]} />

      <H2>Content</H2>
      <P>
        Editorial content covers adult AI companion apps, some of which support explicit content.
        Where we discuss adult features we do so from an editorial perspective — reviewing,
        comparing, and evaluating platforms. We do not host explicit content on the site as SEO
        landing material.
      </P>

      <H2>Age gate</H2>
      <P>
        A local age gate confirms you are 18+ on your first visit. The confirmation is stored in
        your browser only.
      </P>

      <H2>Reporting concerns</H2>
      <P>
        If you believe any content on this site violates the standards above, email
        <a href="mailto:stackpicks.dev@gmail.com"> stackpicks.dev@gmail.com</a> immediately and we
        will investigate and remove it if warranted.
      </P>
    </PageLayout>
  )
}
