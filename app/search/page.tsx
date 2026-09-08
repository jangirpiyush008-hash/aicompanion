import type { Metadata } from 'next'
import PageLayout, { H1, Lede } from '@/components/PageLayout'
import SearchClient from './SearchClient'
import { buildSearchIndex } from '@/lib/search-index'
import { pageMetadata } from '@/lib/seo'

const PATH = '/search'
const TITLE = 'Search — AI Companions Labs'
const DESC = 'Search characters, reviews, comparisons, guides and hubs across AI Companions Labs.'

// noindex — search results pages are not something we want in the index.
export const metadata: Metadata = pageMetadata({
  title: TITLE, description: DESC, path: PATH, noindex: true,
})

export default function SearchPage() {
  const index = buildSearchIndex()
  return (
    <PageLayout
      wide
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Search', path: PATH }]}
    >
      <H1>Search</H1>
      <Lede>
        Search {index.length} pages across AI Companions Labs — characters, reviews,
        comparisons, guides and hubs.
      </Lede>

      <SearchClient index={index} />
    </PageLayout>
  )
}
