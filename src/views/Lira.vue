<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro
      v-if="hasProject"
      :title="projectData.title"
      :type="projectData.type"
      :intro="locale === 'fr'
        ? 'Lira aide les apprenants à lire du contenu réel, sauvegarder les mots utiles en contexte, puis les mémoriser grâce à des révisions personnalisées.'
        : 'Lira helps learners read real content, save useful words in context, and memorize them through personalized review.'"
      :description="projectData.description"
      :services="projectData.services"
      :team="projectData.team"
      :links="projectData.links"
    />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte :video-src="liraDemo" :video-mobile-src="liraDemoMobile"
      :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle" :text="pageContent.contextText" />

    <GridScrollLayoutRows :images="rechercheUX" :title="pageContent.researchTitle" :text="pageContent.researchText" />

    <ImageFullWidthLayout secondary :image-src="designLogicImage" :image-mobile-src="designLogicImageMobile"
      :image-alt="pageContent.designLogicAlt"
      :title="pageContent.designLogicTitle" :text="pageContent.designLogicText" />

    <GridScrollLayout :images="reader" :title="pageContent.readerTitle" :text="pageContent.readerText" />

    <ImageFullWidthLayout :image-src=biblio :image-mobile-src=biblioMobile secondary :image-alt="pageContent.libraryAlt"
      :title="pageContent.libraryTitle" :text="pageContent.libraryText" />

    <GridScrollLayout :images="revision" :title="pageContent.reviewTitle" :text="pageContent.reviewText" />

    <GridScrollLayout :images="design" :title="pageContent.designTitle" :text="pageContent.designText" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayout from '@/components/layouts/GridScrollLayout.vue'
import GridScrollLayoutRows from '@/components/layouts/GridScrollLayoutRows.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/lira/lira-banner.jpg?optimized'
import contexteFr from '@/assets/lira/contexte.jpg?optimized'
import contexteEn from '@/assets/lira/contexte-EN.jpg?optimized'
import liraDemo from '@/assets/lira/lira-demo.mp4'
import liraDemoMobile from '@/assets/lira/lira-demo-mobile.mp4'
import biblioFr from '@/assets/lira/biblio.jpg?optimized'
import biblioEn from '@/assets/lira/biblio-EN.jpg?optimized'
import biblioMobileFr from '@/assets/lira/biblio-mobile.jpg?optimized'
import biblioMobileEn from '@/assets/lira/biblio-mobile-EN.jpg?optimized'
import persona1Fr from '@/assets/lira/persona-01.jpg?optimized&w=1920;2560;3200&quality=92'
import persona1En from '@/assets/lira/persona-01-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import persona2Fr from '@/assets/lira/persona-02.jpg?optimized&w=1920;2560;3200&quality=92'
import persona2En from '@/assets/lira/persona-02-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import persona3Fr from '@/assets/lira/persona-03.jpg?optimized&w=1920;2560;3200&quality=92'
import persona3En from '@/assets/lira/persona-03-EN.jpg?optimized&w=1920;2560;3200&quality=92'
import reader1Fr from '@/assets/lira/reader-large.jpg?optimized'
import reader1En from '@/assets/lira/reader-large-EN.jpg?optimized'
import reader2MobileFr from '@/assets/lira/reader-mobile-mobile.jpg?optimized'
import reader2MobileEn from '@/assets/lira/reader-mobile-mobile-EN.jpg?optimized'
import reader3MobileFr from '@/assets/lira/reader-definitions-mobile.jpg?optimized'
import reader3MobileEn from '@/assets/lira/reader-définitions-mobile-EN.jpg?optimized'
import reader2Fr from '@/assets/lira/reader-definitions.jpg?optimized'
import reader2En from '@/assets/lira/reader-définitions-EN.jpg?optimized'
import reader3Fr from '@/assets/lira/reader-mobile.jpg?optimized'
import reader3En from '@/assets/lira/reader-mobile-EN.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'
import crossFr from '@/assets/lira/crossword.jpg?optimized'
import crossEn from '@/assets/lira/crossword-EN.jpg?optimized'
import statsFr from '@/assets/lira/stats.jpg?optimized'
import statsEn from '@/assets/lira/stats-EN.jpg?optimized'
import statsMobileFr from '@/assets/lira/stats-mobile.jpg?optimized'
import statsMobileEn from '@/assets/lira/stats-mobile-EN.jpg?optimized'
import quizFr from '@/assets/lira/revision.jpg?optimized'
import quizEn from '@/assets/lira/revision-EN.jpg?optimized'
import quizMobileFr from '@/assets/lira/revision-mobile.jpg?optimized'
import quizMobileEn from '@/assets/lira/revision-mobile-EN.jpg?optimized'
import landingFr from '@/assets/lira/landing.jpg?optimized'
import landingEn from '@/assets/lira/landing-EN.jpg?optimized'
import flowImage from '@/assets/lira/flow.jpg?optimized'
import flowMobileImage from '@/assets/lira/mobile-flow.jpg?optimized'
import darkFr from '@/assets/lira/dark.jpg?optimized'
import darkEn from '@/assets/lira/dark-EN.jpg?optimized'
import darkMobileFr from '@/assets/lira/dark-mobile.jpg?optimized'
import darkMobileEn from '@/assets/lira/dark-mobile-EN.jpg?optimized'
import profilFr from '@/assets/lira/profil.jpg?optimized'
import profilEn from '@/assets/lira/profil-EN.jpg?optimized'
import profilMobileFr from '@/assets/lira/profil-mobile.jpg?optimized'
import profilMobileEn from '@/assets/lira/profil-mobile-EN.jpg?optimized'

