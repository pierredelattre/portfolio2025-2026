<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle"
      :text="pageContent.contextText" />

    <GridScrollLayout :images="rechercheUX" :title="pageContent.researchTitle" :text="pageContent.researchText" />

    <ImageFullWidthLayout :image-src=flows :image-mobile-src=flowsMobile secondary :image-alt="pageContent.archAlt"
      :title="pageContent.archTitle" :text="pageContent.archText" />

    <GridScrollLayout :images=uiGridImages :title="pageContent.uiTitle" :text="pageContent.uiText" />

    <ColumnTextLayout :image-src=designsystem :image-alt="pageContent.dsAlt" :title="pageContent.dsTitle"
      :text="pageContent.dsText" />

    <ColumnTextLayout :image-src=tests :image-alt="pageContent.testsAlt" :title="pageContent.testsTitle"
      :text="pageContent.testsText" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayout from '@/components/layouts/GridScrollLayout.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/talkie/banner.jpg?optimized'
import contexte from '@/assets/talkie/contexte.jpg?optimized'
import flows from '@/assets/talkie/flows.jpg?optimized'
import flowsMobile from '@/assets/talkie/mobile-flows.jpg?optimized'
import designsystemFr from '@/assets/talkie/designsystem.jpg?optimized'
import designsystemEn from '@/assets/talkie/designsystem-EN.jpg?optimized'
import apprentissage from '@/assets/talkie/apprentissage.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import quiz from '@/assets/talkie/quiz.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import duels from '@/assets/talkie/duels.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import testsFr from '@/assets/talkie/tests.jpg?optimized'
import testsEn from '@/assets/talkie/tests-EN.jpg?optimized'

import personaFr from '@/assets/talkie/per.jpg?optimized'
import personaEn from '@/assets/talkie/per-EN.jpg?optimized'
import entretiensFr from '@/assets/talkie/entr.jpg?optimized'
import entretiensEn from '@/assets/talkie/entr-EN.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctionsFr from '@/assets/talkie/fonctions.jpg?optimized'
import fonctionsEn from '@/assets/talkie/fonctions-EN.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'

const PROJECT_ROUTE = '/projet/talkie'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Contexte et enjeux',
    contextTitle: 'Contexte et enjeux',
    contextText: "Les apps d’apprentissage des langues fonctionnent bien pour créer une habitude, mais la progression ressentie n’est pas toujours au rendez-vous. Les utilisateurs reviennent chaque jour, sans forcément avoir le sentiment d’apprendre efficacement.\n\nLes entretiens ont confirmé cette tension entre engagement et progression. Plutôt que d’optimiser la rétention, on a voulu explorer une autre direction : comment rendre la progression plus visible, et proposer des situations d’apprentissage plus proches du réel.",
    researchTitle: 'Recherche utilisateur',
    researchText: `Trois entretiens semi-directifs de 30 minutes avec des utilisateurs actifs d’apps concurrentes.

Le premier utilise Duolingo pour préparer un voyage. Il se sent bloqué : il ne peut pas sauter les notions déjà acquises et confond régulièrement des mots proches.

Le second utilise MemRise dans un cadre professionnel. Il a arrêté car les exercices étaient trop simples, répétitifs, et ne lui donnaient pas de vision claire de sa progression.

Le troisième cherche à apprendre du vocabulaire spécifique à son métier. Il ne trouve que du contenu généraliste, peu adapté à ses besoins.

Point commun : tous étaient motivés au départ. Le problème n’était pas l’engagement, mais l’absence de progression perçue.`,
    archAlt: 'Architecture et parcours',
    archTitle: 'Architecture et parcours',
    archText:
      "L'expérience est structurée autour de cinq zones : Accueil, Apprendre, Quiz, Quêtes et Profil. Nous avons conçu des parcours fluides pour le duel, les quiz thématiques et l'apprentissage guidé, en garantissant une navigation claire.",
    uiTitle: 'Conception UI',
    uiText: `L’interface a été conçue pour gérer plusieurs formats (cours, quiz, duels, quêtes) sans complexifier l’expérience.

Plutôt que multiplier les patterns, on s’est appuyé sur des briques communes : cartes de contenu, blocs de progression, modules de quiz et header partagé.

Chaque écran suit la même logique : une action principale claire, des informations hiérarchisées, et des feedbacks visibles pour aider l’utilisateur à comprendre ce qu’il vient de faire.

L’objectif était de rendre l’expérience prévisible, pour réduire la charge mentale et laisser plus de place à l’apprentissage.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      "Le projet couvre cinq sections (Accueil, Apprendre, Quiz, Quêtes, Profil) développées en parallèle par deux designers. Sans référentiel commun, les sections auraient divergé. On a construit un design system complet : tokens, fondations, composants documentés par usage, templates et documentation publiée sur Zeroheight, synchronisée depuis Figma.",
    testsAlt: 'Tests utilisateurs',
    testsTitle: 'Tests utilisateurs',
    testsText: `Tests réalisés avec 3 participants sur deux parcours.

