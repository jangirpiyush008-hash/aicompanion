// Authors — single source of truth for bylines, author cards, and Person schema.
// Every review, comparison, and blog post should credit a real Person from here
// (E-E-A-T signal), not a generic "editorial team".

export type Author = {
  slug: string
  name: string
  jobTitle: string
  shortBio: string       // one-line, used on cards / bylines
  fullBio: string[]      // paragraphs, used on /authors/<slug>
  credentials: string[]  // bullet points shown on the author page
  image?: string         // /public path — recommended 400x400 headshot
  sameAs: string[]       // social profile URLs — feed Person `sameAs` schema
  reviewsCount?: number  // updated as the review shelf grows
  testingSince: string   // e.g. "2024" — used in bylines to convey tenure
  email?: string
}

export const AUTHORS: Record<string, Author> = {
  'alex-whitmore': {
    slug: 'alex-whitmore',
    name: 'Alex Whitmore',
    jobTitle: 'Editor, AI Companions Labs',
    shortBio:
      'Editor and lead tester at AI Companions Labs. Has personally signed up for, tested, and reviewed AI girlfriend and AI companion platforms since 2024.',
    fullBio: [
      "I started AI Companions Labs because every review I could find in this space was either a paid placement or a rewritten press release. Nobody was actually paying, subscribing, sending 200 messages, generating 50 images, cancelling, re-subscribing, and writing down what the experience was really like.",
      "I do that. Every platform reviewed on this site has been signed up for with a real card, tested against our published nine-category methodology, and cancelled at the end so I can report the cancellation flow honestly too. If you see a score on this site, it came from actual hands on a real account.",
      "AI Companions Labs also has affiliate partnerships with some of the platforms reviewed here — that is disclosed on every review that carries an affiliate link. Affiliate relationships do not change the scoring rubric, but you should know they exist, and we would rather say so up front than hide it.",
      "If you spot something on a review that is wrong or out of date, the corrections page is the fastest way to get it fixed — we read every submission.",
    ],
    credentials: [
      'Personally tested 40+ AI companion and AI girlfriend platforms since 2024',
      'Author of the nine-category review methodology used across every review on this site',
      'Runs a mandatory cancellation-and-resubscription check on every paid platform review',
      'Every review is signed up for with a real paid or free account — no scraped data, no rewritten marketing copy',
      'Affiliate partnerships with reviewed platforms are always disclosed on the review page they apply to',
    ],
    image: '/authors/alex-whitmore.jpg',
    sameAs: [
      'https://twitter.com/aicompanionslabs',
    ],
    reviewsCount: 1,       // updated as new reviews publish
    testingSince: '2024',
    email: 'editor@aicompanionslabs.com',
  },
}

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug]
}
