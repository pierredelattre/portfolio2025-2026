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
    contextText: `Les services cinéma donnent beaucoup d'informations, mais rarement dans un format exploitable immédiatement. L'objectif était de réduire le temps entre l'entrée et le choix d'une séance.

Le produit a été conçu et lancé de bout en bout. Il s'est arrêté après une restriction d'accès à l'API, mais reste un cas concret de cycle produit complet sous contrainte technique.`,
    geoAlt: 'Géolocalisation ou recherche manuelle',
    geoTitle: 'Géolocalisation ou recherche manuelle',
    geoText: `Deux entrées : géolocalisation ou recherche manuelle. Le but était d'obtenir une première réponse utile en quelques interactions.

La géolocalisation affiche les cinémas proches avec rayon ajustable. La recherche manuelle couvre les cas orientés lieu, film ou salle.`,
    filtersTitle: 'Filtres de recherche',
    listAlt: 'Liste des projections autour',
    listTitle: 'Liste des projections autour',
    listText: `Dès que la zone est définie, les séances s'affichent et les cinémas sont triés par proximité.

La liste est compacte et mobile-first pour permettre une lecture rapide et une décision immédiate.

La compacité sert un objectif simple: moins de scan, donc une décision plus rapide.`,
    productDecisionsTitle: 'Décisions produit et arbitrages',
    productDecisionsText: `Le produit est centré sur une intention immédiate : trouver quoi voir maintenant ou ce soir.

Deux arbitrages ont guidé la version : abandon de l'intégration Letterboxd et retrait des prix, car la donnée restait trop incomplète à l'échelle et nuisait à la confiance.`,
    futureTitle: 'Futures améliorations',
    futureText: `Les tests ont révélé un besoin complémentaire : rechercher directement un cinéma pour voir son programme sur plusieurs jours.

Priorités retenues : recherche cinéma avec autocomplétion et pages cinéma multi-jours, puis enrichissements ciblés (prochaine séance, alertes, métadonnées utiles, filtres améliorés) sans alourdir le parcours.`,
    filtersDescription:
      'Les filtres servent à transformer une liste large en sélection exploitable rapidement. Ils couvrent le contenu (genre, année, durée, récents/cultes), le contexte (distance, date, abonnements) et les contraintes de séance (langues, sous-titres).',
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
    contextText: `Cinema services provide plenty of information, but rarely in a format you can use right away. The goal was to shorten the time between entry and choosing a showtime.

The product was designed and launched end to end. It stopped after API access restrictions, but it remains a concrete example of a full product cycle under technical constraints.`,
    geoAlt: 'Geolocation or manual search',
    geoTitle: 'Geolocation or manual search',
    geoText: `Two entry points: geolocation or manual search. The goal was to get a first useful answer in just a few interactions.

Geolocation shows nearby cinemas with an adjustable radius. Manual search covers place-driven, movie-driven, or cinema-driven queries.`,
    filtersTitle: 'Search filters',
    listAlt: 'Nearby showtimes list',
    listTitle: 'Nearby showtimes list',
    listText: `As soon as the area is set, showtimes appear and cinemas are sorted by proximity.

The list is compact and mobile-first to support fast scanning and immediate decisions.

Compactness serves a simple goal: less scan time, faster decisions.`,
    productDecisionsTitle: 'Product decisions and trade-offs',
    productDecisionsText: `The product is centered on an immediate intent: find what to watch now or tonight.

Two trade-offs shaped this version: dropping Letterboxd integration and removing prices, because data stayed too incomplete at scale and hurt trust.`,
    futureTitle: 'Future improvements',
    futureText: `Testing revealed a complementary need: searching directly for a cinema to view its multi-day schedule.

Priorities selected: cinema search with autocomplete and multi-day cinema pages, followed by targeted enrichments (next session, alerts, useful metadata, improved filters) without adding friction to the journey.`,
    filtersDescription:
      'Filters turn a broad list into a selection users can act on quickly. They cover content (genre, year, duration, recent/cult), context (distance, date, subscriptions), and session constraints (languages, subtitles).',
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

const gridScrollFiltersText = computed(() => pageContent.value.filtersDescription)

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
