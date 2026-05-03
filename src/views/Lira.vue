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

    <ColumnTextLayout :video-src="onboardingVideo" :image-alt="pageContent.onboardingAlt" :title="pageContent.onboardingTitle"
      :text="pageContent.onboardingText" />

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
import onboardingVideo from '@/assets/lira/lira-onboarding.mp4'
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
    contextText: `Les apps d'apprentissage ont chacune leur angle mort. Duolingo crée une habitude sur du contenu artificiel. Anki est puissant, mais la création de cartes rebute. LingQ est proche du réel, l'interface moins.

Lira répond à un besoin simple : lire du vrai contenu, sauvegarder les mots en contexte pour les revoir. En ligne depuis mars 2026.`,
    researchTitle: 'Recherche et positionnement',
    researchText: `Desk research avant lancement : Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), forums LingQ, avis App Store, commentaires YouTube.

Deux points reviennent : le plateau au niveau intermédiaire sans passage naturel vers la lecture, et la création manuelle de cartes Anki, souvent la raison d'arrêt.`,
    designLogicAlt: 'Logique de design du reader Lira',
    designLogicTitle: 'Logique de design',
    designLogicText: `La lecture reste l'activité principale. Tout le reste doit s'y intégrer sans l'interrompre.

Le panneau s'ouvre sans remplacer la page. Un clic ouvre le panneau, un deuxième enregistre le mot avec sa phrase d'origine. En bas sur mobile, sur le côté sur desktop : la colonne de lecture ne bouge pas.`,
    readerTitle: 'Le reader',
    readerText: `Un clic ouvre le panneau : traduction, définition, phonétique, audio via PiperTTS (local). Le mot se sauvegarde en un clic de plus, avec la phrase d'origine comme contexte.`,
    onboardingAlt: 'Onboarding Lira',
    onboardingTitle: 'Onboarding',
    onboardingText: `L'onboarding se déroule en quatre étapes avant inscription : choix de la langue cible, sélection d'un extrait de livre, première interaction de lecture (traduire puis sauvegarder un mot), puis création de compte.

L'objectif est d'arriver dans le reader avec un texte déjà prêt, puis de montrer immédiatement la boucle complète lecture → vocabulaire → révision.`,
    libraryAlt: 'Bibliothèque',
    libraryTitle: 'Bibliothèque et import',
    libraryText: `Import : URL, EPUB, PDF, HTML ou texte brut. Project Gutenberg est intégré directement, avec des livres du domaine public en espagnol, allemand, anglais et italien.`,
    reviewTitle: 'Révision et mots croisés',
    reviewText: `Révision FSRS avec rappel contextuel. L'utilisateur retrouve un mot ou sa traduction, avec la phrase d'origine disponible en cas de doute. Après la lecture, un mini-quiz optionnel apparaît sur les mots de la session.

Les mots croisés sont générés à partir du vocabulaire personnel.`,
    designTitle: 'Design',
    designText: `Literata pour les textes longs, Satoshi pour l'interface. Fond légèrement teinté pour éviter la fatigue du blanc pur. Palette limitée : vert pour les actions, brun foncé pour le texte.`,
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
    contextText: `Language-learning apps all have their blind spot. Duolingo builds habits on artificial content. Anki is powerful, but making cards puts people off. LingQ gets close to real reading. The interface less so.

Lira is built around one need: read real content, save words in context, review them. Live since March 2026.`,
    researchTitle: 'Research and positioning',
    researchText: `Desk research before launch: Reddit (r/languagelearning, r/Anki, r/duolingo, r/busuu...), LingQ forums, App Store reviews, YouTube comments.

Two patterns kept coming up: the plateau at intermediate level with no natural move toward reading, and manual Anki card creation, usually the reason people quit.`,
    designLogicAlt: 'Lira reader design logic',
    designLogicTitle: 'Design logic',
    designLogicText: `Reading is the primary activity. Everything else has to work around it.

The panel opens without replacing the page. One tap opens it, a second tap saves the word with its original sentence. Bottom on mobile, side on desktop: the reading column stays put.`,
    readerTitle: 'Reader',
    readerText: `Tapping a word opens the panel: translation, definition, phonetics, audio via PiperTTS (local). A second tap saves the word with its original sentence as context.`,
    onboardingAlt: 'Lira onboarding',
    onboardingTitle: 'Onboarding',
    onboardingText: `Onboarding runs in four steps before signup: choose a target language, pick a book excerpt, complete a first reading interaction (translate then save a word), then create an account.

The goal is to enter the reader with a text already ready, then immediately show the full loop: reading -> vocabulary -> review.`,
    libraryAlt: 'Library',
    libraryTitle: 'Library and import',
    libraryText: `Import: URL, EPUB, PDF, HTML or plain text. Project Gutenberg is built in, with public-domain books in Spanish, German, English and Italian.`,
    reviewTitle: 'Review and crosswords',
    reviewText: `FSRS-based review with contextual recall. Users look up a word or its translation, with the original sentence available when in doubt. After a reading session, a short optional quiz appears based on words from that session.

Crosswords pull from personal vocabulary.`,
    designTitle: 'Design',
    designText: `Literata for long-form text, Satoshi for the interface. Background slightly tinted to cut eye strain from pure white. Limited palette: green for actions, dark brown for text.`,
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
