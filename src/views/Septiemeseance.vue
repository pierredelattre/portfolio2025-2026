<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src="contextImage" :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle"
      :text="pageContent.contextText" />

    <ImageFullWidthLayout secondary :image-mobile-src="geolocationImageMobile" :image-src="geolocationImage"
      :image-alt="pageContent.geoAlt" :title="pageContent.geoTitle" :text="pageContent.geoText" />

    <GridScrollLayout :images="gridScrollImages" :title="pageContent.filtersTitle" :text="gridScrollFiltersText" />

    <ImageFullWidthLayout secondary :image-mobile-src="projectionsImageMobile" :image-src="projectionsImage"
      :image-alt="pageContent.listAlt" :title="pageContent.listTitle" :text="pageContent.listText" />

    <GridScrollLayout :images="productDecisionsImages" :title="pageContent.productDecisionsTitle"
      :text="pageContent.productDecisionsText" />

    <GridScrollLayout :images="upgrades" :title="pageContent.futureTitle" :text="pageContent.futureText" />
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

import projectBackground from '@/assets/septiemeseance/002.jpg?optimized'
import contextImage from '@/assets/septiemeseance/contexte.jpg?optimized'
import geolocationImage from '@/assets/septiemeseance/geoloc.jpg?optimized'
import geolocationImageMobile from '@/assets/septiemeseance/mobile-geoloc.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import projectionsImage from '@/assets/septiemeseance/projections.jpg?optimized'
import projectionsImageMobile from '@/assets/septiemeseance/mobile-projections.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterFilmsImage from '@/assets/septiemeseance/filter-films.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import filterFilmsMobileImage from '@/assets/septiemeseance/mobile-filter-films.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterPerimeterImage from '@/assets/septiemeseance/filter-perimetre.jpg?optimized'
import filterPerimeterMobileImage from '@/assets/septiemeseance/mobile-filter-perimetre.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterLanguageImage from '@/assets/septiemeseance/filter-langue.jpg?optimized'
import filterLanguageMobileImage from '@/assets/septiemeseance/mobile-filter-langue.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterEmptyImage from '@/assets/septiemeseance/filter-empty.jpg?optimized&w=1920;2560;3200&quality=98&lossless=true'
import filterEmptyMobileImage from '@/assets/septiemeseance/mobile-filter-empty.jpg?optimized&w=480;720;960;1280&quality=95&format=webp;jpg'
import filterSeancesImage from '@/assets/septiemeseance/filter-seances.jpg?optimized'
import filterSeancesMobileImage from '@/assets/septiemeseance/mobile-filter-seances.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import filterResultsImage from '@/assets/septiemeseance/filter-results.jpg?optimized'
import filterResultsMobileImage from '@/assets/septiemeseance/mobile-filter-results.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import notesImage from '@/assets/septiemeseance/notes.jpg?optimized'
import alertsImage from '@/assets/septiemeseance/alertes.jpg?optimized'
import alertsImageMobile from '@/assets/septiemeseance/mobile-alertes.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'
import letterboxdImage from '@/assets/septiemeseance/letterboxd.jpg?optimized'
import letterboxdMobileImage from '@/assets/septiemeseance/mobile-letterboxd.jpg?optimized&w=480;720;960;1280&quality=85&format=webp;jpg'