const PROJECT_ROUTE = '/projet/lira'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Contexte et enjeux',
    contextTitle: 'Contexte et enjeux',
    contextText: `Les apps d'apprentissage des langues ont chacune leur angle mort.

Duolingo installe une habitude, mais le contenu reste artificiel et beaucoup d'utilisateurs stagnent autour du niveau intermédiaire. Anki est extrêmement puissant, mais la création des cartes demande souvent plus d'effort que leur révision. LingQ se rapproche d'une expérience de lecture réelle, mais l'interface peut freiner la prise en main.

Lira part d'un besoin simple : lire du contenu réel, sauvegarder les mots directement dans leur contexte, puis les revoir avec un système de répétition efficace. Le tout sans configuration lourde, ni mécanique de gamification.

Le produit est en ligne depuis mars 2026.`,
    researchTitle: 'Recherche et positionnement',
    researchText: `La recherche s'est faite en amont du lancement, principalement en desk research : Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), forums LingQ, avis App Store et commentaires YouTube.

Ces sources ont un biais évident : elles reflètent souvent des frustrations. Elles restent utiles pour comprendre où les produits actuels échouent.

Un point revient constamment : beaucoup d'apprenants atteignent un plateau autour du niveau intermédiaire. À ce stade, la lecture devient un levier naturel de progression. Le besoin n'est pas de motiver, mais de rendre cette transition plus fluide.

Autre friction récurrente : la création manuelle de cartes Anki, souvent citée comme une raison d'abandon.

À partir de là, j'ai défini trois profils : un utilisateur avancé qui cherche un outil rapide et sans friction, un expatrié qui veut lire du contenu local sans casser son rythme, et un utilisateur régulier d'apps comme Duolingo qui ne ressent plus de progression réelle.`,
    designLogicAlt: 'Logique de design du reader Lira',
    designLogicTitle: 'Logique de design',
    designLogicText: `La lecture reste l'activité principale. Tout le reste doit s'y intégrer sans l'interrompre.

Le panneau de traduction s'ouvre sans remplacer la page. Le texte reste visible. Un mot se consulte en un geste.

La sauvegarde a demandé le plus d'ajustements. Un premier clic ouvre le panneau, un second enregistre le mot. Le retour visuel est immédiat : état chargé, puis confirmation et marquage dans le texte.

Les premières versions utilisaient un overlay plein écran. Ce choix a été abandonné : il coupait la lecture et faisait perdre le repère dans le texte.

La version finale s'ancre en bas sur mobile et sur le côté sur desktop, sans déplacer la colonne de lecture.`,
    readerTitle: 'Le reader',
    readerText: `Le reader est le cœur du produit. L'objectif est simple : lire sans être interrompu.

Un clic sur un mot ouvre un panneau avec deux onglets : traduction et définition. L'utilisateur voit la phonétique et peut lancer une prononciation audio via un moteur local (PiperTTS).

Tout se fait sans quitter la page. Un second clic permet de sauvegarder le mot. Une carte est alors générée automatiquement, en utilisant la phrase d'origine comme contexte de mémorisation.

L'idée est de transformer un moment de lecture en opportunité d'apprentissage, sans changer de mode.`,
    libraryAlt: 'Bibliothèque',
    libraryTitle: 'Bibliothèque et import',
    libraryText: `L'import accepte une URL, un texte, un EPUB ou un PDF. L'utilisateur lit ce qu'il veut, sans bibliothèque imposée.

Pour ceux qui cherchent un point de départ, Lira intègre Project Gutenberg : plusieurs milliers de livres du domaine public, directement dans l'app. Romans, nouvelles, essais en espagnol, allemand, anglais, italien et d'autres langues.

Les textes importés et les livres Gutenberg s'organisent dans la même bibliothèque personnelle. Chaque texte affiche la progression de lecture et le nombre de mots sauvegardés.`,
    reviewTitle: 'Révision et mots croisés',
    reviewText: `La révision repose sur FSRS avec un rappel contextuel. L'utilisateur doit retrouver un mot ou sa traduction, avec la possibilité de revoir la phrase d'origine en cas de doute.

La mémorisation ne passe pas uniquement par le mot isolé, mais aussi par son contexte d'utilisation.

Après quelques minutes de lecture et quelques mots sauvegardés, un mini-quiz optionnel apparaît. Court, rapide, lié à la session en cours.

Les mots croisés sont générés à partir du vocabulaire personnel. Ils offrent une alternative aux flashcards pour varier les sessions de révision.`,
    designTitle: 'Design',
    designText: `La lecture a guidé les choix visuels.

La police Literata est utilisée pour les textes longs, afin d'améliorer le confort de lecture. L'interface repose sur Satoshi pour garder une bonne lisibilité sur les éléments fonctionnels.

Le fond est légèrement teinté pour éviter la fatigue liée au blanc pur. Les couleurs restent limitées : un vert pour les actions et un brun foncé pour le texte.

Le mode sombre reprend les mêmes principes avec des contrastes ajustés pour conserver le confort sur de longues sessions.`,
    revisionAlt1: 'Mots croisés',
    revisionAlt2: 'Flashcards en quiz',
    revisionAlt3: 'Statistiques',
    designAlt2: 'Dark mode',
    designAlt3: 'Profil et paramètres',
    readerAlt1: 'Persona: polyglotte',
    readerAlt2: "Persona: travaille à l'étranger",
    readerAlt3: 'Persona: Duolingo 559 daily streaks'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context and challenges',
    contextTitle: 'Context and challenges',
    contextText: `Language-learning apps each have their own blind spot.

Duolingo builds habits, but its content remains artificial and many users plateau at an intermediate level. Anki is extremely powerful, but creating cards often takes more effort than reviewing them. LingQ moves closer to real reading, but the interface can be hard to navigate.

Lira is built around a simple need: read real content, save words in context, and review them with an efficient repetition system. No heavy setup, no gamification.

The product has been live since March 2026.`,
    researchTitle: 'Research and positioning',
    researchText: `Research was conducted before launch, mainly through desk research: Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), LingQ forums, App Store reviews, and YouTube comments.

These sources are biased toward frustration, but they are useful to understand where existing products fail.

One pattern appears consistently: many learners plateau at an intermediate level. At that stage, reading becomes a natural next step. The challenge is not motivation, but making that transition easier.

Another recurring friction is manual Anki card creation, often cited as a reason for dropping the tool.

From this, three profiles emerged: an advanced user looking for speed and no friction, an expat wanting to read local content without breaking flow, and a regular user of apps like Duolingo who no longer feels progress.`,
    designLogicAlt: 'Lira reader design logic',
    designLogicTitle: 'Design logic',
    designLogicText: `Reading remains the primary activity. Everything else has to fit around it without interrupting it.

The translation panel opens without replacing the page. The text stays visible. A word can be checked in a single gesture.

Saving words required the most iteration. One tap opens the panel, another saves the word. Feedback is immediate: loading state, then confirmation and inline marking.

Early versions used a full-screen overlay. It was dropped because it broke the reading flow and made users lose their place.

The final version anchors at the bottom on mobile and on the side on desktop, without shifting the reading column.`,
    readerTitle: 'Reader',
    readerText: `The reader is the core of the product. The goal is simple: read without interruption.

Clicking a word opens a panel with two tabs: translation and definition. The user sees phonetics and can trigger audio using a local TTS engine (PiperTTS).

Everything happens in place. A second click saves the word, and a card is generated automatically using the original sentence as context.

The idea is to turn reading into learning without switching modes.`,
    libraryAlt: 'Library',
    libraryTitle: 'Library and import',
    libraryText: `Import accepts a URL, plain text, EPUB, or PDF. Users read what they want, with no imposed catalog.

For people who want a starting point, Lira integrates Project Gutenberg: some public-domain books directly available in the app, including novels, short stories, and essays in Spanish, German, English, Italian, and more.

Imported texts and Gutenberg books live in the same personal library. Each text shows reading progress and saved-word count.`,
    reviewTitle: 'Review and crosswords',
    reviewText: `Review relies on FSRS with contextual recall. The user has to retrieve a word or its translation, with the option to reveal the original sentence if needed.

Memorization happens through both the word itself and its usage context.

After a few minutes of reading and a few saved words, a short optional quiz appears, based on the current session.

Crosswords are generated from personal vocabulary. They offer an alternative to flashcards for users who want a different review format.`,
    designTitle: 'Design',
    designText: `Visual choices are driven by reading comfort.

Literata is used for long-form text to improve readability, while the interface relies on Satoshi for functional clarity.

The background uses a slightly warm tone to reduce fatigue compared to pure white. Colors are limited: a green for actions and a dark brown for text.

Dark mode follows the same logic, with adjusted contrast to support long reading sessions.`,
    revisionAlt1: 'Crosswords',
    revisionAlt2: 'Flashcard quiz',
    revisionAlt3: 'Statistics',
    designAlt2: 'Dark mode',
    designAlt3: 'Profile and settings',
    readerAlt1: 'Persona: polyglot',
    readerAlt2: 'Persona: works abroad',
    readerAlt3: 'Persona: Duolingo 559 daily streaks'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)
