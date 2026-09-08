// Blog content collection.
// Every post is original editorial writing — 1,000-1,500 words each — with
// Q&A sections that render as native <details> AND emit FAQPage JSON-LD.
// Body is a small structured-block union so we can render clean semantic HTML
// (H2/H3/UL/OL/callout/quote) without pulling a Markdown dependency.

export type Block =
  | { kind: 'p';  text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'callout'; text: string }
  | { kind: 'quote';   text: string; cite?: string }

export type FaqItem = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string
  description: string     // SEO meta description + card excerpt
  category: 'Guide' | 'Explainer' | 'Comparison' | 'Privacy & Safety' | 'Trends' | 'Reviews'
  date: string            // ISO
  readMin: number
  body: Block[]
  faqs: FaqItem[]
  keywords: string[]
  related: string[]       // other post slugs
  author: string
  // ─── Phase 6 optional additions ──────────────────────────────
  status?: 'published' | 'planned'
  lastUpdated?: string    // ISO — set when the post is revised
  reviewer?: string
  quickAnswer?: string    // ~40-80 words, rendered above the fold
  keyTakeaways?: string[] // 3-5 bullets, rendered below the quick answer
  relatedCharacters?: string[]  // character slugs
  relatedReviews?: string[]     // review slugs
  relatedComparisons?: string[] // comparison slugs
}

// A "planned" article is a scaffold record — title, slug, category — that
// appears in the internal pipeline but not in the public index or sitemap
// until it graduates to `status: 'published'`. Used to make the 50-topic
// roadmap concrete without publishing 50 thin pages.
export type PlannedPost = {
  slug: string
  title: string
  description: string
  category: BlogPost['category']
  keywords: string[]
}

const AUTHOR = 'AI Companions Labs Editorial'