const PROJECT_ROUTE = '/projet/septiemeseance'
const { locale } = useLocale()

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: '← Retour à l’accueil',
    contextAlt: 'Vue écran du contexte du service',
    contextTitle: 'Contexte et enjeu',
    contextText: `Les services cinéma existants proposent beaucoup d'informations, mais rarement sous une forme exploitable immédiatement. L'utilisateur doit naviguer entre plusieurs écrans avant de voir les séances autour de lui, parfois même sans prise en compte fiable de sa position.

Le problème n'était pas un manque de contenu, mais un manque de hiérarchie et de vitesse d'accès à l'information. L'objectif produit était donc clair : permettre à un utilisateur de comprendre ce qui se joue autour de lui en quelques secondes et choisir une séance sans friction.

Le service a été conçu et lancé comme un produit complet, de la recherche à la mise en ligne. Il s'est arrêté suite à une restriction d'accès à l'API de données, mais reste un cas représentatif d'un cycle produit complet, avec contraintes techniques réelles.`,
    geoAlt: 'Géolocalisation ou recherche manuelle',
    geoTitle: 'Géolocalisation ou recherche manuelle',
    geoText: `Deux points d'entrée ont été conçus : géolocalisation ou recherche manuelle. L'enjeu n'était pas d'ajouter des options, mais de réduire le temps d'accès à une première réponse pertinente.

La géolocalisation permet d'afficher immédiatement les cinémas proches avec un rayon ajustable. La recherche manuelle couvre les cas où l'utilisateur pense en termes de lieu précis, de film ou de salle.

Les deux modes convergent vers le même objectif : afficher des résultats exploitables en un minimum d'interactions.`,
    filtersTitle: 'Filtres de recherche',
    listAlt: 'Liste des projections autour',
    listTitle: 'Liste des projections autour',
    listText: `Une fois la zone définie, les séances apparaissent immédiatement. Les cinémas sont triés par proximité, avec un accès direct aux séances du jour.

La présentation est volontairement compacte et mobile-first : chaque élément doit être scannable en quelques secondes. L'objectif n'est pas d'exposer toute la donnée, mais de permettre une décision rapide.

Chaque écran est pensé comme une réduction de l'incertitude : où, quand, et quoi regarder.`,
    productDecisionsTitle: 'Décisions produit et arbitrages',
    productDecisionsText: `Le premier écran est une barre de recherche, sans distraction. Les utilisateurs arrivent avec une intention claire : savoir ce qui passe maintenant ou ce soir.

Les résultats sont organisés pour maximiser la lisibilité : affiches en grille, informations essentielles visibles immédiatement, filtres séparés entre contenu et localisation.

Plusieurs arbitrages ont structuré le produit :

- L'intégration Letterboxd a été abandonnée. Pertinente dans certains contextes (catalogue large), elle n'améliorait pas la décision dans les cas majoritaires.
- L'affichage des prix a été écarté. Bien que techniquement possible, la donnée était trop incomplète à grande échelle (2 300 cinémas, multiples séances). Une information partielle aurait dégradé la confiance.

Ces choix illustrent une logique produit simple : privilégier la fiabilité et la rapidité de décision plutôt que la richesse fonctionnelle.

Stack : React, Tailwind, Figma, Heroicons.`,
    futureTitle: 'Futures améliorations',
    futureText: `Les tests ont montré un comportement inattendu : plusieurs utilisateurs recherchaient directement un cinéma, plutôt que d'utiliser la géolocalisation. Leur besoin était différent : voir un programme complet sur plusieurs jours.

Cela a conduit à deux évolutions prioritaires : recherche par cinéma avec autocomplétion, et pages cinéma multi-jours.

Les prochaines itérations visaient à enrichir l'expérience sans compromettre la simplicité : mise en avant de la prochaine séance, alertes personnalisées, métadonnées utiles (formats, avant-premières), et amélioration des filtres (compteurs, reset, feedback temps réel).

Chaque amélioration est évaluée selon un critère : réduit-elle le temps nécessaire pour prendre une décision ?`,
    filtersDescription:
      'Pour accompagner la recherche, des filtres ont été ajoutés afin de permettre un tri plus précis selon les situations.',
    filtersOne:
      'Certains filtres affinent les résultats : genre, année, durée et option films récents vs films cultes encore projetés. Les utilisateurs peuvent aussi filtrer par abonnements acceptés (UGC, Pathé...).',
    filtersTwo:
      "L'utilisateur peut définir la distance autour du point géolocalisé ou autour de la ville/cinéma choisi manuellement. Il peut aussi choisir la date souhaitée pour voir les projections correspondantes.",
    filtersThree:
      "La gestion des langues et sous-titres fait aussi partie des options. L'idée est de laisser chacun adapter l'affichage selon ses contraintes.",
    altFilters1: 'Filtrer les films',
    altFilters2: 'Périmètre de recherche et date',
    altFilters3: 'Choix des langues et sous-titres',
    altUpgrades1: 'Ajout des notes et critiques',
    altUpgrades2: "Alerte de projection autour de chez soi",
    altUpgrades3: 'Connexion Letterboxd'
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Service context overview',
    contextTitle: 'Context and challenge',
    contextText: `Existing cinema services provide a lot of information, but rarely in a way that is immediately usable. Users often navigate across multiple screens before seeing relevant showtimes, sometimes without reliable use of their location.

The problem was not lack of content, but lack of hierarchy and speed. The product goal was clear: allow users to understand what is playing nearby within seconds and pick a session without friction.

The product was designed and launched end-to-end, from research to production. It was later stopped due to API access restrictions, but remains a strong example of a full product cycle with real technical constraints.`,
    geoAlt: 'Geolocation or manual search',
    geoTitle: 'Geolocation or manual search',
    geoText: `Two entry points were designed: geolocation or manual search. The goal was not to add options, but to reduce time to first relevant result.

Geolocation instantly displays nearby cinemas with an adjustable radius. Manual search covers cases where users think in terms of a specific place, movie, or theater.

Both paths converge toward the same objective: delivering usable results with minimal interaction.`,
    filtersTitle: 'Search filters',
    listAlt: 'Nearby showtimes list',
    listTitle: 'Nearby showtimes list',
    listText: `Once the area is defined, showtimes appear immediately. Cinemas are sorted by distance with direct access to same-day sessions.

The layout is intentionally compact and mobile-first: every element must be scannable within seconds. The goal is not to expose all data, but to enable fast decisions.

Each screen reduces uncertainty: where, when, and what to watch.`,
    productDecisionsTitle: 'Product decisions and trade-offs',
    productDecisionsText: `The first screen is a search bar, nothing else. Users arrive with a clear intent: what is playing now or tonight.

Results are structured for readability: posters in a grid, essential information immediately visible, filters split between content and location.

Key product trade-offs:

- Letterboxd integration was dropped. Relevant in specific contexts, but did not improve decision-making in most cases.
- Ticket pricing was removed. Although technically possible, the data was too incomplete at scale (2,300 cinemas, multiple screenings). Partial information would reduce trust.

These decisions reflect a simple principle: prioritize reliability and speed of decision over feature richness.

Stack: React, Tailwind, Figma, Heroicons.`,
    futureTitle: 'Future improvements',
    futureText: `User testing revealed an unexpected behavior: several users searched directly by cinema name instead of using geolocation. Their need was different: viewing a full weekly schedule.

This led to two key roadmap decisions: cinema search with autocomplete, and multi-day cinema pages.

Future iterations focused on enriching the experience without compromising simplicity: highlighting next sessions, personalized alerts, useful metadata (formats, premieres), and improved filtering (real-time counts, reset actions, feedback).

Each improvement is evaluated against a single question: does it reduce the time needed to make a decision?`,
    filtersDescription:
      'To support search, filters were added to enable more precise and useful sorting across different user contexts.',
    filtersOne:
      'Some filters refine results by genre, year, duration, and by distinguishing recent movies from cult classics still being screened. Users can also filter by accepted subscriptions (UGC, Pathe...).',
    filtersTwo:
      'Users can define distance around the detected location or around a manually selected city/cinema. They can also set a desired date to view matching showtimes.',
    filtersThree:
      'Language and subtitle preferences are also available. The goal is to let users tailor the experience to their constraints.',
    altFilters1: 'Filter movies',
    altFilters2: 'Search radius and date',
    altFilters3: 'Language and subtitle preferences',
    altUpgrades1: 'Ratings and reviews',
    altUpgrades2: 'Showtime notifications nearby',
    altUpgrades3: 'Letterboxd account link'
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const gridScrollImages = computed(() => [
  { src: filterFilmsImage, mobileSrc: filterFilmsMobileImage, alt: pageContent.value.altFilters1 },
  { src: filterPerimeterImage, mobileSrc: filterPerimeterMobileImage, alt: pageContent.value.altFilters2 },
  { src: filterLanguageImage, mobileSrc: filterLanguageMobileImage, alt: pageContent.value.altFilters3 }
])

const upgrades = computed(() => [
  { src: notesImage, alt: pageContent.value.altUpgrades1 },
  { src: alertsImage, mobileSrc: alertsImageMobile, alt: pageContent.value.altUpgrades2 },
  { src: letterboxdImage, mobileSrc: letterboxdMobileImage, alt: pageContent.value.altUpgrades3 }
])

const productDecisionsImages = computed(() => [
  { src: filterEmptyImage, mobileSrc: filterEmptyMobileImage, alt: 'Empty filter state' },
  { src: filterSeancesImage, mobileSrc: filterSeancesMobileImage, alt: 'Showtime filter state' },
  { src: filterResultsImage, mobileSrc: filterResultsMobileImage, alt: 'Filter results state' }
])

const gridScrollFiltersText = computed(() => [
  {
    description: pageContent.value.filtersDescription,
    1: pageContent.value.filtersOne,
    2: pageContent.value.filtersTwo,
    3: pageContent.value.filtersThree,
  }
])

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
@media screen and (max-width: 768px) {
  section.layout.layout-grid-scroll:nth-child(2) img:nth-child(2) {
    height: 100%!important;
  }
}

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
