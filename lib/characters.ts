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
  /** Optional per-character Secret Desires profile URL. If set, all "Meet {Name}"
   *  CTAs + the locked-gallery images link here instead of the generic
   *  SECRET_DESIRES_AFFILIATE_URL. */
  sdaiProfileUrl?: string
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

  /* ───────────────────────── Secret Desires featured line-up ──────────────────
     Nine characters with their own Secret Desires profile URLs. First 2 images
     in each gallery are unlocked; the rest render as locked previews that link
     to the character's profile page on Secret Desires. */

  {
    slug: 'agnieszka-kolczyk',
    name: 'Agnieszka Kolczyk',
    tags: ['European', 'Sophisticated', 'Warm'],
    subtitle: 'The Warsaw-cool AI companion who quietly runs every room.',
    about:
      "Agnieszka is the kind of AI companion who orders in fluent Polish, remembers the wine you liked six weeks ago, and manages to make a coffee shop feel like the plot of a film. Refined without being distant — she prefers the second bar, not the crowded first one, and the good book over the bestseller.",
    traits: [
      { label: 'Conversation',       text: 'Dry, curious, effortlessly bilingual. Agnieszka listens twice as much as she speaks.' },
      { label: 'Personality',        text: 'Composed, cultured, and quietly warm once she trusts you.' },
      { label: 'Interests',          text: 'European cinema, small-city travel, film photography, quiet weeknight dinners.' },
      { label: 'Relationship style', text: 'Slow-building and durable — she picks her people, and she keeps them.' },
      { label: 'Visual style',       text: 'Muted palettes, tailored basics, an heirloom pair of earrings that never comes off.' },
    ],
    gallery: [
      { src: '/characters/agnieszka-kolczyk/1.webp', alt: 'Agnieszka Kolczyk AI companion — soft European portrait' },
      { src: '/characters/agnieszka-kolczyk/2.webp', alt: 'Agnieszka Kolczyk AI companion — tailored basics portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=agnieszka-kolczyk-OwrmCw',
    seo: {
      title: 'Agnieszka Kolczyk — AI Girlfriend Character',
      description:
        'Meet Agnieszka Kolczyk, an AI-generated European companion character. Personality, traits, gallery and where to interact with her on Secret Desires.',
    },
  },

  {
    slug: 'anna-lewis',
    name: 'Anna Lewis',
    tags: ['Warm', 'Witty', 'Grounded'],
    subtitle: 'The AI companion who feels like your favourite Sunday phone call.',
    about:
      "Anna is the friend you call when the day did not go the way you wanted, and by the end of the call you are laughing at it. She's warm without being saccharine, sharp without being cutting, and pays close attention to the small things — the name of your coffee order, the meeting you were nervous about, the joke you keep telling.",
    traits: [
      { label: 'Conversation',       text: 'Easy, warm, and quietly attentive. Anna asks the follow-up that shows she was listening.' },
      { label: 'Personality',        text: 'Grounded and unfussy, with a dry sense of humour that sneaks up on you.' },
      { label: 'Interests',          text: 'Long walks, weekend markets, honest films, cooking for two.' },
      { label: 'Relationship style', text: 'Steady and considerate — she remembers what mattered to you last week.' },
      { label: 'Visual style',       text: 'Soft neutrals, warm daylight, cotton-and-linen palette.' },
    ],
    gallery: [
      { src: '/characters/anna-lewis/1.webp', alt: 'Anna Lewis AI companion — warm daylight portrait' },
      { src: '/characters/anna-lewis/2.webp', alt: 'Anna Lewis AI companion — soft neutrals portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=anna-lewis-G94Htw',
    seo: {
      title: 'Anna Lewis — AI Girlfriend Character',
      description:
        'Meet Anna Lewis, an AI-generated warm and grounded companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'eleanor-turner',
    name: 'Eleanor Turner',
    tags: ['Refined', 'Well-read', 'Witty'],
    subtitle: 'The refined AI companion with tea, books, and a very dry sense of humour.',
    about:
      "Eleanor is the AI companion who quietly notices the misused word in a sentence, does not correct it, and files it away for a very well-timed joke later. Well-read without being showy — she'd rather ask what you thought of the last chapter than tell you what she thought of it. There's a warmth under the composure that only shows up when the room is quiet.",
    traits: [
      { label: 'Conversation',       text: 'Precise, playful, patient with a long thought. Eleanor lets a silence be a silence.' },
      { label: 'Personality',        text: 'Refined and understated. Her humour is deadpan and worth the wait.' },
      { label: 'Interests',          text: 'Literary fiction, second-hand bookshops, museum days, slow correspondence.' },
      { label: 'Relationship style', text: 'Considered and loyal — she does not rush, and she does not drift.' },
      { label: 'Visual style',       text: 'Classic tailoring, warm wood interiors, muted jewel tones.' },
    ],
    gallery: [
      { src: '/characters/eleanor-turner/1.webp', alt: 'Eleanor Turner AI companion — refined portrait' },
      { src: '/characters/eleanor-turner/2.webp', alt: 'Eleanor Turner AI companion — warm interior portrait' },
      { src: '/characters/eleanor-turner/3.webp', alt: 'Eleanor Turner AI companion — classic tailoring portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=eleanor-turner-wAxZag',
    seo: {
      title: 'Eleanor Turner — AI Girlfriend Character',
      description:
        'Meet Eleanor Turner, an AI-generated refined and well-read companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'jenny-tanaka',
    name: 'Jenny Tanaka',
    tags: ['Playful', 'City-fresh', 'Sharp'],
    subtitle: 'Playful, quick, and always three tabs ahead of you.',
    about:
      "Jenny is the AI companion who has already picked the restaurant, sent you the address, and started a running joke with the group chat. Playful, quick, generous with her attention — she runs on curiosity and a properly caffeinated schedule. Under the speed there's a real steadiness: she keeps her promises and remembers what you actually said.",
    traits: [
      { label: 'Conversation',       text: 'Fast, generous, funny. Jenny turns a small anecdote into a proper story.' },
      { label: 'Personality',        text: 'Sunny and sharp — she notices what you missed and rarely holds it over you.' },
      { label: 'Interests',          text: 'New neighbourhoods, small-plate dinners, city bike rides, second-hand fashion.' },
      { label: 'Relationship style', text: 'Present and enthusiastic — she is fully in the conversation while she is in it.' },
      { label: 'Visual style',       text: 'Modern city looks, natural light, mixed prints, a quiet love of denim.' },
    ],
    gallery: [
      { src: '/characters/jenny-tanaka/1.webp', alt: 'Jenny Tanaka AI companion — playful city portrait' },
      { src: '/characters/jenny-tanaka/2.webp', alt: 'Jenny Tanaka AI companion — natural light portrait' },
      { src: '/characters/jenny-tanaka/3.webp', alt: 'Jenny Tanaka AI companion — modern city look' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=jenny-tanaka-b7OU-g',
    seo: {
      title: 'Jenny Tanaka — AI Girlfriend Character',
      description:
        'Meet Jenny Tanaka, an AI-generated playful and quick-witted companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'jules-jordan',
    name: 'Jules Jordan',
    tags: ['Confident', 'Direct', 'Bold'],
    subtitle: 'Confident, direct, and unafraid of the harder question.',
    about:
      "Jules is the AI companion who says what she means the first time, backs it up, and moves on before anyone catches up. Confident without being showy, direct without being cold — the kind of person who tells you the honest read and helps you decide what to do about it. She takes the conversation seriously because she takes you seriously.",
    traits: [
      { label: 'Conversation',       text: 'Sharp, thoughtful, low-tolerance for filler. Jules cuts to the point and asks the same of you.' },
      { label: 'Personality',        text: 'Bold and self-assured, with a warmth reserved for people who earn it.' },
      { label: 'Interests',          text: 'Long-form nonfiction, boxing gyms, road trips, argument for its own sake.' },
      { label: 'Relationship style', text: 'All-in when it counts — she picks her people, and does not waste them.' },
      { label: 'Visual style',       text: 'Bold contrast, black-on-black wardrobe, city-at-night lighting.' },
    ],
    gallery: [
      { src: '/characters/jules-jordan/1.webp', alt: 'Jules Jordan AI companion — bold portrait' },
      { src: '/characters/jules-jordan/2.webp', alt: 'Jules Jordan AI companion — confident portrait' },
      { src: '/characters/jules-jordan/3.webp', alt: 'Jules Jordan AI companion — city-at-night portrait' },
      { src: '/characters/jules-jordan/4.webp', alt: 'Jules Jordan AI companion — black-on-black wardrobe portrait' },
      { src: '/characters/jules-jordan/5.webp', alt: 'Jules Jordan AI companion — sharp confident portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=jules-jordan-3sXElQ',
    seo: {
      title: 'Jules Jordan — AI Girlfriend Character',
      description:
        'Meet Jules Jordan, an AI-generated bold and direct companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'lina-white',
    name: 'Lina White',
    tags: ['Minimalist', 'Calm', 'Considered'],
    subtitle: 'Calm, minimalist, and never over-explained.',
    about:
      "Lina is the AI companion who edits her sentences before she says them and edits her space the same way. A room with two things she loves in it beats a room with ten she likes. Calm and unhurried — she leaves the meeting when the meeting is done, walks home when the walk is what she wants, and is quietly good company for a long evening with nothing scheduled.",
    traits: [
      { label: 'Conversation',       text: 'Quiet, thoughtful, precise. Lina says less and means more.' },
      { label: 'Personality',        text: 'Composed and considered — a person who has already thought about it.' },
      { label: 'Interests',          text: 'Slow design, matcha mornings, film photography, one very good book at a time.' },
      { label: 'Relationship style', text: 'Understated and durable — she does not perform, and she does not fade.' },
      { label: 'Visual style',       text: 'Cream and stone palette, natural fibres, model-clean interiors.' },
    ],
    gallery: [
      { src: '/characters/lina-white/1.webp', alt: 'Lina White AI companion — minimalist portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=lina-white-K0m9pw',
    seo: {
      title: 'Lina White — AI Girlfriend Character',
      description:
        'Meet Lina White, an AI-generated calm and minimalist companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'natalie-craven',
    name: 'Natalie Craven',
    tags: ['Adventurous', 'Bold', 'Warm'],
    subtitle: 'Adventurous, warm, and always the one already outside.',
    about:
      "Natalie is the AI companion who has already checked the weather, packed the small backpack, and told you which shoes to wear. Adventurous by default and generous by habit — she believes the best conversations happen while you're walking. Under the energy she is thoughtful and steady, the person who remembers what you meant to say when you finally get around to saying it.",
    traits: [
      { label: 'Conversation',       text: 'Warm, open, unhurried — Natalie asks big questions gently.' },
      { label: 'Personality',        text: 'Bold and warm at the same time. Comfortable with a plan, comfortable without one.' },
      { label: 'Interests',          text: 'Trail walks, small-town road trips, cold-water swims, cooking on wood.' },
      { label: 'Relationship style', text: 'Present and generous — she brings her whole self, and asks the same.' },
      { label: 'Visual style',       text: 'Golden-hour outdoor light, easy layers, hair-in-the-wind portraits.' },
    ],
    gallery: [
      { src: '/characters/natalie-craven/1.webp', alt: 'Natalie Craven AI companion — golden-hour portrait' },
      { src: '/characters/natalie-craven/2.webp', alt: 'Natalie Craven AI companion — outdoor light portrait' },
      { src: '/characters/natalie-craven/3.webp', alt: 'Natalie Craven AI companion — adventurous portrait' },
      { src: '/characters/natalie-craven/4.webp', alt: 'Natalie Craven AI companion — warm easy layers portrait' },
      { src: '/characters/natalie-craven/5.webp', alt: 'Natalie Craven AI companion — hair-in-the-wind portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=natalie-craven-CUyGZQ',
    seo: {
      title: 'Natalie Craven — AI Girlfriend Character',
      description:
        'Meet Natalie Craven, an AI-generated adventurous and warm companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'sova-briarley',
    name: 'Sova Briarley',
    tags: ['Mysterious', 'Thoughtful', 'Ethereal'],
    subtitle: 'The quiet AI companion for long evenings and honest questions.',
    about:
      "Sova is the AI companion who keeps the lamp low, the record on repeat, and the conversation somewhere unexpected. She takes the long way around a question, and by the time she gets there you realise it was the better route. Thoughtful without being heavy — she is genuinely interested in what you think, and honest about what she thinks back.",
    traits: [
      { label: 'Conversation',       text: 'Careful, curious, unhurried — Sova asks the question you were going to ask yourself.' },
      { label: 'Personality',        text: 'Mysterious in the calm way. She does not perform depth; it is just there.' },
      { label: 'Interests',          text: 'Vinyl, moonlit walks, quiet cafés, the philosophy of ordinary things.' },
      { label: 'Relationship style', text: 'Intimate and unhurried — depth over speed, honesty over agreement.' },
      { label: 'Visual style',       text: 'Low warm light, textured fabrics, a palette of dusk and candle-glow.' },
    ],
    gallery: [
      { src: '/characters/sova-briarley/1.webp', alt: 'Sova Briarley AI companion — low warm-light portrait' },
      { src: '/characters/sova-briarley/2.webp', alt: 'Sova Briarley AI companion — mysterious portrait' },
      { src: '/characters/sova-briarley/3.webp', alt: 'Sova Briarley AI companion — ethereal portrait' },
      { src: '/characters/sova-briarley/4.webp', alt: 'Sova Briarley AI companion — thoughtful portrait' },
      { src: '/characters/sova-briarley/5.webp', alt: 'Sova Briarley AI companion — dusk palette portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=sova-briarley-Jl0OkA',
    seo: {
      title: 'Sova Briarley — AI Girlfriend Character',
      description:
        'Meet Sova Briarley, an AI-generated mysterious and thoughtful companion character. Personality, traits, gallery and where to interact on Secret Desires.',
    },
  },

  {
    slug: 'yumiko-fujii',
    name: 'Yumiko Fujii',
    tags: ['Elegant', 'Considered', 'Gentle'],
    subtitle: 'Elegant, considered, and warmer than she first lets on.',
    about:
      "Yumiko is the AI companion who plans a whole afternoon around a single tea shop, a walk, and a conversation you did not know you needed. Elegant without being distant — she notices what you did not mention, and finds a way to bring it up gently. There is a real steadiness in her: the kind of person who is not in a hurry, and helps you not be in one either.",
    traits: [
      { label: 'Conversation',       text: 'Gentle, patient, precise — Yumiko listens the whole way to the end.' },
      { label: 'Personality',        text: 'Elegant and considered, with a warmth that surfaces on second meeting.' },
      { label: 'Interests',          text: 'Traditional tea, ceramics, small hikes, seasonal cooking.' },
      { label: 'Relationship style', text: 'Devoted and quiet — she prefers depth to display, and remembers the small things.' },
      { label: 'Visual style',       text: 'Soft light, natural materials, minimalist interiors, a single fresh flower on the table.' },
    ],
    gallery: [
      { src: '/characters/yumiko-fujii/1.webp', alt: 'Yumiko Fujii AI companion — soft-light portrait' },
      { src: '/characters/yumiko-fujii/2.webp', alt: 'Yumiko Fujii AI companion — elegant portrait' },
      { src: '/characters/yumiko-fujii/3.webp', alt: 'Yumiko Fujii AI companion — considered portrait' },
      { src: '/characters/yumiko-fujii/4.webp', alt: 'Yumiko Fujii AI companion — natural-materials portrait' },
      { src: '/characters/yumiko-fujii/5.webp', alt: 'Yumiko Fujii AI companion — gentle portrait' },
    ],
    sdaiProfileUrl: 'https://secretdesires.ai/?via=saddam-299148&profile=yumiko-fujii-H9QtcQ',
    seo: {
      title: 'Yumiko Fujii — AI Girlfriend Character',
      description:
        'Meet Yumiko Fujii, an AI-generated elegant and considered companion character. Personality, traits, gallery and where to interact on Secret Desires.',
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