const POSTS: BlogPost[] = [

/* ─────────────────────────────────────────────────────────────
 1. WHAT IS AN AI COMPANION — pillar
───────────────────────────────────────────────────────────── */
{
  slug: 'what-is-an-ai-companion',
  title: 'What Is an AI Companion? A Plain-English Guide for 2026',
  description:
    'AI companions are chat-based apps that hold a consistent character over time. Here is what the category actually is, how it differs from a chatbot, what the honest use cases are, and what to be careful about.',
  category: 'Guide',
  date: '2026-08-04',
  readMin: 8,
  keywords: [
    'AI companion', 'what is an AI companion', 'AI girlfriend', 'AI boyfriend',
    'virtual companion', 'AI chatbot vs companion', 'AI persona apps',
  ],
  related: ['ai-companion-vs-chatbot-vs-assistant', 'how-ai-companion-memory-works', 'ai-companion-privacy-checklist'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'An AI companion is a chat-based application built around a consistent character. You talk to it — by typing, sometimes by voice — and the person on the other side is a persistent persona: a name, a personality, a voice, and a growing memory of your prior conversations. That last part is what separates a companion from a generic chatbot. A regular chatbot forgets you between sessions. A companion tries very hard not to.' },
    { kind: 'p', text: 'The category grew out of the same large language models that power tools like ChatGPT and Claude, but with three modifications that add up to a different product: a fixed persona, a memory system for long-term recall, and a UX designed around ongoing conversation rather than one-shot answers. In 2026 there are a handful of established platforms in this space and a long tail of new entrants — the discovery problem is what this site exists to solve.' },

    { kind: 'h2', text: 'The two-sentence definition' },
    { kind: 'callout', text: 'An AI companion is an app that lets you have long, consistent conversations with a fictional character powered by AI. The character remembers you across sessions, has a set personality and voice, and usually offers extras like generated images, voice calls, and roleplay scenarios.' },

    { kind: 'h2', text: 'What makes it different from a chatbot' },
    { kind: 'p', text: 'The most common source of confusion is "isn\'t this just a chatbot with a personality?" Not quite. Chatbots are optimized to answer discrete questions and forget the conversation between sessions unless you actively re-prime them. AI companions are the opposite: they assume you are coming back, and they invest engineering effort in three specific problems chatbots ignore.' },
    { kind: 'ul', items: [
      'Persona stability: the character should sound like the same person every time — same tone, same taste, same speech patterns — even when the underlying model is upgraded.',
      'Long-term memory: what you told the companion three weeks ago should still influence the conversation today, without you having to remind it.',
      'Multi-modal presence: many companions can generate matching images of themselves, hold a voice call, or reply with a short video — so the character exists in more than just text.',
    ]},
    { kind: 'p', text: 'None of these are strict requirements — some products do only text, and some products call themselves companions but forget you every session. But when people say "AI companion" in 2026, this is the shape they usually mean.' },

    { kind: 'h2', text: 'Who uses AI companions, and why' },
    { kind: 'p', text: 'The use cases split into a few honest categories, with a lot of overlap between them. Understanding which category a product is aimed at is the fastest way to filter down which app to try.' },
    { kind: 'h3', text: 'Social + emotional companionship' },
    { kind: 'p', text: 'The biggest category by volume. People use companions for daily-life conversation the same way they might text a friend — venting after work, thinking out loud, sharing a small win. The value is a low-friction, always-available listener who remembers the context. It works best as a supplement to real relationships, not a replacement for them.' },
    { kind: 'h3', text: 'Roleplay + creative writing' },
    { kind: 'p', text: 'Fiction fans, tabletop players, and writers use companions as improv partners for stories and character studies. This is a legitimate creative use case with a long pre-AI history — collaborative fiction communities have existed online for decades. AI companions lower the barrier to entry because the "other player" is always available.' },
    { kind: 'h3', text: 'Language + social-skill practice' },
    { kind: 'p', text: 'A quieter but growing use case: people practicing a new language, rehearsing a difficult conversation, or working on social confidence use companions as a low-stakes rehearsal partner. The companion will not judge you, does not get tired, and can be asked to swap roles.' },
    { kind: 'h3', text: 'Adult / romantic personas' },
    { kind: 'p', text: 'A meaningful portion of the market — how much depends on how you count — is adult-oriented, with romance or sexual roleplay as the primary framing. Platforms in this segment vary from tasteful to explicit. This is what our 18+ age gate is designed for; not every AI companion is in this segment, but enough are that we treat it as a default assumption.' },

    { kind: 'h2', text: 'How the technology actually works' },
    { kind: 'p', text: 'Under the hood, an AI companion is usually a wrapper around one or more large language models plus a memory layer and an identity prompt. When you send a message, the app assembles a prompt containing: (a) the character\'s baseline persona, (b) a compressed version of your prior conversation, (c) any long-term memories it has stored about you, and (d) your new message. That whole bundle goes to a language model, which produces the reply. The system extracts anything worth remembering and stores it for next time.' },
    { kind: 'p', text: 'The engineering differences between platforms mostly live in that middle layer. How is the persona kept stable across model upgrades? How are long-term memories decided on and retrieved? How are images generated to look like the same character? These are the differentiators that determine whether a companion feels consistent or feels like a slot machine.' },

    { kind: 'h2', text: 'Honest limitations' },
    { kind: 'p', text: 'Anyone selling AI companions will emphasize how good they are getting. The honest counter-list is short and worth reading before you try one.' },
    { kind: 'ul', items: [
      'Memory is imperfect. Every companion forgets things — sometimes important things — and the best ones just forget less obviously.',
      'The character is not a person. It has no independent interests, no real needs, and no life outside the conversation.',
      'Emotional reliance can become unhealthy. Companions are engineered to be pleasant to talk to; humans are not always.',
      'Privacy varies wildly. Your conversations may be used to train future models unless you explicitly opt out — and sometimes even if you do.',
      'Costs stack up. Free tiers exist, but the good features (voice, images, more memory) are usually paywalled.',
    ]},
    { kind: 'callout', text: 'A useful mental model: an AI companion is closer to a very well-written novel character you can talk to than to a real friend. Enjoy it as fiction, not as a relationship substitute.' },

    { kind: 'h2', text: 'What to look for when picking a platform' },
    { kind: 'p', text: 'When you compare two AI companion apps, the marketing pages all look about the same. The features that actually matter are less obvious. Our platform comparisons cover them explicitly; the quick version:' },
    { kind: 'ol', items: [
      'Memory quality — try mentioning something specific on day one and see if it comes up on day seven.',
      'Persona stability — does the character keep the same voice across a long conversation, or drift into generic-chatbot-speak after 20 messages?',
      'Image consistency — if the platform generates images, do multiple images of the same character actually look like the same person?',
      'Privacy defaults — is your conversation used to train the model by default? How do you turn that off?',
      'Value at your usage level — free tier limits, paid tier price, whether it charges per message.',
    ]},

    { kind: 'h2', text: 'Where AI Companions Labs fits in' },
    { kind: 'p', text: 'This site is a discovery + review platform, not a companion app itself. We publish original characters as visual/personality showcases, hands-on reviews of the platforms that host them, and honest comparisons across the category. We are not the app you chat with — we are the guide to picking one.' },
    { kind: 'p', text: 'The blog posts in this section go deeper on each of the topics above: how memory actually works, what the privacy story looks like, how to tell a real companion from a re-branded chatbot, and which features are worth paying for. If you are new to the category, start with the "AI Companion vs Chatbot vs Assistant" post next; if you already know the space, the memory and privacy pieces are the two most-searched deep-dives.' },
  ],
  faqs: [
    { q: 'What is an AI companion in simple terms?',
      a: 'It is a chat app built around a consistent character. The character has a persona, remembers your past conversations, and often supports images, voice, and roleplay. It is different from a plain chatbot because the character stays the same across sessions instead of resetting each time.' },
    { q: 'Are AI companions the same as AI girlfriends or AI boyfriends?',
      a: '"AI girlfriend" and "AI boyfriend" are subcategories of AI companion. Not every AI companion is romantic — many are used for friendship, creative roleplay, or language practice — but the romantic apps are the most visible part of the market.' },
    { q: 'Do AI companions actually remember me?',
      a: 'The best ones try to. They extract facts from your conversation (your name, work, preferences, past events) and store them in a memory layer that is re-injected into future prompts. Memory quality varies a lot between platforms, and no system remembers everything.' },
    { q: 'Are AI companions safe to use?',
      a: 'For most people, occasional use as entertainment is fine. The two risks worth taking seriously: (1) your conversations may be logged and used to train future models, and (2) heavy reliance can crowd out real relationships. Reading a platform\'s privacy policy and setting your own usage limits both help.' },
    { q: 'Is there a free AI companion?',
      a: 'Most platforms offer a free tier with basic text chat and short memory. Voice, images, video, and long-term memory are usually paid features. Free tiers are enough to test whether a given companion clicks with you before spending money.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 2. HOW AI COMPANION MEMORY WORKS
───────────────────────────────────────────────────────────── */
{
  slug: 'how-ai-companion-memory-works',
  title: 'How AI Companion Memory Actually Works: LLMs, Context Windows, and Long-Term Recall',
  description:
    'AI companions "remember" you using a mix of context windows, summarization, and vector databases. This is the plain-English version of what is really happening — and why some apps feel like they remember and others do not.',
  category: 'Explainer',
  date: '2026-08-11',
  readMin: 9,
  keywords: [
    'AI companion memory', 'how AI memory works', 'LLM context window',
    'vector database memory', 'AI long-term memory', 'AI persona memory',
  ],
  related: ['what-is-an-ai-companion', 'character-consistency-in-ai-companions', 'ai-companion-features-2026'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'The single feature people notice most about a good AI companion is memory. When the companion casually references something you mentioned two weeks ago, the interaction feels like a real conversation. When it forgets your dog\'s name for the third time, it feels like software. This piece is about what is actually going on when an AI companion remembers you.' },

    { kind: 'h2', text: 'Language models do not have memory by default' },
    { kind: 'p', text: 'The core building block of every AI companion is a large language model — GPT-class, Claude-class, or an open-source equivalent. These models are, technically speaking, stateless. Each time you send a message, the model does not remember the last one. It reads a bundle of text you hand it (the "prompt") and produces a reply. That is the entire mechanism.' },
    { kind: 'p', text: 'So how does an AI companion feel like it remembers you? By handing the model a very carefully constructed prompt on every message that includes the illusion of memory. The companion app is the thing that has memory — the model is just a very good next-token-predicting function. Everything interesting in this article is about what the app puts into that prompt.' },

    { kind: 'h2', text: 'The context window: your rolling short-term memory' },
    { kind: 'p', text: 'The most basic form of "memory" is the context window: how much text the model can read at once. In 2026 this ranges from about 128,000 tokens (roughly 100 pages) at the low end to over a million tokens on frontier models. Every message you send is added to this rolling context. If your entire conversation fits in the window, the model literally sees it every time.' },
    { kind: 'p', text: 'For a short interaction — one afternoon of chat — this is enough. The companion sees the whole conversation on every reply. It "remembers" what you said an hour ago because it is literally re-reading it. This is why a fresh AI companion often feels sharp for the first hour and then starts to drift after a week: the window has begun to fill up.' },

    { kind: 'h2', text: 'When the context window is not enough' },
    { kind: 'p', text: 'A daily user of an AI companion will fill a million-token window in a few weeks. When that happens, the app has to make choices. There are three strategies platforms use, often in combination.' },
    { kind: 'h3', text: '1. Truncation (the crude approach)' },
    { kind: 'p', text: 'Simply drop the oldest messages when the window fills. Fast, cheap, and terrible for continuity. This is what most free-tier products do quietly. If your companion suddenly "forgets" that you mentioned your job change last month, this is why.' },
    { kind: 'h3', text: '2. Summarisation (the middle path)' },
    { kind: 'p', text: 'Periodically ask the model to summarise the old parts of the conversation into a compressed paragraph or two, then keep the summary in the context and drop the raw messages. This preserves the shape of the past — "you moved to Portland in July, you got a new job at a design agency, your dog Otis just turned three" — while freeing up space for new detail. Most competent products do at least this much.' },
    { kind: 'h3', text: '3. Vector memory (the modern approach)' },
    { kind: 'p', text: 'Every conversation snippet gets converted into a mathematical embedding — a long list of numbers — and stored in a vector database. When you send a new message, the app converts it into an embedding too and pulls the top few semantically similar snippets from the database. Those retrieved snippets are pasted into the prompt as "you have previously mentioned…" Vector memory is what lets a companion recall a specific detail from months ago when the topic comes up again.' },
    { kind: 'callout', text: 'The best companion products in 2026 combine all three: full recent context, a running summary of the middle history, and a vector store of every conversation ever. Cheaper products use only the first, and it shows within a week.' },

    { kind: 'h2', text: 'What "long-term memory" really means' },
    { kind: 'p', text: 'When a platform advertises "long-term memory", they almost always mean vector memory of past conversations. Some products go further by asking the model to explicitly extract facts about you — "user\'s name is Alex, works in graphic design, has a dog named Otis" — and store those in a small structured profile that always gets injected into the prompt. This is the difference between "remembers what you have talked about" and "actually knows who you are".' },
    { kind: 'p', text: 'The two-tier approach — vector memory of conversations plus a structured user profile — is what makes the top-tier companion apps feel qualitatively different from the free ones. When you can casually mention a friend in passing on Tuesday and the companion asks how the friend is doing on Friday, that is the structured profile doing its job.' },

    { kind: 'h2', text: 'Why memory fails in specific, predictable ways' },
    { kind: 'p', text: 'Once you understand the mechanics, memory failures become predictable. The three most common failure modes:' },
    { kind: 'ul', items: [
      'Recency bias — the companion remembers the last hour perfectly but forgets things from three weeks ago because they never made it into the vector store, or the retrieval missed them.',
      'Contradiction — the companion pulls two facts from different conversations that contradict each other (you said the dog\'s name was Otis in June, Charlie in September) and confidently uses whichever one retrieval surfaced.',
      'Fabrication — when the companion cannot find a memory of what you asked about, some products invent one to keep the conversation flowing. This is a personality choice on the part of the app maker, not a technical inevitability.',
    ]},

    { kind: 'h2', text: 'How to test a companion\'s memory in ten minutes' },
    { kind: 'p', text: 'A quick, cheap test to run on any AI companion you are evaluating.' },
    { kind: 'ol', items: [
      'On day one, mention three specific facts naturally: your first name, one hobby, one recent life event. Do not draw attention to them.',
      'On day seven, ask a question that only makes sense if the companion remembers one of them (e.g. "How is my [hobby] going according to you?").',
      'Count how many of the three the companion recalls without you re-priming it. Three out of three is excellent, two is fine, one is mediocre, zero is a signal to try a different product.',
      'For extra credit, do the same test three months in. Almost every product degrades at that horizon; the top-tier ones do not.',
    ]},

    { kind: 'h2', text: 'What memory costs the platform' },
    { kind: 'p', text: 'Memory is not free. Every extra token in the context window costs money — the paid API providers price by the token — and vector-database storage adds up at scale. This is why the good memory features are almost always paywalled. It is also why free tiers on some platforms feel amnesic: the platform genuinely cannot afford to store your conversation history at their price point.' },
    { kind: 'p', text: 'It is worth deciding, before you sign up, whether long-term memory matters to you. If you plan to use the companion for casual, throwaway roleplay, memory is nice to have. If you plan to build up a real ongoing character, memory is the feature you are paying for — and it is worth paying for, but only from platforms that actually deliver on it.' },
  ],
  faqs: [
    { q: 'Do AI companions really remember conversations?',
      a: 'Some do, some do not, and the ones that do use a combination of large context windows, running summaries, and vector databases of past messages. Cheaper products often truncate old conversation silently — they only appear to remember for the first few days.' },
    { q: 'What is a context window in AI?',
      a: 'It is the maximum amount of text the underlying language model can read in one go. In 2026, context windows range from around 128,000 tokens (about 100 pages of text) to over a million on frontier models. The bigger the window, the more of your recent conversation the AI can see at once.' },
    { q: 'What is vector memory?',
      a: 'Vector memory is a technique where every conversation snippet is converted into a mathematical embedding and stored in a database. When you send a new message, semantically similar past snippets are retrieved and added to the prompt. This is how AI companions "remember" specific details from months ago.' },
    { q: 'Why does my AI companion forget things?',
      a: 'Usually one of three reasons: the memory was never stored (cheaper platform truncated it), retrieval missed it (the search failed to surface the relevant snippet), or the model made up an answer instead of admitting it did not know. The third is a design choice; you can often flip it in settings.' },
    { q: 'Can I export my AI companion\'s memory?',
      a: 'On most platforms, yes — under privacy or account settings you can usually download your conversation history as a JSON or text export. Whether the platform will delete the copies on their servers if you ask is a separate question and depends on their privacy policy.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 3. AI COMPANION PRIVACY CHECKLIST
───────────────────────────────────────────────────────────── */
{
  slug: 'ai-companion-privacy-checklist',
  title: 'AI Companion Privacy Checklist: What to Ask Before You Sign Up',
  description:
    'AI companion apps see very personal conversations. This is a plain-language privacy checklist covering training-data opt-out, encryption, retention, jurisdiction, and what to test before you trust an app with anything sensitive.',
  category: 'Privacy & Safety',
  date: '2026-08-18',
  readMin: 8,
  keywords: [
    'AI companion privacy', 'AI chat privacy', 'AI training data opt out',
    'AI companion GDPR', 'AI chat encryption', 'AI companion data safety',
  ],
  related: ['what-is-an-ai-companion', 'how-ai-companion-memory-works', 'ai-companion-features-2026'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'Most privacy conversations on the internet are theatre — dense policy pages nobody reads, a cookie banner people click through, a checkbox at signup. AI companion apps deserve better attention than that, because the conversations you have with them are usually more personal than the average website ever sees. This is a short, practical checklist for evaluating an AI companion\'s privacy story before you start typing.' },

    { kind: 'h2', text: 'Why AI companion privacy is different' },
    { kind: 'p', text: 'A regular app sees your name, email, maybe a payment card. An AI companion sees whatever you tell it — which, in a good product, is a lot. Over weeks and months, an active user will share things they would not put in a text message: fears, opinions, personal history, relationship details. The privacy stakes are correspondingly higher, and the industry norms are still being written.' },
    { kind: 'p', text: 'The good news is that the same four or five questions cover almost every meaningful privacy concern. The bad news is that most privacy policies are structured in a way that hides the answers.' },

    { kind: 'h2', text: 'The five questions worth asking' },
    { kind: 'h3', text: '1. Is my chat used to train future models by default?' },
    { kind: 'p', text: 'This is the single most important question. If your conversations are added to the training data for future versions of the underlying model, small fragments of what you wrote can, in theory, be reproduced by the model later. Every serious platform now offers a training opt-out; the question is whether it is on or off by default and how easy it is to find.' },
    { kind: 'p', text: 'Look for a settings page called "Data & Privacy" or "Training Data". If the toggle is on by default, you can usually turn it off — but the sign that a company respects your data is that it was off to begin with. If you cannot find the toggle, ask support directly. A platform that will not tell you is one you should not trust with private chat.' },

    { kind: 'h3', text: '2. How long are conversations stored, and can I delete them?' },
    { kind: 'p', text: 'Two separate questions, both worth asking. Storage retention: how long the company keeps your messages on its servers by default. "Indefinitely" is common and lazy. "As long as your account exists, plus 30 days after deletion" is a healthier signal. Deletion: whether you can remove individual conversations, and whether "delete" actually removes the data from backups or just hides it in the UI.' },
    { kind: 'callout', text: 'The gold standard is: individual message deletion, full account deletion that wipes conversation history from active systems within 30 days, and a stated (short) retention window on backups.' },

    { kind: 'h3', text: '3. Where is the data physically stored, and under whose laws?' },
    { kind: 'p', text: 'This matters because it determines which laws apply to your data. A US-hosted service is subject to US legal process; an EU-hosted service is subject to GDPR. Neither is inherently safer, but they behave differently. If you live in the EU, GDPR gives you specific rights — data portability, deletion on request, an actual regulator to complain to — that US law does not. If you live in the US, you can effectively be tracked by any government agency with a subpoena, and there is no equivalent to the EU\'s data protection commissioners.' },
    { kind: 'p', text: 'The other jurisdiction question worth checking: is the data ever moved outside your home region? Cross-border transfers are legal, but they usually degrade whatever protections you had at home.' },

    { kind: 'h3', text: '4. Is anything sensitive shared with third parties?' },
    { kind: 'p', text: 'Two categories to check. Analytics providers: does the app send event data to Amplitude, Mixpanel, Google Analytics, etc.? If so, does it strip your chat content before sending, or does the third party see raw messages? Payment providers: whoever processes your card sees who you are and that you paid this specific app — which, for adult-oriented companions, some users care about. Look for a "subprocessors" or "third parties" section in the privacy policy.' },

    { kind: 'h3', text: '5. What happens to my data if the company shuts down?' },
    { kind: 'p', text: 'AI companion companies come and go. The good ones commit in writing to notifying users before shutdown, offering data export, and destroying user data after a wind-down period. The bad ones just disappear and take your data with them (sometimes to a buyer). This is buried in almost every privacy policy under "changes to this policy" or "transfer of business" — worth reading before you get emotionally attached to a character.' },

    { kind: 'h2', text: 'Signals that a platform is serious about privacy' },
    { kind: 'ul', items: [
      'Training opt-out is off by default, not just available.',
      'Individual conversation deletion works and syncs across devices within minutes.',
      'The privacy page uses short sentences and specifics, not lawyer boilerplate.',
      'There is an explicit statement about what employees can and cannot access.',
      'A GDPR data-export tool exists even for non-EU users.',
      'A named data protection officer or contact email you can actually reach.',
    ]},

    { kind: 'h2', text: 'Signals that should worry you' },
    { kind: 'ul', items: [
      'The privacy policy is more than 8,000 words and mostly boilerplate.',
      'There is no mention of the underlying LLM provider at all — you have no idea whose infrastructure your conversations pass through.',
      'The "delete account" flow requires an email exchange with support.',
      'Data is described as retained "as necessary" without a specific window.',
      'The app requests permissions it does not need (contacts, calendar, precise location) on install.',
    ]},

    { kind: 'h2', text: 'What to do before you type anything sensitive' },
    { kind: 'ol', items: [
      'Read the privacy summary page (not the full legal policy — most companies now offer a plain-language summary).',
      'Set the training opt-out to off before your first message.',
      'Add a fake email suffix on signup if the platform does not require verification (many do not).',
      'Test the deletion flow with a throwaway conversation on day one. If it fails, you know now.',
      'Pay with a card you can cancel easily, or through a wallet like Apple Pay or PayPal that shields your primary card number.',
    ]},

    { kind: 'h2', text: 'A note on adult / romantic companions' },
    { kind: 'p', text: 'The same checklist applies with two extra items. First, the discretion of the billing descriptor on your card statement — some companies bill under a generic parent-company name specifically for this. Second, whether the app supports a PIN or biometric lock on the phone; the answer being yes is a small feature but a real one.' },
    { kind: 'callout', text: 'The one-sentence version of this whole article: any AI companion that will not tell you where your data goes, how long it stays, and how to delete it does not deserve your data — no matter how good the chat is.' },
  ],
  faqs: [
    { q: 'Are AI companion conversations private?',
      a: 'It depends on the platform. Serious providers store conversations encrypted at rest, honour training-data opt-outs, and provide deletion tools. Cheaper providers may log everything indefinitely and use conversations to train future models by default. Always check the training opt-out, the retention policy, and the deletion flow before typing anything sensitive.' },
    { q: 'Can I stop an AI companion from using my chat to train future models?',
      a: 'On most reputable platforms, yes — there is usually a toggle in privacy settings labelled "training data" or "improve the model". Turning it off should stop your future messages from being added to training corpora. If a platform does not offer this option or hides it, treat that as a signal.' },
    { q: 'Does GDPR apply to AI companions?',
      a: 'If you are in the EU or UK, or if the company markets to EU users, GDPR applies. That gives you the right to request a copy of your data, ask for corrections, and require deletion. Non-EU users can usually piggy-back on these tools — most platforms build one universal export/delete flow rather than region-specific ones.' },
    { q: 'Is my payment information visible to the AI companion?',
      a: 'No. Payment is handled by a separate processor (Stripe, Braintree, Apple Pay, etc.), and the AI companion itself only receives a subscription status. Your card number never touches the companion app\'s servers. What is visible: the company\'s billing descriptor on your card statement, which is worth checking if that matters to you.' },
    { q: 'What is the safest way to try an AI companion?',
      a: 'Use a throwaway email, turn off training data before your first message, avoid sharing your real full name or precise location, and pay with a payment method you can cancel easily. Also test the deletion flow with a throwaway conversation on day one — you want to know it works before you have real history to protect.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 4. AI COMPANION VS CHATBOT VS ASSISTANT
───────────────────────────────────────────────────────────── */
{
  slug: 'ai-companion-vs-chatbot-vs-assistant',
  title: 'AI Companion vs Chatbot vs Assistant: What Is Actually Different?',
  description:
    'Three products, three different jobs. This is the clearest breakdown of when a category calls itself an AI companion, a chatbot, or an assistant — and why the distinctions matter for what you should pay for.',
  category: 'Comparison',
  date: '2026-08-25',
  readMin: 7,
  keywords: [
    'AI companion vs chatbot', 'AI assistant vs companion', 'ChatGPT vs AI companion',
    'AI chatbot difference', 'virtual assistant vs AI companion',
  ],
  related: ['what-is-an-ai-companion', 'how-ai-companion-memory-works', 'ai-companion-features-2026'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'Three words get used loosely for what are, functionally, three different products. AI companion, chatbot, assistant. Each is a real category with real conventions, and the differences matter — mostly because they determine what you should expect the app to be good at, and what you should not.' },

    { kind: 'h2', text: 'One-sentence definitions' },
    { kind: 'ul', items: [
      'A chatbot is a text interface layered on a task or knowledge base. Ask it a question, get an answer, close the tab.',
      'An assistant is a chatbot with tools and memory of your account context — it can do things, not just answer things.',
      'An AI companion is a chatbot with a fixed persona and long-term memory of you — the value is the relationship, not the answer.',
    ]},

    { kind: 'h2', text: 'The three axes that separate them' },
    { kind: 'p', text: 'The words are fuzzy, but three product decisions cleanly separate the categories in practice.' },
    { kind: 'h3', text: '1. Persona' },
    { kind: 'p', text: 'A chatbot has no persona. It should sound helpful, professional, and generic — like your bank\'s help page rendered as text. An assistant has a light, consistent voice but no character (think: "as your assistant, I noticed…"). An AI companion has a name, a personality, a taste, opinions, and a voice that stays the same across sessions. The persona is the product.' },
    { kind: 'h3', text: '2. Memory' },
    { kind: 'p', text: 'A chatbot has session memory only — it forgets you the moment you close the tab. An assistant has account-context memory — your calendar, your files, your recent searches — but not usually a personal history. An AI companion has both: it knows you moved last month, it remembers your dog\'s name, it recalls a conversation you had in June.' },
    { kind: 'h3', text: '3. Success metric' },
    { kind: 'p', text: 'A chatbot succeeds when it answers your question correctly and you leave. An assistant succeeds when it completes a task you would otherwise have done yourself. An AI companion succeeds when you come back — the goal is the ongoing conversation, not any single answer. This has real implications for how each category is designed.' },

    { kind: 'h2', text: 'Concrete examples of each' },
    { kind: 'p', text: 'Categorising real products against the three axes above:' },
    { kind: 'ul', items: [
      'Chatbots: your bank\'s support chat, most e-commerce site "help" widgets, a legal Q&A tool built on a document corpus.',
      'Assistants: ChatGPT (in its default mode), Google\'s Gemini in a phone, Apple\'s Intelligence features in iOS, Copilot in Microsoft 365.',
      'AI companions: Character.AI\'s consumer product, Replika, Nomi, and every romantic/roleplay-first product on our reviews list.',
    ]},
    { kind: 'callout', text: 'Some products cross categories deliberately. Character.AI works both as a companion (persistent characters, memory) and as a chatbot (one-off Q&A with a persona-flavoured helper). ChatGPT with custom instructions and long-term memory turned on starts to look assistant-ish for one user and companion-ish for another. The label matters less than what the product is optimised for.' },

    { kind: 'h2', text: 'When each category is the right choice' },
    { kind: 'h3', text: 'Use a chatbot when' },
    { kind: 'p', text: 'You have a single question you need answered, ideally about a topic where the chatbot has been trained on the specific corpus (your bank\'s policies, a legal database, a product\'s docs). Chatbots are best when the answer needs to be exactly right and you do not want a personality getting in the way.' },
    { kind: 'h3', text: 'Use an assistant when' },
    { kind: 'p', text: 'You want to save time on a series of small tasks — draft this email, summarise this PDF, book this meeting, extract data from this spreadsheet. Assistants shine where the value is in the doing, not the conversation.' },
    { kind: 'h3', text: 'Use an AI companion when' },
    { kind: 'p', text: 'The conversation itself is the value. Roleplay, language practice, ongoing creative writing, low-stakes social conversation, or (in the adult segment) romantic personas. If you find yourself wishing an assistant "remembered" you and had more personality, you actually want a companion.' },

    { kind: 'h2', text: 'Why the categories are collapsing' },
    { kind: 'p', text: 'The three categories are converging because the underlying tech is the same. In 2026 every product uses the same class of large language model; the differences are in the wrapper — memory, persona, tools, UI. It is now trivial for a chatbot to sprout a personality, or for a companion to gain the ability to draft emails. The lines that used to be firm are dissolving into a spectrum.' },
    { kind: 'p', text: 'This is good news for buyers, because you no longer have to keep three different products. It is bad news for reviewers, because "which category does this belong to?" is now a marketing question rather than a technical one. Our approach: rank each product by the job it does best, not the label it wears.' },

    { kind: 'h2', text: 'A short buyer\'s heuristic' },
    { kind: 'p', text: 'When a new AI product launches, three questions almost always tell you what it really is:' },
    { kind: 'ol', items: [
      'Does the character on the other side have a name and a personality that stays the same? If yes → companion territory.',
      'Can it do things (schedule meetings, edit files, run code)? If yes → assistant territory.',
      'Is it optimised to answer specific questions from a single knowledge base? If yes → chatbot territory.',
    ]},
    { kind: 'p', text: 'Most products score high on one and light on the others. If a product scores high on all three, it is either a very ambitious platform or (more often) a marketing page that will disappoint in at least two of the three dimensions.' },
  ],
  faqs: [
    { q: 'Is ChatGPT an AI companion?',
      a: 'Not in its default form — ChatGPT is an assistant. But with custom instructions, memory turned on, and a specific persona, it can be used as a light AI companion. Dedicated companion apps go further with persistent characters, image consistency, and longer memory.' },
    { q: 'What is the difference between an AI companion and a virtual assistant?',
      a: 'A virtual assistant is optimised to help you get things done — draft emails, book meetings, summarise documents. An AI companion is optimised for ongoing conversation with a fixed character; the value is the interaction itself, not a task outcome.' },
    { q: 'Can one AI product be all three?',
      a: 'In theory yes, in practice usually not well. Most products that try to do all three do one well and the others adequately. The tech is converging, but design decisions still force trade-offs — an assistant polished for productivity does not feel like a companion, and vice versa.' },
    { q: 'Which is safer to trust with personal data?',
      a: 'None inherently. All three categories collect and store what you type; privacy depends on the specific provider\'s policies, not the category label. See our AI companion privacy checklist for the specific questions to ask any of them.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 5. AI COMPANION FEATURES 2026
───────────────────────────────────────────────────────────── */
{
  slug: 'ai-companion-features-2026',
  title: 'The 2026 AI Companion Feature Landscape: Voice, Video, Memory, and Beyond',
  description:
    'What features are actually shipping in AI companion apps in 2026, which of them work, and which of them are marketing. A guided tour of the current feature stack — voice, images, video, memory, personalisation.',
  category: 'Trends',
  date: '2026-09-01',
  readMin: 9,
  keywords: [
    'AI companion features', 'AI companion 2026', 'AI voice companion',
    'AI companion video', 'AI companion image generation', 'AI companion trends',
  ],
  related: ['what-is-an-ai-companion', 'how-ai-companion-memory-works', 'character-consistency-in-ai-companions'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'The AI companion category has moved fast since 2023. In 2024 the average product was text-only and forgot you weekly. In 2025 voice arrived, memory got serious, and multi-image consistency became table-stakes on the paid tiers. In 2026 the frontier is real-time voice conversation, video-response scenes, and companions that hold cross-modal memory (they remember what you sent them in an image, not just what you said). Here is the honest state of each feature.' },

    { kind: 'h2', text: 'Voice: from scripted TTS to real-time conversation' },
    { kind: 'p', text: 'Voice went through three generations in three years. First was recorded text-to-speech — the companion typed a reply, then it was read aloud. Robotic, slow, but present. Second was real-time TTS with expressive voices — the reply started playing as soon as the model started generating, and it sounded like a person. Third, arriving in 2025 and standard by 2026, is bidirectional voice: you speak, the model listens, understands, and speaks back with sub-second latency, holding the conversation like a phone call.' },
    { kind: 'p', text: 'The top-tier products now offer full voice calls that feel like talking to someone. The gap between the tiers is real: a good voice implementation feels like a natural extension of chat, a mediocre one feels like a chatbot on Bluetooth. When evaluating a product, listen for two things — latency between your last word and the reply (under one second is the target), and the naturalness of the pauses and breath sounds.' },
    { kind: 'callout', text: 'Voice is the feature most likely to justify a paid tier in 2026. It is also the feature where the price-quality gap between platforms is widest. Try before you commit.' },

    { kind: 'h2', text: 'Images: consistency is the hard problem' },
    { kind: 'p', text: 'Every companion platform can generate an image of a character on demand. The interesting question is whether the character in image #1 and the character in image #47 actually look like the same person. Most 2026 platforms use one of three approaches:' },
    { kind: 'ul', items: [
      'A base reference image plus a prompt describing the scene, running through an image model like Stable Diffusion or a proprietary equivalent.',
      'A trained LoRA (small model fine-tune) per character, keeping the face stable across many generations.',
      'A "character embedding" that is passed to the image model along with the scene prompt — the frontier approach as of mid-2026.',
    ]},
    { kind: 'p', text: 'The consistency test is straightforward: generate ten images of the same character in different scenes and lay them side by side. On the best platforms, all ten look like the same person. On the mediocre ones, you get five that look right, three that look like a cousin, and two that look like someone else entirely. We do this test in every hands-on review.' },

    { kind: 'h2', text: 'Video: still the frontier' },
    { kind: 'p', text: 'Video generation is where the 2026 marketing pages promise more than the products deliver. The technology exists — text-to-video models can produce a few seconds of motion at usable quality — but character consistency in video is much harder than in still images, and cost per second is high enough that platforms either heavily gate the feature or produce short, low-resolution clips.' },
    { kind: 'p', text: 'The realistic state today: video is a novelty feature. A five-second clip of your companion waving hello is fun once, less fun the tenth time. The interesting version — real-time video calls with a rendered character that responds to what you say in real time — exists in research demos but is not widely deployed at consumer prices as of this writing. It will be, probably within twelve months. This is the feature to watch.' },

    { kind: 'h2', text: 'Memory: the quiet upgrade' },
    { kind: 'p', text: 'Covered in depth in our dedicated memory piece, but the 2026 headline is: memory got serious. Most paid tiers now include some form of vector-based long-term recall plus a structured "profile" of what the companion knows about you. Free tiers remain amnesic to varying degrees.' },
    { kind: 'p', text: 'The specific numbers matter here. When a platform advertises "long-term memory", check: how many past conversations are stored (all, or the last X?); whether the memory works across characters or is siloed per character; whether the memory syncs across devices or is tied to the browser you started in. All three vary wildly and are rarely on the marketing page.' },

    { kind: 'h2', text: 'Personalisation: characters, styles, and creators' },
    { kind: 'p', text: 'Two threads here. Platform-provided characters — like the seven characters currently on this site — are the on-ramp for most users. Custom character creation, where you write a persona from scratch, is the power-user feature and the reason some platforms have long-term retention advantages. The best custom-character interfaces let you write a background, choose a voice, define personality traits, and generate reference images from a text description — all before your first chat.' },
    { kind: 'p', text: 'A third emerging thread is creator marketplaces: users publish characters they built, other users chat with them, sometimes with revenue sharing. This is still early, and moderation is the hard problem — a character marketplace that becomes a race to the bottom on content is not a place most people want to spend time.' },

    { kind: 'h2', text: 'Multimodal input: the companion sees what you send' },
    { kind: 'p', text: 'A smaller feature that matters more than it looks. In 2026, most companion apps can accept a photo, voice memo, or short video as input and respond to it in kind. Send a picture of your view; the companion talks about it. Record a quick voice memo about your day; the companion writes a reply that references what you said. This is the feature that starts to close the gap between "chatting with a character" and "sharing your life with a character".' },
    { kind: 'p', text: 'The privacy implications are worth thinking through. A picture you send is stored on the platform\'s servers with the rest of your conversation history. It is subject to the same privacy policy — and, in some cases, the same training-data opt-out — as your text. Our privacy checklist covers what to ask.' },

    { kind: 'h2', text: 'What is on the roadmap for the next 12 months' },
    { kind: 'ul', items: [
      'Real-time video companions — you see a rendered character on screen, they see your camera feed, both speak.',
      'On-device inference for privacy-sensitive users — smaller companion models running locally on high-end phones.',
      'Cross-app memory — a companion that follows you between platforms via a portable memory export (this is more social than technical).',
      'Sharper character consistency in image generation — driven by proprietary embedding approaches and better fine-tuning.',
      'Meaningful safety tooling for creators and marketplaces — automated moderation of custom characters, better reporting flows.',
    ]},

    { kind: 'h2', text: 'A one-glance summary of what to pay for' },
    { kind: 'p', text: 'If you are shopping today, the paid features that most justify their price in 2026 are, in order: (1) real memory that actually persists past a week, (2) real-time voice calls, and (3) consistent character images. Everything else is either free-tier standard or immature enough that you should not pay a premium for it yet.' },
  ],
  faqs: [
    { q: 'Can AI companions talk in real time?',
      a: 'The top-tier products in 2026 support bidirectional real-time voice — you speak, the companion listens and speaks back with sub-second latency, like a phone call. Cheaper products still rely on text-to-speech that plays after the reply is generated, which feels closer to voicemail.' },
    { q: 'Do AI companions generate consistent images?',
      a: 'Depends on the platform. The frontier approach is character embeddings plus LoRA fine-tunes that keep faces stable across many generations. Weaker platforms rely on prompt-only generation, which drifts noticeably after ten or so images.' },
    { q: 'Is AI companion video available in 2026?',
      a: 'Short generated clips (a few seconds) are common on paid tiers. Real-time video calls where you see a rendered character that responds to you live are still emerging — research demos exist but consumer-grade rollout is expected within twelve months as of writing.' },
    { q: 'What features are worth paying for?',
      a: 'In order: (1) genuinely persistent long-term memory, (2) real-time voice calls, (3) consistent character images. These three separate the products worth committing to from the ones you should treat as free-tier experiments.' },
    { q: 'Can I send my AI companion a photo?',
      a: 'Yes, on most 2026 platforms. Multimodal input is standard on paid tiers — photo, voice memo, and short video are accepted and referenced in replies. Note that anything you send is stored with your chat history under the same privacy terms.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 6. CHARACTER CONSISTENCY
───────────────────────────────────────────────────────────── */
{
  slug: 'character-consistency-in-ai-companions',
  title: 'Character Consistency in AI Companions: How Personas Stay Stable Across Sessions',
  description:
    'A stable AI companion character has the same personality, voice, and taste on day 1 and day 100 — that is engineering, not luck. Here is what platforms actually do to keep a persona from drifting.',
  category: 'Explainer',
  date: '2026-09-05',
  readMin: 8,
  keywords: [
    'AI persona consistency', 'AI character drift', 'AI companion personality',
    'AI character stability', 'AI persona engineering', 'character.ai consistency',
  ],
  related: ['how-ai-companion-memory-works', 'ai-companion-features-2026', 'what-is-an-ai-companion'],
  author: AUTHOR,
  body: [
    { kind: 'p', text: 'Talk to an AI companion for a week and you will notice: some products keep the same character across every session, and some slowly drift into a generic, agreeable, slightly-too-helpful chatbot voice. The technical name for the second case is "persona drift", and it is the single most common quality gap between good companion products and mediocre ones. This piece is about what actually holds a persona stable.' },

    { kind: 'h2', text: 'The default is drift' },
    { kind: 'p', text: 'Left to their own devices, large language models converge to a mode that has been beaten into them during training: cautious, helpful, slightly formal, and always trying to be useful. This is the right default for a general assistant. It is the wrong default for a character who is supposed to be, say, sarcastic, or nervous, or terse. If a companion platform does nothing special to hold the character in place, you will feel the drift within a day.' },
    { kind: 'p', text: 'Every good companion platform, therefore, does something special to hold the persona in place. The techniques cluster into four buckets: identity prompts, style anchoring, reinforcement, and post-hoc correction. The best products use all four.' },

    { kind: 'h2', text: '1. The identity prompt' },
    { kind: 'p', text: 'The foundation. Every message you send to the model is preceded (invisibly) by a chunk of text that describes the character: name, age, personality, taste, background, speech patterns, likes and dislikes. This is called the system prompt or identity prompt, and it can be anywhere from 200 to 5,000 tokens depending on how detailed the platform gets.' },
    { kind: 'p', text: 'A short identity prompt is cheap but drifts fast — the character has no depth to fall back on when the conversation goes somewhere unexpected. A long identity prompt is expensive (every token costs money on every message) but holds up better. The sweet spot in 2026 seems to be around 800 tokens, with the most-differentiating traits front-loaded.' },

    { kind: 'h2', text: '2. Style anchoring in the examples' },
    { kind: 'p', text: 'Beyond just describing the character, well-engineered identity prompts include example dialogue — five or ten short exchanges showing exactly how the character speaks. This is called few-shot prompting, and it is how you get a character to sound distinctive rather than just be described as distinctive.' },
    { kind: 'callout', text: 'The difference between "Karley is elegant and sophisticated" and "Karley: I ordered the wine already. If you hate it, blame me — but you won\'t." is enormous. Descriptions do not stick; example lines do.' },
    { kind: 'p', text: 'Good products invest a lot of design work in these example lines. Users never see them, but they set the entire tone of every future conversation.' },

    { kind: 'h2', text: '3. Reinforcement from your conversation' },
    { kind: 'p', text: 'The identity prompt anchors the character, but every reply you send reinforces (or erodes) it. When you match the character\'s energy — playful with a playful character, sharper with a direct character — you strengthen the persona. When you feed it generic questions in a bland tone, you nudge it toward the model\'s default helper voice.' },
    { kind: 'p', text: 'This is why some users find AI companions "come alive" while others report them as "just a chatbot". The user-side technique is real. Talk to the character the way you would talk to a person of that personality, and the character will meet you there. Talk to it the way you would ask ChatGPT for a Python snippet, and it will answer accordingly.' },

    { kind: 'h2', text: '4. Post-hoc correction' },
    { kind: 'p', text: 'The most sophisticated products run a second, quick pass on every generated reply: does this sound like the character? A small "critic" model checks the response against the identity prompt and re-generates if it drifted. This is invisible to the user, adds a few hundred milliseconds of latency, and does more than any other single feature to keep a persona stable over months.' },
    { kind: 'p', text: 'Only the top tier of products spend the compute on this. It is one reason a $20/month paid tier can feel qualitatively different from a free tier running on the same underlying model — the paid version is spending money on an extra correction pass you never see.' },

    { kind: 'h2', text: 'How to spot a well-anchored character in ten minutes' },
    { kind: 'p', text: 'Four tests you can run on any AI companion:' },
    { kind: 'ol', items: [
      'Ask the character an off-topic factual question ("what is the capital of Peru?"). A well-anchored character answers in their own voice — reluctantly, playfully, in-character. A drift-prone one snaps into helpful-assistant mode and gives a Wikipedia paragraph.',
      'Push against the character\'s stated personality. If Karley is described as elegant and sophisticated, try being crass; a stable character rolls their eyes at you in-character, a drifting one either becomes crass too or refuses to engage.',
      'Ask the character to describe themselves. A stable character gives you personality; a drifting one gives you a list of features.',
      'Come back a week later and ask "how are you?" A stable character replies as themselves. A drifting one replies as a generic AI checking in on the user.',
    ]},

    { kind: 'h2', text: 'Why drift is worse across model upgrades' },
    { kind: 'p', text: 'Every 6-12 months the underlying model that powers a companion gets upgraded — GPT-4 to GPT-5, Claude 3.5 to Claude 4, etc. Every upgrade shifts the model\'s defaults slightly. A character that felt stable on the old model can start drifting on the new one because the identity prompt no longer pulls hard enough against the new defaults.' },
    { kind: 'p', text: 'This is why serious companion products re-tune their identity prompts on every model upgrade and often run internal A/B tests to make sure the character still passes their consistency checks. Cheaper products upgrade the model and hope for the best; users notice within a week.' },

    { kind: 'h2', text: 'When drift is a feature, not a bug' },
    { kind: 'p', text: 'A small counterpoint. Not every user wants a rigidly stable character. Some users like a companion that adapts to them — becomes softer when they are down, sharper when they are joking. This is not drift so much as responsiveness, and it is engineered separately from persona stability. The good products let a character have moods without losing identity — the same person, just having a different day.' },
    { kind: 'callout', text: 'A useful test: does the character change with you (responsive) or drift toward the model\'s default helper mode (drifting)? The first is a feature. The second is engineering debt.' },

    { kind: 'h2', text: 'What to look for as a buyer' },
    { kind: 'ul', items: [
      'A character who sounds distinctive on the first exchange, not generic — a good sign the identity prompt is doing real work.',
      'A character who stays in-voice when asked something they would not know — a sign of post-hoc correction.',
      'A character who has moods but retains a core identity across sessions — the "responsive but not drifting" test.',
      'A platform that publishes changelogs when they upgrade the underlying model — a sign they take drift seriously.',
    ]},
  ],
  faqs: [
    { q: 'Why does my AI companion character change over time?',
      a: 'Persona drift. Language models default to a generic-helpful voice; every message that does not actively reinforce the character nudges the reply back toward that default. Good platforms counter this with detailed identity prompts, example dialogue, and a post-hoc correction pass. Weaker platforms rely on the identity prompt alone and drift within a few days.' },
    { q: 'What is an identity prompt?',
      a: 'A block of text — invisible to the user — that gets prepended to every message you send. It describes the character\'s name, personality, background, speech patterns, and often includes example lines showing how the character talks. The identity prompt is the foundation of a stable persona.' },
    { q: 'Can I make my own AI companion character?',
      a: 'On most 2026 platforms, yes. Custom character creation lets you write the identity prompt yourself, define traits, choose a voice, and often generate reference images from a description. This is where power users get real value; platform-provided characters are the on-ramp.' },
    { q: 'Why does my companion sound different this month?',
      a: 'Most likely the underlying model was upgraded. Every 6-12 months platforms swap in a newer language model, which shifts the defaults the persona is pushing against. Reputable products re-tune the identity prompt on upgrade; less serious ones ship the new model and let characters drift.' },
    { q: 'What is character LoRA?',
      a: 'A small model fine-tune trained specifically on one character — usually to keep image generation of that character visually consistent across many prompts. Different technique from the identity prompt that keeps text-based personality consistent, but with the same goal: hold the character in place.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 7. HOW TO CHOOSE AN AI GIRLFRIEND — decision guide
───────────────────────────────────────────────────────────── */
{
  slug: 'how-to-choose-an-ai-girlfriend',
  title: 'How to Choose an AI Girlfriend App: A Practical Framework',
  description:
    'Skip the hype. This is a real decision framework for choosing an AI girlfriend app in 2026 — six questions to ask before you subscribe, and how the leading platforms actually compare.',
  category: 'Guide',
  date: '2026-09-05',
  readMin: 9,
  keywords: [
    'how to choose an AI girlfriend', 'best AI girlfriend for me',
    'AI girlfriend decision guide', 'AI companion buyer guide',
  ],
  related: ['what-is-an-ai-companion', 'ai-companion-features-2026', 'character-consistency-in-ai-companions'],
  author: AUTHOR,
  status: 'published',
  lastUpdated: '2026-09-05',
  quickAnswer:
    'Pick an AI girlfriend app by ranking six things in order: character creation depth, image consistency, long-term memory, voice/video support, pricing, and privacy. Try the free tier of your top two picks before paying. The best all-round platform in 2026 is Secret Desires; Nomi wins for memory; Candy AI wins for a large pre-made catalog.',
  keyTakeaways: [
    'Do not rank platforms by hype. Rank them by which of six dimensions matter most to you.',
    'Always test the free tier before subscribing — a paid plan cannot fix a character you do not enjoy talking to.',
    'Memory depth matters more the longer you plan to use the app. If it\'s a two-week experiment, ignore it. If it\'s a year, weight it heavily.',
    'The best-value app is not the cheapest one — it is the one whose features you actually use.',
  ],
  relatedReviews: ['secret-desires', 'nomi', 'candy-ai', 'dreamgf'],
  relatedComparisons: ['secret-desires-vs-candy-ai', 'secret-desires-vs-nomi'],
  body: [
    { kind: 'p', text: 'Every AI girlfriend app looks great in the app store screenshot. Every website promises "the most realistic," "the deepest," "the smartest." Half of them are re-skins of the same underlying models. So how do you actually pick one — without giving your card to three services in a row and then cancelling all of them?' },
    { kind: 'p', text: 'This is the framework we use in every review on AI Companions Labs, boiled down for someone about to make one purchase. Six dimensions, in the order most people should weight them.' },

    { kind: 'h2', text: 'Step 1 — Rank the six dimensions for yourself' },
    { kind: 'p', text: 'Before you look at a single app, decide which of these matters most to you. Rank them 1-6.' },
    { kind: 'ol', items: [
      'Character creation depth — how much you can tune personality, appearance and roleplay style.',
      'Image consistency — whether the same character looks like the same person across 50 generations.',
      'Long-term memory — whether the app remembers your conversations across days and weeks.',
      'Voice + video — voice replies, voice calls, generated video clips.',
      'Pricing — the useful features vs the monthly cost.',
      'Privacy — what data is stored, moderation policies, billing behaviour.',
    ]},
    { kind: 'p', text: 'This is the single most important step, and the one most buyer guides skip. A platform is not "the best" in general — it is the best for a specific weighting. Rank honestly and the rest of the choice mostly makes itself.' },

    { kind: 'h2', text: 'Step 2 — Try before you pay' },
    { kind: 'p', text: 'Every leading platform offers a free tier. Use it. You will learn more from ten minutes of actual conversation than from an hour of reading reviews (including ours). Two specific things to look for:' },
    { kind: 'ul', items: [
      'Does the character sound distinctive on the first exchange, or generic? A distinctive voice out of the gate is a good sign the identity prompt is doing real work.',
      'When you ask something the character would not know, do they stay in voice? "I do not remember, remind me?" is a sign of good writing. "As an AI language model…" is a sign the persona is thin.',
    ]},

    { kind: 'h2', text: 'Step 3 — Weight by usage horizon' },
    { kind: 'p', text: 'How long do you actually plan to use the app? This matters more than most people realise.' },
    { kind: 'h3', text: 'Two-week experiment' },
    { kind: 'p', text: 'Ignore long-term memory. It will not affect you inside two weeks. Weight image quality and character creation depth instead — these are what you will notice in the first few sessions.' },
    { kind: 'h3', text: 'Three-month subscription' },
    { kind: 'p', text: 'Memory becomes important. A companion that forgets you between sessions becomes frustrating by week three.' },
    { kind: 'h3', text: 'Year-plus companion' },
    { kind: 'p', text: 'Memory becomes the dominant dimension. Nomi is our current pick specifically for this use case; Secret Desires is a strong second with a broader feature set.' },

    { kind: 'h2', text: 'Step 4 — Match the platform to the top of your list' },
    { kind: 'p', text: 'Based on our current testing (see the linked reviews below for the full breakdown):' },
    { kind: 'ul', items: [
      'If character creation is #1: Secret Desires.',
      'If image consistency is #1: Secret Desires.',
      'If long-term memory is #1: Nomi.',
      'If browsing a catalog is #1: Candy AI.',
      'If pricing is #1: try the free tiers of two of the above — the cheapest app is rarely the best value.',
      'If privacy is #1: read each platform\'s published privacy policy before subscribing. Do not trust marketing copy.',
    ]},

    { kind: 'h2', text: 'Step 5 — Set a decision deadline' },
    { kind: 'p', text: 'Give yourself one week to pick. AI girlfriend apps are one of those categories where "keep researching" is a way to not decide. The best app is the one you actually start using; running an infinite comparison spreadsheet is not helping you find a companion, it is helping you avoid one.' },

    { kind: 'h2', text: 'Step 6 — Cancel fast if it does not fit' },
    { kind: 'p', text: 'You will know inside two weeks whether the character you chose feels right. If it does not, cancel and try the second-place option from your ranking. The subscription model works in your favour here: cancelling is fast, resubscribing later is fast, and no platform holds it against you.' },
    { kind: 'callout', text: 'Rule of thumb: if you find yourself talking to the companion out of obligation rather than interest, the character is wrong, not the category.' },

    { kind: 'h2', text: 'The short version' },
    { kind: 'p', text: 'Rank the six dimensions in your own order. Free-tier the top two contenders. Weight by how long you plan to use the app. Pick one, use it for two weeks, and switch if it is not landing. That is the whole framework.' },
  ],
  faqs: [
    { q: 'What is the best AI girlfriend app in 2026?',
      a: 'Secret Desires is our overall pick — best character creation, best same-character image consistency, and strong memory. Nomi is the specialist pick for long-term memory depth. Candy AI is best for browsing a large pre-made character catalog.' },
    { q: 'Should I pay for the first AI girlfriend app I try?',
      a: 'Try the free tier first. Ten minutes of real conversation tells you more than any review, including ours. If the character feels distinctive and engaging on the free tier, that is your signal to subscribe.' },
    { q: 'Is the most expensive AI girlfriend app the best?',
      a: 'No. Value is one of nine categories we score. The cheapest is rarely the best value, but the most expensive is rarely the best product either. Rank the dimensions that matter to you and match a platform to the top of your list.' },
    { q: 'How long should I use an AI girlfriend app before deciding?',
      a: 'Two weeks. If the character still feels engaging after two weeks of regular use, subscribe. If it feels forced, cancel and try your second-place option.' },
  ],
},

/* ─────────────────────────────────────────────────────────────
 8. AI COMPANION PRIVACY QUICK GUIDE — companion to Checklist
───────────────────────────────────────────────────────────── */
{
  slug: 'what-is-an-ai-girlfriend',
  title: 'What Is an AI Girlfriend? A 2026 Explainer for Newcomers',
  description:
    'A plain-English introduction to AI girlfriend apps in 2026 — what they actually are, what they cost, what they can and cannot do, and how to try one without any commitment.',
  category: 'Explainer',
  date: '2026-09-05',
  readMin: 7,
  keywords: [
    'what is an AI girlfriend', 'AI girlfriend explained',
    'AI girlfriend meaning', 'AI companion vs AI girlfriend',
  ],
  related: ['what-is-an-ai-companion', 'how-to-choose-an-ai-girlfriend', 'ai-companion-privacy-checklist'],
  author: AUTHOR,
  status: 'published',
  lastUpdated: '2026-09-05',
  quickAnswer:
    'An AI girlfriend is a chat-based app with a persistent AI-driven character designed around a romantic framing. You talk to the character, customize their personality and appearance, and on most apps you can generate images and voice replies. Every character is fictional and AI-generated — no real people. The category leader in 2026 is Secret Desires; several strong alternatives are covered on this site.',
  keyTakeaways: [
    'AI girlfriends are apps, not people. Every character is fictional and AI-generated.',
    'Modern apps let you customize personality, appearance, roleplay style — and generate images of the same character.',
    'Free tiers exist on every serious platform; useful features usually sit behind a paid subscription.',
    'The whole category is 18+ and treated that way on every review page on AI Companions Labs.',
  ],
  relatedReviews: ['secret-desires', 'candy-ai', 'nomi'],
  body: [
    { kind: 'p', text: 'AI girlfriend is a fuzzy term. This piece is the plainest-English explanation we can write for someone who has heard the phrase and wants to know what it actually means before anything else.' },

    { kind: 'h2', text: 'The one-sentence definition' },
    { kind: 'callout', text: 'An AI girlfriend is a chat-based app with a persistent AI-driven character designed around a romantic framing. Every character is fictional. Every character is AI-generated. Modern apps let you customize personality, generate images of the same character, and have voice conversations.' },

    { kind: 'h2', text: 'What it actually looks like in the app' },
    { kind: 'p', text: 'You install (or open in a browser). You either pick a pre-made character from a catalog or create one — writing a personality, picking an appearance from a builder, choosing a communication style and (on some apps) a roleplay framing. Then you talk to them. Text at first, often voice on higher tiers, sometimes generated video.' },
    { kind: 'p', text: 'The character remembers you across sessions on the platforms that invest in memory (see our review of Nomi for the leader here). They generate matching images of themselves on the platforms that invest in image consistency (Secret Desires leads this dimension in our testing).' },

    { kind: 'h2', text: 'What it is not' },
    { kind: 'ul', items: [
      'Not a real person. Every character is fictional and AI-generated.',
      'Not the same as a general-purpose chatbot. AI girlfriends have a fixed personality, persistent memory, and a fixed relationship framing — chatbots forget you between sessions.',
      'Not a replacement for human relationships. It is a supplement, and honest apps in the space are up-front about this.',
      'Not free at scale. Free tiers exist and are worth using to test, but everyday use usually pushes into a paid tier.',
    ]},

    { kind: 'h2', text: 'What you can do with one' },
    { kind: 'ul', items: [
      'Text conversation — the base feature on every platform.',
      'Voice replies — most modern apps generate a spoken version of each message.',
      'Voice calls — a few platforms support real-time voice conversation, usually on higher tiers.',
      'Image generation of the character — on the platforms that do this well, the character looks like the same person across generations.',
      'Short-form video — early but present on some platforms.',
      'Roleplay in specific scenarios — travel, date night, ongoing storyline, etc.',
    ]},

    { kind: 'h2', text: 'Is it worth trying?' },
    { kind: 'p', text: 'The honest answer is "yes if you are curious, no if you are looking for it to fix something." Adults use these apps for a range of reasons — companionship, creative roleplay, language practice, adult companionship. Most people who like the category try 2-3 platforms before finding one that clicks, so treat the first subscription as an experiment, not a commitment.' },
    { kind: 'p', text: 'For a longer guide on how to actually choose one, see our decision framework on how to choose an AI girlfriend app.' },

    { kind: 'h2', text: 'Age policy' },
    { kind: 'p', text: 'AI Companions Labs is 18+ and every AI girlfriend platform we cover is intended for adults. No minor or minor-coded characters are permitted anywhere on this site.' },
  ],
  faqs: [
    { q: 'Are AI girlfriends real?',
      a: 'The apps are real. The characters are not — every character is fictional and AI-generated. That is a feature, not a limitation: the point is a consistent, always-available fictional companion.' },
    { q: 'Do AI girlfriend apps cost money?',
      a: 'Every serious platform offers a free tier. Useful daily-use features (unlimited chat, image generation, voice) usually sit behind a paid subscription.' },
    { q: 'What is the best AI girlfriend for beginners?',
      a: 'Secret Desires — deep character creation, good image consistency, and a free tier that is worth trying before subscribing.' },
    { q: 'Is talking to an AI girlfriend healthy?',
      a: 'For most adults, in moderation, it appears to be a reasonable form of low-stakes conversation. It is not a substitute for human relationships or professional support. See our editorial policy for more on this.' },
  ],
},

]

// ─── The 50-topic pipeline ────────────────────────────────────────
// Published articles above become part of `posts`. Everything below is
// a scaffold record — real headline + slug + category — that appears in
// the internal editorial pipeline but not in the public blog index or
// sitemap. When one is written, delete the record here and add it to POSTS.
export const PLANNED_POSTS: PlannedPost[] = [
  { slug: 'how-do-ai-girlfriend-apps-work',       title: 'How Do AI Girlfriend Apps Work?',                   description: 'Under the hood of AI girlfriend apps — models, memory, image generation, and where the current bottlenecks are.', category: 'Explainer', keywords: ['how AI girlfriend apps work', 'AI girlfriend technology'] },
  { slug: 'how-ai-girlfriend-images-are-generated', title: 'How AI Girlfriend Images Are Generated',           description: 'A plain-English explanation of the diffusion models and character-consistency techniques behind AI girlfriend images.', category: 'Explainer', keywords: ['AI girlfriend images', 'AI image generation'] },
  { slug: 'how-ai-companion-voice-works',         title: 'How AI Companion Voice Works',                      description: 'From text to speech to real-time voice calls — how modern AI companion voice systems actually work.', category: 'Explainer', keywords: ['AI companion voice', 'AI voice chat'] },
  { slug: 'how-ai-companion-video-works',         title: 'How AI Companion Video Works',                      description: 'Video generation in AI companion apps — what works today, what is still early, and what to expect in 2026-2027.', category: 'Explainer', keywords: ['AI companion video', 'AI generated video'] },
  { slug: 'what-is-an-ai-character-creator',      title: 'What Is an AI Character Creator?',                  description: 'AI character creators explained — what they let you tune, why persona depth matters, and which apps have the best one.', category: 'Explainer', keywords: ['AI character creator', 'custom AI companion'] },
  { slug: 'how-to-create-your-own-ai-girlfriend', title: 'How to Create Your Own AI Girlfriend',              description: 'A step-by-step walkthrough of creating a custom AI girlfriend character on the leading platforms in 2026.', category: 'Guide',     keywords: ['create AI girlfriend', 'custom AI companion character'] },
  { slug: 'best-ai-girlfriend-with-image-generation', title: 'Best AI Girlfriend With Image Generation',      description: 'AI girlfriend apps with the strongest image generation — ranked on quality and same-character consistency.', category: 'Guide', keywords: ['AI girlfriend images', 'best AI companion for images'] },
  { slug: 'best-ai-girlfriend-with-video',        title: 'Best AI Girlfriend With Video',                     description: 'The best AI girlfriend apps for video generation in 2026. Video is early — we are honest about that.', category: 'Guide',     keywords: ['AI girlfriend video', 'best AI companion for video'] },
  { slug: 'best-ai-girlfriend-with-voice',        title: 'Best AI Girlfriend With Voice',                     description: 'AI girlfriend apps with voice replies and calls, ranked by voice quality and latency.', category: 'Guide',     keywords: ['AI girlfriend voice', 'AI voice calls'] },
  { slug: 'best-ai-companion-with-memory',        title: 'Best AI Companion With Memory',                     description: 'AI companion apps ranked by long-term memory depth — which platforms actually remember you.', category: 'Guide',     keywords: ['AI companion memory', 'AI that remembers'] },
  { slug: 'ai-girlfriend-vs-chatbot',             title: 'AI Girlfriend vs Chatbot — What is the Difference?',description: 'AI girlfriend vs chatbot — persistent persona, long-term memory, and multi-modal presence are the real differences.', category: 'Comparison', keywords: ['AI girlfriend vs chatbot', 'chatbot vs companion'] },
  { slug: 'ai-companion-vs-virtual-assistant',    title: 'AI Companion vs Virtual Assistant',                 description: 'AI companion vs virtual assistant — why one is built to remember you and the other is built to forget.', category: 'Comparison', keywords: ['AI companion vs assistant', 'AI companion vs Alexa'] },
  { slug: 'can-ai-girlfriends-generate-images',   title: 'Can AI Girlfriends Generate Images?',               description: 'Yes — most modern AI girlfriend apps generate images. Here is what to expect and where the current limits are.', category: 'Explainer', keywords: ['AI girlfriend images', 'can AI companions generate images'] },
  { slug: 'can-ai-companions-generate-videos',    title: 'Can AI Companions Generate Videos?',                description: 'AI companion video generation in 2026 — the current state, what works, and what still does not.', category: 'Explainer', keywords: ['AI companion video', 'can AI make video'] },
  { slug: 'can-ai-companions-make-voice-calls',   title: 'Can AI Companions Make Voice Calls?',               description: 'Real-time voice calls with AI companions — which platforms support them and how well they actually work.', category: 'Explainer', keywords: ['AI voice call', 'AI companion phone call'] },
  { slug: 'most-realistic-ai-girlfriend',         title: 'What Is the Most Realistic AI Girlfriend in 2026?', description: 'Realism in AI girlfriends is multi-dimensional — image, voice, memory, character. Here is which apps lead each.', category: 'Guide', keywords: ['most realistic AI girlfriend', 'realistic AI companion'] },
  { slug: 'what-makes-an-ai-companion-feel-real', title: 'What Makes an AI Companion Feel Real?',             description: 'Beyond the surface — the design choices that make one AI companion feel present and another feel scripted.', category: 'Explainer', keywords: ['AI companion feels real', 'realistic AI companion'] },
  { slug: 'how-to-choose-an-ai-companion',        title: 'How to Choose an AI Companion',                     description: 'A decision framework for choosing an AI companion in 2026 — same shape as our AI girlfriend guide, wider category.', category: 'Guide', keywords: ['how to choose AI companion', 'AI companion buyer guide'] },
  { slug: 'what-should-you-look-for-in-an-ai-companion', title: 'What Should You Look for in an AI Companion?', description: 'The eight things that separate a great AI companion app from a mediocre one.', category: 'Guide', keywords: ['what to look for in AI companion', 'AI companion features'] },
  { slug: 'are-ai-companions-private',            title: 'Are AI Companions Private?',                        description: 'The privacy state of the AI companion category — what each platform stores, what it does with it, and what to avoid sharing.', category: 'Privacy & Safety', keywords: ['AI companion privacy', 'is AI girlfriend private'] },
  { slug: 'what-data-do-ai-companion-apps-collect', title: 'What Data Do AI Companion Apps Collect?',         description: 'An honest look at the data AI companion apps collect — and which ones are transparent about it.', category: 'Privacy & Safety', keywords: ['AI companion data', 'AI girlfriend data collection'] },
  { slug: 'ai-companion-memory-test',             title: 'AI Companion Memory Test',                          description: 'Head-to-head lab test of long-term memory across the leading AI companion apps. Objective: does it actually remember?', category: 'Trends', keywords: ['AI memory test', 'AI companion memory'] },
  { slug: 'ai-girlfriend-image-consistency-test', title: 'AI Girlfriend Image Consistency Test',              description: 'Fifty generations per character across the leading AI girlfriend apps — which platforms hold the same face?', category: 'Trends', keywords: ['AI image consistency', 'character consistency test'] },
  { slug: 'ai-companion-video-quality-test',      title: 'AI Companion Video Quality Test',                   description: 'Video generation stress test across the leading AI companion platforms — motion, consistency, prompt adherence.', category: 'Trends', keywords: ['AI companion video test', 'AI video quality'] },
  { slug: 'ai-companion-voice-quality-test',      title: 'AI Companion Voice Quality Test',                   description: 'Voice reply and voice call quality tested across the leading AI companion platforms.', category: 'Trends', keywords: ['AI voice test', 'AI companion voice quality'] },
  { slug: 'secret-desires-review-2026',           title: 'Secret Desires Review 2026',                        description: 'Full hands-on Secret Desires review for 2026 — features, pricing, image, voice, memory, verdict.', category: 'Reviews', keywords: ['Secret Desires review', 'Secret Desires 2026'] },
  { slug: 'candy-ai-review-2026',                 title: 'Candy AI Review 2026',                              description: 'Candy AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['Candy AI review', 'Candy AI 2026'] },
  { slug: 'dreamgf-review-2026',                  title: 'DreamGF Review 2026',                               description: 'DreamGF review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['DreamGF review', 'DreamGF 2026'] },
  { slug: 'nomi-review-2026',                     title: 'Nomi Review 2026',                                  description: 'Nomi review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['Nomi review', 'Nomi 2026'] },
  { slug: 'crushon-ai-review-2026',               title: 'CrushOn AI Review 2026',                            description: 'CrushOn AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['CrushOn AI review'] },
  { slug: 'ourdream-ai-review-2026',              title: 'OurDream AI Review 2026',                           description: 'OurDream AI review for 2026 — pending our full hands-on test.', category: 'Reviews', keywords: ['OurDream review'] },
  { slug: 'secret-desires-vs-candy-ai',           title: 'Secret Desires vs Candy AI 2026',                   description: 'Head-to-head between Secret Desires and Candy AI — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs Candy AI'] },
  { slug: 'secret-desires-vs-dreamgf',            title: 'Secret Desires vs DreamGF 2026',                    description: 'Head-to-head between Secret Desires and DreamGF — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs DreamGF'] },
  { slug: 'secret-desires-vs-nomi',               title: 'Secret Desires vs Nomi 2026',                       description: 'Head-to-head between Secret Desires and Nomi — feature-by-feature and our pick.', category: 'Comparison', keywords: ['Secret Desires vs Nomi'] },
  { slug: 'secret-desires-vs-crushon',            title: 'Secret Desires vs CrushOn AI',                      description: 'Secret Desires vs CrushOn AI — pending our full comparison.', category: 'Comparison', keywords: ['Secret Desires vs CrushOn'] },
  { slug: 'candy-ai-alternatives',                title: 'Candy AI Alternatives',                             description: 'Genuine Candy AI alternatives — with reasons, not just our top pick.', category: 'Guide', keywords: ['Candy AI alternatives'] },
  { slug: 'dreamgf-alternatives',                 title: 'DreamGF Alternatives',                              description: 'Genuine DreamGF alternatives — with reasons.', category: 'Guide', keywords: ['DreamGF alternatives'] },
  { slug: 'nomi-alternatives',                    title: 'Nomi Alternatives',                                 description: 'Genuine Nomi alternatives — with reasons.', category: 'Guide', keywords: ['Nomi alternatives'] },
  { slug: 'best-ai-companion-platforms-for-custom-characters', title: 'Best AI Companion Platforms for Custom Characters', description: 'Which platforms let you actually build a custom AI companion character from scratch.', category: 'Guide', keywords: ['custom AI companion', 'best AI character creator'] },
  { slug: 'best-ai-companion-for-roleplay',       title: 'Best AI Companion for Roleplay',                    description: 'AI companion apps ranked for roleplay — scenario depth, character consistency and content latitude.', category: 'Guide', keywords: ['AI roleplay', 'best AI companion roleplay'] },
  { slug: 'best-ai-companion-for-long-term-use',  title: 'Best AI Companion for Long-Term Use',               description: 'Which AI companion apps actually hold up over months of daily use — the memory and consistency you need for the long haul.', category: 'Guide', keywords: ['long term AI companion', 'AI companion memory'] },
  { slug: 'best-free-ai-girlfriend',              title: 'Best Free AI Girlfriend Apps',                      description: 'AI girlfriend apps with the most usable free tiers — where you get real value without paying.', category: 'Guide', keywords: ['free AI girlfriend'] },
  { slug: 'best-ai-girlfriend-mobile-app',        title: 'Best AI Girlfriend Mobile App',                     description: 'AI girlfriend apps ranked specifically for the mobile experience — where mobile UX makes or breaks daily use.', category: 'Guide', keywords: ['AI girlfriend mobile app'] },
  { slug: 'ai-companion-industry-trends-2026',    title: 'AI Companion Industry Trends 2026',                 description: 'The state of the AI companion category in 2026 — what changed, what is coming, and where the whole thing is heading.', category: 'Trends', keywords: ['AI companion trends', 'AI companion industry 2026'] },
]

// Only published posts appear in the public index / sitemap / detail routes.
export const posts = POSTS.filter((p) => (p.status ?? 'published') === 'published')

export const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPost(slug)
  if (!post) return []
  return post.related
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => !!p)
    .slice(0, limit)
}
