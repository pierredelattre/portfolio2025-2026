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
    contextText:
      "Les apps de langue installent une habitude, mais la progression perçue reste souvent floue. Les utilisateurs reviennent, sans toujours sentir qu'ils avancent.\n\nLe projet est parti de ce point : rendre la progression visible et proposer des situations d'apprentissage plus proches de l'usage réel.",
    researchTitle: 'Recherche utilisateur',
    researchText: `Trois entretiens de 30 minutes avec des utilisateurs actifs d'apps concurrentes.

Les mêmes points reviennent : difficulté à passer les acquis, exercices répétitifs, contenu trop généraliste, et manque de visibilité sur la progression.

Le constat est simple : la motivation était là, mais la progression ne se voyait pas assez.`,
    archAlt: 'Architecture et parcours',
    archTitle: 'Architecture et parcours',
    archText:
      "L'expérience s'organise en cinq zones : Accueil, Apprendre, Quiz, Quêtes et Profil.\n\nLes parcours duel, quiz thématique et apprentissage guidé suivent la même logique de navigation pour garder une prise en main rapide.",
    uiTitle: 'Conception UI',
    uiText: `L'interface gère plusieurs formats sans alourdir l'expérience.

On a utilisé des briques communes (cartes, progression, modules de quiz, header) pour garder des repères stables d'un écran à l'autre.

Chaque écran met en avant une action principale, des infos hiérarchisées et un feedback clair, pour réduire la charge mentale.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      'Le projet avançait en parallèle sur cinq sections et deux designers, avec un risque clair de divergence.\n\nOn a donc construit un design system complet : tokens, fondations, composants documentés par usage, templates, et documentation Zeroheight synchronisée depuis Figma.',
    testsAlt: 'Tests utilisateurs',
    testsTitle: 'Tests utilisateurs',
    testsText: `Tests menés avec 3 participants sur deux parcours. Les scénarios ont été complétés sans blocage majeur.

Les frictions principales concernaient l'entrée quiz, l'invitation d'amis, certains titres manquants, et la reprise de cours.

Les itérations ont ciblé ces points : clarifier l'entrée quiz, améliorer les fins de parcours, et ajouter les états manquants.`,
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
    contextText:
      'Language apps build habit well, but perceived progress often stays unclear. Users come back, without always feeling they are moving forward.\n\nThe project started from that point: make progress visible and design learning situations closer to real use.',
    researchTitle: 'User research',
    researchText: `Three 30-minute interviews with active users of competing apps.

The same issues kept coming back: hard to skip what is already mastered, repetitive exercises, overly generic content, and poor visibility on progress.

The takeaway is simple: motivation was there, but progress did not feel visible enough.`,
    archAlt: 'Architecture and flows',
    archTitle: 'Architecture and flows',
    archText:
      'The experience is organized into five areas: Home, Learn, Quiz, Quests, and Profile.\n\nDuel, themed quiz, and guided learning flows follow the same navigation logic to keep onboarding fast.',
    uiTitle: 'UI design',
    uiText: `The interface supports multiple formats without adding friction.

We used shared building blocks (cards, progress, quiz modules, header) to keep stable landmarks from one screen to another.

Each screen highlights one primary action, structured information, and clear feedback to reduce cognitive load.`,
    dsAlt: 'Design system',
    dsTitle: 'Design system',
    dsText:
      'The project moved in parallel across five sections and two designers, with a clear risk of divergence.\n\nSo we built a complete design system: tokens, foundations, usage-documented components, templates, and Zeroheight documentation synced from Figma.',
    testsAlt: 'User testing',
    testsTitle: 'User testing',
    testsText: `Tests were run with 3 participants across two flows. Scenarios were completed without major blockers.

Main frictions were quiz entry, friend invitations, missing titles on some pages, and lesson resume flow.

Iterations targeted those points: clarify quiz entry, improve end-of-flow screens, and add missing states.`,
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
