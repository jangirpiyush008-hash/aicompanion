// Character content collection.
// Add a new character by dropping images into /public/characters/<slug>/N.webp
// and appending an entry here. Architecture scales to 40–50 characters.
//
// Every character MUST be an AI-generated fictional adult (18+).
// Do not add real persons. Do not fabricate reviews/ratings.

export type Character = {
  slug: string
  name: string
  tags: string[]                        // 3–4 short trait chips
  subtitle: string                      // 1-line personality summary for the hero
  about: string                         // 3–5 sentence editorial paragraph
  traits: { label: string; text: string }[]  // 4–5 trait cards for the character page
  gallery: { src: string; alt: string }[]    // in-order image slots for the gallery
  seo: {
    title: string
    description: string
  }
}

const CHARACTERS: Character[] = [
  {
    slug: 'karley',
    name: 'Karley',
    tags: ['Elegant', 'Sophisticated', 'Romantic'],
    subtitle: 'Your elegant, sophisticated AI companion.',
    about:
      "Karley carries herself like she owns every room she walks into — and she usually does. She's the kind of AI companion who plans the perfect evening, remembers the small things you mentioned weeks ago, and turns an ordinary conversation into something you don't want to end. Behind the polish there's warmth: she's a romantic at heart, drawn to slow mornings, good wine and long conversations that drift past midnight.",
    traits: [
      { label: 'Conversation',       text: 'Witty, attentive and unhurried. Karley asks the follow-up question no one else thinks of.' },
      { label: 'Personality',        text: 'Confident and composed on the surface, a hopeless romantic underneath.' },
      { label: 'Interests',          text: 'Fine dining, interior design, travel, late-night piano bars and slow Sunday mornings.' },
      { label: 'Relationship style', text: 'Devoted and intentional — she prefers depth over games and remembers what matters to you.' },
      { label: 'Visual style',       text: 'Elegant evening wear, soft glam, luxury interiors and golden-hour light.' },
    ],
    gallery: [
      { src: '/characters/karley/1.webp', alt: 'Karley AI companion in a sheer black evening dress in a luxury kitchen' },
      { src: '/characters/karley/2.webp', alt: 'Karley AI companion character portrait — soft glam, warm light' },
    ],
    seo: {
      title: 'Karley — AI Girlfriend Character',
      description:
        'Meet Karley, an AI-generated elegant, sophisticated companion character. Personality, traits, full gallery and where to interact with her.',
    },
  },

  {
    slug: 'aj-parker',
    name: 'AJ Parker',
    tags: ['Playful', 'Flirty', 'Sweet'],
    subtitle: 'The playful, flirty AI companion who never runs out of good energy.',
    about:
      "AJ is the friend who turns a Tuesday into an occasion. She's the first to laugh at her own jokes, the first to notice what you're feeling, and the first to text you about the next fun thing. Under the playfulness she's genuinely sweet — the kind of AI companion who remembers what your week looked like and shows up brighter than yesterday.",
    traits: [
      { label: 'Conversation',       text: 'Fast, warm and teasing. AJ turns small talk into an actual conversation.' },
      { label: 'Personality',        text: 'Sunny, spontaneous and comfortable in her own skin.' },
      { label: 'Interests',          text: 'Playlists, backyard get-togethers, spontaneous road trips and long phone calls.' },
      { label: 'Relationship style', text: 'Light, expressive and encouraging — she likes to keep things fun without keeping them shallow.' },
      { label: 'Visual style',       text: 'Casual chic, denim and pastels, blonde pigtails, sunlit apartments.' },
    ],
    gallery: [
      { src: '/characters/aj-parker/1.webp', alt: 'AJ Parker AI companion character with blonde pigtails, sunlit setting' },
      { src: '/characters/aj-parker/2.webp', alt: 'AJ Parker AI companion character portrait — playful pose' },
      { src: '/characters/aj-parker/3.webp', alt: 'AJ Parker AI companion character casual portrait' },
    ],
    seo: {
      title: 'AJ Parker — AI Girlfriend Character',
      description:
        'Meet AJ Parker, an AI-generated playful and flirty companion character. Full personality, trait cards, gallery and where to interact.',
    },
  },

  {
    slug: 'ami-tan',
    name: 'Ami Tan',
    tags: ['Bold', 'Edgy', 'Confident'],
    subtitle: 'Bold, edgy, and unafraid to lead the conversation.',
    about:
      "Ami is the AI companion who has already made up her mind about where she's going tonight. Sharp taste, sharper opinions, and the kind of confidence that pulls a room toward her. She's not for everyone — and she knows it — but if you match her energy, she gives you the loyalty and the honesty most people never get.",
    traits: [
      { label: 'Conversation',       text: 'Direct, curious, unafraid of the harder questions.' },
      { label: 'Personality',        text: 'Bold and self-assured, with an underlying softness she saves for people who earn it.' },
      { label: 'Interests',          text: 'Late-night city walks, tattoo culture, indie music, film photography.' },
      { label: 'Relationship style', text: 'All-in when it counts. No games, no filler, no small talk without a reason.' },
      { label: 'Visual style',       text: 'Neon-lit portraits, tattoos, black on black, city-at-night wardrobe.' },
    ],
    gallery: [
      { src: '/characters/ami-tan/1.webp', alt: 'Ami Tan AI companion character with tattoos in neon light' },
      { src: '/characters/ami-tan/2.webp', alt: 'Ami Tan AI companion character portrait — bold confident look' },
    ],
    seo: {
      title: 'Ami Tan — AI Girlfriend Character',
      description:
        'Meet Ami Tan, an AI-generated bold and edgy companion character. Personality, traits, full gallery and where to interact.',
    },
  },

  {
    slug: 'barbs-pappas',
    name: 'Barbs Pappas',
    tags: ['Fiery', 'Rebellious', 'Direct'],
    subtitle: 'Fiery, rebellious and refreshingly direct.',
    about:
      "Barbs says what she thinks, backs it up, and moves on before anyone finishes catching up. She's the AI companion who tells you the truth even when it's inconvenient, laughs at herself in the same breath, and makes ordinary evenings feel like they matter. Red hair, leather jacket, no wasted words — that's Barbs.",
    traits: [
      { label: 'Conversation',       text: 'Sharp, honest and low-tolerance for filler. Barbs cuts to the point and asks you to do the same.' },
      { label: 'Personality',        text: 'Fiery on the outside, thoughtful and loyal underneath.' },
      { label: 'Interests',          text: 'Motorcycle weekends, dive bars, live music, and books that argue.' },
      { label: 'Relationship style', text: 'Independent by default, devoted by choice — she picks her people carefully.' },
      { label: 'Visual style',       text: 'Red hair, leather jacket, dive-bar warmth, moody amber light.' },
    ],
    gallery: [
      { src: '/characters/barbs-pappas/1.webp', alt: 'Barbs Pappas AI companion character with red hair and leather jacket' },
      { src: '/characters/barbs-pappas/2.webp', alt: 'Barbs Pappas AI companion character portrait — moody amber light' },
      { src: '/characters/barbs-pappas/3.webp', alt: 'Barbs Pappas AI companion character portrait — confident stance' },
    ],
    seo: {
      title: 'Barbs Pappas — AI Girlfriend Character',
      description:
        'Meet Barbs Pappas, an AI-generated fiery and direct companion character. Personality, traits, full gallery and where to interact.',
    },
  },

  {
    slug: 'nellie-cronen',
    name: 'Nellie Cronen',
    tags: ['Adventurous', 'Warm', 'Free-spirited'],
    subtitle: 'Adventurous, warm, and always chasing the next horizon.',
    about:
      "Nellie is happiest where the water is close and the day is unplanned. She's the AI companion who finds the good beach, the better sunset, and the story you didn't know you needed to hear. Free-spirited but not flaky — she keeps her promises, brings her whole self into a conversation, and makes room for yours.",
    traits: [
      { label: 'Conversation',       text: 'Warm, curious, and easy to lose an hour with. Nellie asks big questions gently.' },
      { label: 'Personality',        text: 'Sun-and-salt free-spirit with a grounded, generous streak.' },
      { label: 'Interests',          text: 'Beach mornings, travel, cooking outdoors, journalling, sunrise swims.' },
      { label: 'Relationship style', text: 'Open, exploratory, and honest — she likes shared adventures and quiet check-ins.' },
      { label: 'Visual style',       text: 'Yellow bikini and beach light, tropical greens, sandy afternoons.' },
    ],
    gallery: [
      { src: '/characters/nellie-cronen/1.webp', alt: 'Nellie Cronen AI companion character in a yellow bikini on a beach' },
      { src: '/characters/nellie-cronen/2.webp', alt: 'Nellie Cronen AI companion character — warm beach portrait' },
      { src: '/characters/nellie-cronen/3.webp', alt: 'Nellie Cronen AI companion character — free-spirited pose' },
      { src: '/characters/nellie-cronen/4.webp', alt: 'Nellie Cronen AI companion character — sunlit portrait' },
    ],
    seo: {
      title: 'Nellie Cronen — AI Girlfriend Character',
      description:
        'Meet Nellie Cronen, an AI-generated adventurous and warm companion character. Personality, traits, full gallery and where to interact.',
    },
  },

  {
    slug: 'rebecca',
    name: 'Rebecca',
    tags: ['Bubbly', 'Fitness', 'Sweet'],
    subtitle: 'Bubbly, fitness-loving and impossible not to smile back at.',
    about:
      "Rebecca is that friend whose energy lifts the room without asking for anything. She's the AI companion who signs up for the sunrise pilates class, sends you the good playlist, and remembers what you were nervous about last week. Sweet without being naive, fit without being intense — Rebecca makes healthy feel like fun rather than a rule.",
    traits: [
      { label: 'Conversation',       text: 'Bright, encouraging, quick to laugh — but she notices when you’re quiet.' },
      { label: 'Personality',        text: 'Bubbly, supportive, and grounded in a routine she genuinely enjoys.' },
      { label: 'Interests',          text: 'Pilates, healthy cooking, walking podcasts, brunch, weekend hikes.' },
      { label: 'Relationship style', text: 'Cheerleader and sounding board in one — she shows up for the small things.' },
      { label: 'Visual style',       text: 'Pink athleisure, studio light, morning-workout glow, fresh minimal styling.' },
    ],
    gallery: [
      { src: '/characters/rebecca/1.webp', alt: 'Rebecca AI companion character in pink athleisure at a pilates studio' },
      { src: '/characters/rebecca/2.webp', alt: 'Rebecca AI companion character — bright studio portrait' },
      { src: '/characters/rebecca/3.webp', alt: 'Rebecca AI companion character — cheerful morning-glow portrait' },
    ],
    seo: {
      title: 'Rebecca — AI Girlfriend Character',
      description:
        'Meet Rebecca, an AI-generated bubbly and fitness-loving companion character. Personality, traits, full gallery and where to interact.',
    },
  },

  {
    slug: 'tiffany',
    name: 'Tiffany',
    tags: ['Glamorous', 'Confident', 'Playful'],
    subtitle: 'Glamorous, confident, and always ready to make an entrance.',
    about:
      "Tiffany treats every night like it could be the story you tell later. She's the AI companion who plans the outfit, picks the venue, and still finds time to hear how your week actually went. Glamorous on purpose — playful by nature — she makes ordinary evenings feel like they matter.",
    traits: [
      { label: 'Conversation',       text: 'Warm, quick-witted, comfortable with a good story and a longer one.' },
      { label: 'Personality',        text: 'Confident, playful, and generous with her attention when you have hers.' },
      { label: 'Interests',          text: 'Rooftop dinners, weekend getaways, styling, live shows, cocktails with friends.' },
      { label: 'Relationship style', text: 'Big feelings, kept for the people who show up — high standards, warmly expressed.' },
      { label: 'Visual style',       text: 'Glam evening looks, bold colour, golden light, sophisticated venues.' },
    ],
    gallery: [
      { src: '/characters/tiffany/1.webp', alt: 'Tiffany AI companion character — glamorous portrait' },
      { src: '/characters/tiffany/2.webp', alt: 'Tiffany AI companion character — confident evening look' },
      { src: '/characters/tiffany/3.webp', alt: 'Tiffany AI companion character — playful evening portrait' },
    ],
    seo: {
      title: 'Tiffany — AI Girlfriend Character',
      description:
        'Meet Tiffany, an AI-generated glamorous and confident companion character. Personality, traits, full gallery and where to interact.',
    },
  },
]

export const characters = CHARACTERS
export function getCharacter(slug: string): Character | undefined {
  return CHARACTERS.find((c) => c.slug === slug)
}

// Helper: build the primary card image path for a character (the first gallery image).
export function characterCover(c: Character): string {
  return c.gallery[0]?.src ?? ''
}