Les scénarios ont été complétés sans blocage majeur. La navigation était globalement comprise et fluide.

Plusieurs points d’amélioration sont ressortis :
- confusion sur l’écran initial du quiz (réponses visibles trop tôt)
- impossibilité d’inviter plusieurs amis
- absence de titre sur certaines pages
- difficulté à quitter puis reprendre un cours

Les itérations ont porté sur ces éléments : clarification des entrées de quiz, amélioration des écrans de fin, et ajout des états manquants.`,
    uiAlt1: 'Lessons',
    uiAlt2: 'Solo quizzes',
    uiAlt3: 'Player duels',
    uxAlt2: 'Interviews',
    uxAlt3: 'Features'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context and challenges',
    contextTitle: 'Context and challenges',
    contextText: "Language-learning apps are effective at building habits, but perceived progress is not always there. Users come back daily without necessarily feeling that they are improving.\n\nInterviews highlighted this tension between engagement and learning. Instead of focusing on retention, we explored a different direction: how to make progress more visible, and design learning situations that feel closer to real use.",
    researchTitle: 'User research',
    researchText: `Three 30-minute semi-structured interviews with active users of competing apps.

The first uses Duolingo to prepare for travel. He feels blocked: no way to skip mastered concepts and frequent confusion between similar words.

The second uses MemRise for work. He dropped off because exercises were too easy, repetitive, and did not give a clear sense of progress.

The third looks for job-specific vocabulary but only finds generic content.

All three started motivated. The issue was not engagement, but lack of perceived progress.`,
    archAlt: 'Architecture and flows',
    archTitle: 'Architecture and flows',
    archText:
      'The experience is structured around five areas: Home, Learn, Quiz, Quests, and Profile. We designed fluid paths for duels, themed quizzes, and guided learning while keeping navigation clear.',
    uiTitle: 'UI design',
    uiText: `The interface was designed to support multiple formats (lessons, quizzes, duels, quests) without increasing complexity.

Instead of multiplying patterns, we relied on shared building blocks: content cards, progress blocks, quiz modules, and a consistent header.

Each screen follows the same logic: a clear primary action, structured information, and visible feedback to help users understand what just happened.

The goal was to make the experience predictable, reducing cognitive load and leaving more room for learning.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      'The project covered five sections (Home, Learn, Quiz, Quests, Profile) designed in parallel by us two. Without a shared foundation, sections would diverge. We built a complete design system: tokens, foundations, documented components by usage, templates, and documentation published on Zeroheight and synced from Figma.',
    testsAlt: 'User testing',
    testsTitle: 'User testing',
    testsText: `Tests were conducted with 3 participants across two flows.

Both scenarios were completed without major issues. Navigation was generally clear and understandable.

Several improvements were identified:
- confusion on the initial quiz screen (answers visible too early)
- inability to invite multiple friends
- missing page titles
- no clear way to exit and resume a lesson

Iterations focused on these points: clarifying quiz entry, improving end-of-flow screens, and adding missing states.`,
    uiAlt1: 'Lessons',
    uiAlt2: 'Solo quizzes',
    uiAlt3: 'Player duels',
    uxAlt2: 'Interviews',
    uxAlt3: 'Features'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const uiGridImages = computed(() => [
  { src: apprentissage, alt: pageContent.value.uiAlt1 },
  { src: quiz, alt: pageContent.value.uiAlt2 },
  { src: duels, alt: pageContent.value.uiAlt3 }
])

const rechercheUX = computed(() => [
  { src: localizedImage(personaFr, personaEn), alt: "Persona" },
  {
    src: localizedImage(entretiensFr, entretiensEn),
    mobileSrc: entretiensMobile,
    alt: pageContent.value.uxAlt2
  },
  {
    src: localizedImage(fonctionsFr, fonctionsEn),
    mobileSrc: fonctionsMobile,
    alt: pageContent.value.uxAlt3
  }
])

const designsystem = computed(() => localizedImage(designsystemFr, designsystemEn))
const tests = computed(() => localizedImage(testsFr, testsEn))

const hasProject = computed(() => Boolean(projectData.value))
const projectLabel = computed(() =>
  hasProject.value
    ? `${locale.value === 'fr' ? 'Projet' : 'Project'} ${projectData.value.title}`
    : pageContent.value.projectNotFound
)

const projectBg = computed(() => resolveOptimizedImageSrc(projectBackground))

usePageLoaded(projectBg)
</script>

<style>
.project {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  row-gap: 7rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  transition: height 0.5s ease;

  .project__error {
    grid-column: 9 / 17;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  & .layout {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 2rem;
    grid-column: 1 / 17;

    & h3 {
      border-bottom: 1px solid var(--inactive);
      padding-bottom: .5rem;
      margin-bottom: .5rem;
    }

    @media screen and (max-width: 768px) {
      grid-column: 1;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 1rem;
    }

    &.layout__image-fwidth {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2rem;
      height: 700px;
    }

  }
}
</style>
