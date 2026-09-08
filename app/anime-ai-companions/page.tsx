import type { Metadata } from 'next'
import HubPage, { P, H2 } from '@/components/HubPage'
import SDAIShowcase from '@/components/SDAIShowcase'
import { pageMetadata } from '@/lib/seo'

const PATH = '/anime-ai-companions'
const META_TITLE = 'Anime AI Companions — Best Anime AI Girlfriend & Waifu Apps 2026'
const META_DESC = 'Anime-styled AI companions: what makes an anime AI girlfriend different, which platforms support waifu-style characters, and hand-picked profiles from Secret Desires.'

export const metadata: Metadata = pageMetadata({ title: META_TITLE, description: META_DESC, path: PATH })

export default function AnimeAICompanionsHub() {
  return (
    <HubPage
      path={PATH}
      title="Anime AI Companions"
      metaTitle={META_TITLE}
      metaDescription={META_DESC}
      quickAnswer="Anime AI companions are AI chat characters designed with an anime or manga visual style — think waifu, senpai, kohai, sensei archetypes. Every major AI companion platform now supports anime-styled characters through their creation tools. Secret Desires and Candy AI have the strongest catalogs; below is a hand-picked selection from Secret Desires."
      intro={
        <>
          <H2>What counts as an anime AI companion</H2>
          <P>
            Anime AI companions are AI chat characters whose visual style is drawn from anime and
            manga — large expressive eyes, stylised proportions, cel-shaded rendering. The
            personality archetypes are also part of the aesthetic: the honor-bound classmate, the
            composed sensei, the genki chaos, the dreamy club-president crush, the confident
            onee-san. Modern character-creation flows on Secret Desires and Candy AI let you pick
            an anime visual style up front, then tune personality, backstory and voice.
          </P>
          <H2>How to pick an anime AI companion app</H2>
          <P>
            Three things separate the good anime AI apps from the mediocre ones: (1) whether the
            character&apos;s face and outfit stay consistent across generations, (2) whether the
            app remembers your inside jokes and lore across sessions, and (3) whether voice replies
            match the character archetype. Same evaluation dimensions as the rest of the category —
            just applied to an anime visual base.
          </P>
        </>
      }
      reviewSlugs={['secret-desires', 'candy-ai']}
      extraSection={<SDAIShowcase category="anime" />}
      faqs={[
        { q: 'What is an anime AI girlfriend?', a: 'An anime AI girlfriend is an AI chat companion whose visual style is drawn from anime and manga — stylised eyes, cel-shaded rendering, anime-typical personality archetypes like tsundere, yandere, kuudere or genki.' },
        { q: 'Which app has the best anime AI characters?', a: 'Secret Desires is our current pick for anime-styled AI companions — the character creation flow lets you pick an anime visual style up front, and image consistency is strong across the anime aesthetic specifically.' },
        { q: 'Can I make my own anime waifu?', a: 'Yes. Every modern AI companion platform with character creation supports building anime-styled characters from scratch — you tune the face, hair, outfit, personality archetype and speaking style.' },
        { q: 'Are anime AI companions the same as regular AI girlfriends?', a: 'Same app category, different visual style. Feature-set is identical — chat, memory, image generation, voice — only the character aesthetic differs.' },
      ]}
      bottomCtaLabel="Meet your anime AI companion"
    />
  )
}