const isEnglishLocale = computed(() => locale.value === 'en')
const localizedImage = (frImage, enImage) => (isEnglishLocale.value ? enImage ?? frImage : frImage)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const revision = computed(() => [
  { src: localizedImage(crossFr, crossEn), alt: pageContent.value.revisionAlt1 },
  {
    src: localizedImage(quizFr, quizEn),
    mobileSrc: localizedImage(quizMobileFr, quizMobileEn),
    alt: pageContent.value.revisionAlt2
  },
  {
    src: localizedImage(statsFr, statsEn),
    mobileSrc: localizedImage(statsMobileFr, statsMobileEn),
    alt: pageContent.value.revisionAlt3
  }
])

const design = computed(() => [
  { src: localizedImage(landingFr, landingEn), alt: 'Landing page' },
  {
    src: localizedImage(darkFr, darkEn),
    mobileSrc: localizedImage(darkMobileFr, darkMobileEn),
    alt: pageContent.value.designAlt2
  },
  {
    src: localizedImage(profilFr, profilEn),
    mobileSrc: localizedImage(profilMobileFr, profilMobileEn),
    alt: pageContent.value.designAlt3
  }
])

const reader = computed(() => [
  { src: localizedImage(reader1Fr, reader1En), alt: pageContent.value.readerAlt1 },
  {
    src: localizedImage(reader2Fr, reader2En),
    mobileSrc: localizedImage(reader2MobileFr, reader2MobileEn),
    alt: pageContent.value.readerAlt2
  },
  {
    src: localizedImage(reader3Fr, reader3En),
    mobileSrc: localizedImage(reader3MobileFr, reader3MobileEn),
    alt: pageContent.value.readerAlt3
  }
])

const rechercheUX = computed(() => [
  { src: localizedImage(persona1Fr, persona1En), alt: pageContent.value.readerAlt1 },
  { src: localizedImage(persona2Fr, persona2En), alt: pageContent.value.readerAlt2 },
  { src: localizedImage(persona3Fr, persona3En), alt: pageContent.value.readerAlt3 }
])

const contexte = computed(() => localizedImage(contexteFr, contexteEn))
const biblio = computed(() => localizedImage(biblioFr, biblioEn))
const biblioMobile = computed(() => localizedImage(biblioMobileFr, biblioMobileEn))
const designLogicImage = computed(() => flowImage)
const designLogicImageMobile = computed(() => flowMobileImage)

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
