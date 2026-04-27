<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>{{ pageContent.projectNotFound }}</h2>
      <RouterLink to="/" data-link>{{ pageContent.backToHome }}</RouterLink>
    </section>

    <ColumnTextLayout :image-src="contexteImage" :image-mobile-src="contexteMobileImage"
      :image-alt="pageContent.contextAlt" :title="pageContent.contextTitle" :text="pageContent.contextText" />

    <ImageFullWidthLayout secondary :image-src="cadrageImage" :image-mobile-src="cadrageMobileImage"
      :image-alt="pageContent.discoveryTitle" :title="pageContent.discoveryTitle" :text="pageContent.discoveryText" />

    <GridScrollLayoutRows :images="needsImages" :title="pageContent.needsTitle" :text="pageContent.needsText" />

    <GridScrollLayoutRows :images="principlesImages" :title="pageContent.uxTitle" :text="pageContent.uxText" />

    <ImageFullWidthLayout secondary :image-src="arboImage" :image-mobile-src="arboMobileImage"
      :image-alt="pageContent.archAlt" :title="pageContent.archTitle" :text="pageContent.archText" />

    <ColumnTextLayout :image-src="roadmapImage" :image-mobile-src="roadmapMobileImage"
      :image-alt="pageContent.roadmapAlt" :title="pageContent.roadmapTitle" :text="pageContent.roadmapText" />

    <ColumnTextLayout :image-src="impactImage" :image-mobile-src="impactMobileImage"
      :image-alt="pageContent.impactAlt" :title="pageContent.impactTitle" :text="pageContent.impactText" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectIntro from '@/components/ProjectIntro.vue'
import ColumnTextLayout from '@/components/layouts/ColumnTextLayout.vue'
import ImageFullWidthLayout from '@/components/layouts/ImageFullWidthLayout.vue'
import GridScrollLayoutRows from '@/components/layouts/GridScrollLayoutRows.vue'
import { usePageLoaded } from '@/composables/usePageLoaded'
import { getWorksByLocale } from '@/data/content'
import { useLocale } from '@/i18n'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/mba/mba-banner.jpg'

import contexteFr from '@/assets/mba/mba-contexte-contraintes.jpg'
import contexteFrWebp from '@/assets/mba/mba-contexte-contraintes.webp'
import contexteEn from '@/assets/mba/en-mba-contexte-contraintes.jpg'
import contexteEnWebp from '@/assets/mba/en-mba-contexte-contraintes.webp'
import contexteMobileFr from '@/assets/mba/mobile-mba-contexte-contraintes.jpg'
import contexteMobileFrWebp from '@/assets/mba/mobile-mba-contexte-contraintes.webp'
import contexteMobileEn from '@/assets/mba/en-mobile-mba-contexte-contraintes.jpg'
import contexteMobileEnWebp from '@/assets/mba/en-mobile-mba-contexte-contraintes.webp'

import cadrageFr from '@/assets/mba/mba-cadrage.jpg'
import cadrageFrWebp from '@/assets/mba/mba-cadrage.webp'
import cadrageEn from '@/assets/mba/en-mba-cadrage.jpg'
import cadrageEnWebp from '@/assets/mba/en-mba-cadrage.webp'
import cadrageMobileFr from '@/assets/mba/mobile-mba-cadrage.jpg'
import cadrageMobileFrWebp from '@/assets/mba/mobile-mba-cadrage.webp'
import cadrageMobileEn from '@/assets/mba/en-mobile-mba-cadrage.jpg'
import cadrageMobileEnWebp from '@/assets/mba/en-mobile-mba-cadrage.webp'

import frictionsFr from '@/assets/mba/mba-frictions.jpg'
import frictionsFrWebp from '@/assets/mba/mba-frictions.webp'
import frictionsEn from '@/assets/mba/en-mba-frictions.jpg'
import frictionsEnWebp from '@/assets/mba/en-mba-frictions.webp'
import frictionsMobileFr from '@/assets/mba/mobile-mba-frictions.jpg'
import frictionsMobileFrWebp from '@/assets/mba/mobile-mba-frictions.webp'
import frictionsMobileEn from '@/assets/mba/en-mobile-mba-frictions.jpg'
import frictionsMobileEnWebp from '@/assets/mba/en-mobile-mba-frictions.webp'

import personasFr from '@/assets/mba/mba-personas.jpg'
import personasFrWebp from '@/assets/mba/mba-personas.webp'
import personasEn from '@/assets/mba/en-mba-personas.jpg'
import personasEnWebp from '@/assets/mba/en-mba-personas.webp'
import personasMobileFr from '@/assets/mba/mobile-mba-personas.jpg'
import personasMobileFrWebp from '@/assets/mba/mobile-mba-personas.webp'
import personasMobileEn from '@/assets/mba/en-mobile-mba-personas.jpg'
import personasMobileEnWebp from '@/assets/mba/en-mobile-mba-personas.webp'

import principesFr from '@/assets/mba/mba-principes.jpg'
import principesFrWebp from '@/assets/mba/mba-principes.webp'
import principesEn from '@/assets/mba/en-mba-principes.jpg'
import principesEnWebp from '@/assets/mba/en-mba-principes.webp'
import principesMobileFr from '@/assets/mba/mobile-mba-principes.jpg'
import principesMobileFrWebp from '@/assets/mba/mobile-mba-principes.webp'
import principesMobileEn from '@/assets/mba/en-mobile-mba-principes.jpg'
import principesMobileEnWebp from '@/assets/mba/en-mobile-mba-principes.webp'

import priorisationFr from '@/assets/mba/mba-priorisation.jpg'
import priorisationFrWebp from '@/assets/mba/mba-priorisation.webp'
import priorisationEn from '@/assets/mba/en-mba-priorisation.jpg'
import priorisationEnWebp from '@/assets/mba/en-mba-priorisation.webp'
import priorisationMobileFr from '@/assets/mba/mobile-mba-priorisation.jpg'
import priorisationMobileFrWebp from '@/assets/mba/mobile-mba-priorisation.webp'
import priorisationMobileEn from '@/assets/mba/en-mobile-mba-priorisation.jpg'
import priorisationMobileEnWebp from '@/assets/mba/en-mobile-mba-priorisation.webp'

import arboFr from '@/assets/mba/mba-arbo.jpg'
import arboFrWebp from '@/assets/mba/mba-arbo.webp'
import arboEn from '@/assets/mba/en-mba-arbo.jpg'
import arboEnWebp from '@/assets/mba/en-mba-arbo.webp'
import arboMobileFr from '@/assets/mba/mobile-mba-arbo.jpg'
import arboMobileFrWebp from '@/assets/mba/mobile-mba-arbo.webp'
import arboMobileEn from '@/assets/mba/en-mobile-mba-arbo.jpg'
import arboMobileEnWebp from '@/assets/mba/en-mobile-mba-arbo.webp'

import roadmapFr from '@/assets/mba/mba-roadmap.jpg'
import roadmapFrWebp from '@/assets/mba/mba-roadmap.webp'
import roadmapEn from '@/assets/mba/en-mba-roadmap.jpg'
import roadmapEnWebp from '@/assets/mba/en-mba-roadmap.webp'
import roadmapMobileFr from '@/assets/mba/mobile-mba-roadmap.jpg'
import roadmapMobileFrWebp from '@/assets/mba/mobile-mba-roadmap.webp'
import roadmapMobileEn from '@/assets/mba/en-mobile-mba-roadmap.jpg'
import roadmapMobileEnWebp from '@/assets/mba/en-mobile-mba-roadmap.webp'

import impactFr from '@/assets/mba/mba-impact.jpg'
import impactFrWebp from '@/assets/mba/mba-impact.webp'
import impactEn from '@/assets/mba/en-mba-impact.jpg'
import impactEnWebp from '@/assets/mba/en-mba-impact.webp'
import impactMobileFr from '@/assets/mba/mobile-mba-impact.jpg'
import impactMobileFrWebp from '@/assets/mba/mobile-mba-impact.webp'
import impactMobileEn from '@/assets/mba/en-mobile-mba-impact.jpg'
import impactMobileEnWebp from '@/assets/mba/en-mobile-mba-impact.webp'

const PROJECT_ROUTE = '/projet/my-business-academy'
const { locale } = useLocale()
const isEnglishLocale = computed(() => locale.value === 'en')
const createPictureSource = (webpSrc, jpgSrc) => ({
  sources: {
    webp: webpSrc
  },
  img: {
    src: jpgSrc
  }
})
const localizedPicture = (frWebp, frJpg, enWebp, enJpg) =>
  isEnglishLocale.value
    ? createPictureSource(enWebp ?? frWebp, enJpg ?? frJpg)
    : createPictureSource(frWebp, frJpg)

const PAGE_CONTENT = {
  fr: {
    projectNotFound: 'Projet introuvable',
    backToHome: "← Retour à l'accueil",
    contextAlt: 'Contexte',
    contextTitle: 'Contexte',
    contextText: `My Business Academy est un organisme de formation français certifié Qualiopi. J'ai accompagné la phase de cadrage avant de passer à l'interface, avec un objectif clair : rendre une offre complexe plus facile à comprendre et à choisir.

Le sujet dépassait largement le design visuel. Il fallait aider les visiteurs à comprendre l'offre rapidement, les rassurer, faciliter la prise de contact et poser une structure de contenu durable.

Ce travail sert à la fois le site public et une base de connaissance interne, pensée pour mieux organiser la documentation et préparer certains usages liés à l'IA.`,
    discoveryTitle: 'Cadrage et recherche exploratoire',
    discoveryText: `J'ai commencé par clarifier le problème avant de penser aux écrans. Les premières questions étaient simples : qu'est-ce qu'un visiteur doit comprendre en arrivant ? Qu'est-ce qui peut le bloquer ? Qu'est-ce qui peut lui donner confiance ?

La recherche a couvert six concurrents directs, avec une lecture à la fois UX, SEO et contenu : structure des pages, signaux de réassurance, clarté des offres, accès aux informations de financement et logique de contact.

Ce qui ressortait le plus : les meilleurs parcours partent d'une intention claire, alors que beaucoup d'acteurs noient l'utilisateur dans un catalogue trop large. Le financement arrivait aussi souvent trop tard, alors qu'il fait partie des premières questions côté utilisateur.`,
    needsAlt: 'Synthèse des besoins utilisateurs',
    needsTitle: 'Besoins utilisateurs et personas',
    needsText: `J'ai synthétisé quatre profils principaux : une personne en reconversion, un salarié qui veut évoluer, un porteur de projet et un employeur ou responsable RH.

Ils n'ont pas tous les mêmes attentes, mais ils partagent une même contrainte : ils doivent comprendre vite s'ils sont au bon endroit. Ils ont besoin d'informations lisibles, de preuves de sérieux et d'un chemin clair vers l'étape suivante.

C'est pour cette raison que j'ai écarté l'idée d'un catalogue complet dès l'arrivée. Sur le papier, cela donne une impression de richesse. En pratique, cela ajoute surtout de la charge mentale et ralentit la décision.`,
    uxTitle: 'Principes UX et priorisation',
    uxText: `Les principes retenus sont volontairement simples : aller à l'essentiel, rassurer progressivement, penser mobile dès le départ, garder une structure accessible et rendre le contenu facile à maintenir.

Le parcours principal devient : accueil -> catégories -> fiches formation -> contact. Chaque page a un rôle précis : aider à comprendre, comparer, vérifier que l'offre est crédible, puis passer à l'action.

J'ai privilégié une conception page par page plutôt qu'un travail en parallèle sur tout le site. C'était plus lent au départ, mais plus sûr pour garder une expérience cohérente et faciliter la passation ensuite.`,
    archAlt: "Architecture de l'information",
    archTitle: "Architecture de l'information",
    archText: `L'architecture suit une progression simple : accueil -> catalogue -> catégories -> fiches formation, avec des pages transverses pour le financement, l'organisme, le contact et les mentions légales.

Deux parcours ont servi de repères : la personne en reconversion, qui cherche une formation puis veut comprendre le financement, et l'employeur, qui a surtout besoin de preuves de sérieux avant de faire une demande.

La personnalisation reste légère : formulaires préremplis selon le contexte, appels à l'action adaptés et formulations plus proches de la situation de l'utilisateur. L'idée est de retirer les petites décisions inutiles avant la prise de contact.`,
    roadmapAlt: 'Roadmap et prochaines étapes',
    roadmapTitle: 'Roadmap et prochaines étapes',
    roadmapText: `Le socle est posé : cadrage, recherche, architecture, principes UX et gouvernance de contenu.

La suite prévue : passer aux maquettes, préparer la passation front, mettre en ligne une première version instrumentée, puis améliorer le parcours à partir de signaux réels.

L'objectif est de livrer une version claire sans figer le produit trop tôt. Chaque étape prépare la suivante : mesurer les frictions, qualifier les demandes et comprendre où les visiteurs avancent ou décrochent.`,
    impactAlt: 'Impact',
    impactTitle: 'Impact',
    impactText: `Indicateurs définis pour suivre la suite :
- taux de conversion visite -> demande
- temps d'accès à l'information clé
- taux de clic sur les CTA principaux
- qualité des leads
- progression dans le parcours
- conformité éditoriale (SEO, RGAA)

Le but n'est pas seulement de produire des écrans. C'est de construire une première version mesurable, capable de relier les choix UX, l'acquisition et la performance commerciale.`,
  },
  en: {
    projectNotFound: 'Project not found',
    backToHome: '← Back to home',
    contextAlt: 'Context',
    contextTitle: 'Context',
    contextText: `My Business Academy is a French training organization certified Qualiopi. I worked on the framing phase before moving into interface design, with one clear goal: make a complex offer easier to understand and choose.

The challenge went beyond visual design. The experience had to help visitors understand the offer quickly, feel reassured, contact the right person more easily, and rely on a content structure that could last.

The work supports both the public website and an internal knowledge base, designed to organize company documentation and prepare some AI-related uses.`,
    discoveryTitle: 'Framing and exploratory research',
    discoveryText: `I started by clarifying the problem before thinking about screens. The first questions were simple: what does a visitor need to understand when they arrive? What could block them? What would make them trust the organization?

Research covered six direct competitors, looking at UX, SEO, and content: page structure, reassurance signals, offer clarity, access to funding information, and contact logic.

The main pattern was clear: the strongest journeys start from explicit user intent, while many competitors push users into a broad catalog too early. Funding information also appeared too late in most experiences, even though it is one of the first questions users have.`,
    needsAlt: 'User needs synthesis',
    needsTitle: 'User needs and personas',
    needsText: `I synthesized four main profiles: a career switcher, an employee looking to progress, an entrepreneur, and an employer or HR stakeholder.

They do not all expect the same thing, but they share one constraint: they need to quickly understand whether they are in the right place. They need readable information, proof of credibility, and a clear path to the next step.

That is why I ruled out the idea of showing the full catalog first. On paper, it creates a feeling of depth. In practice, it mainly adds cognitive load and slows down the decision.`,
    uxTitle: 'UX principles and prioritization',
    uxText: `The principles were intentionally simple: focus on what matters, build reassurance progressively, design mobile-first, keep the structure accessible, and make the content easy to maintain.

The main journey becomes: homepage -> categories -> training pages -> contact. Each page has a clear role: help users understand, compare, check that the offer is credible, then take action.

I chose to design page by page instead of working on the whole site in parallel. It was slower at first, but safer for keeping the experience consistent and making handoff easier later.`,
    archAlt: 'Information architecture',
    archTitle: 'Information architecture',
    archText: `The architecture follows a simple progression: home -> catalog -> categories -> training pages, with transversal pages for funding, organization, contact, and legal information.

Two journeys were used as references: the career switcher, who searches for a training program and then needs to understand funding, and the employer, who mostly needs proof of credibility before making a request.

Personalization stays lightweight: contextual form prefill, adapted calls to action, and wording closer to the user's situation. The idea is to remove small unnecessary decisions before contact.`,
    roadmapAlt: 'Roadmap and next steps',
    roadmapTitle: 'Roadmap and next steps',
    roadmapText: `The foundation is in place: framing, research, architecture, UX principles, and content governance.

Next steps: move into mockups, prepare front-end handoff, launch an instrumented first version, then improve the journey based on real signals.

The goal is to ship a clear first version without freezing the product too early. Each step prepares the next one: measuring friction, qualifying requests, and understanding where visitors move forward or drop off.`,
    impactAlt: 'Business impact',
    impactTitle: 'Business impact',
    impactText: `Indicators defined to follow the next steps:
- visitor-to-request conversion rate
- time to key information
- click rate on primary CTAs
- lead quality
- journey progression
- editorial compliance (SEO, accessibility)

The goal is not only to produce screens. It is to build a measurable first version that connects UX decisions, acquisition, and business performance.`,
  }
}

const pageContent = computed(() => PAGE_CONTENT[locale.value] ?? PAGE_CONTENT.fr)
const projectData = computed(() => getWorksByLocale(locale.value).find((work) => work.route === PROJECT_ROUTE) || null)

if (!projectData.value) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const contexteImage = computed(() => localizedPicture(contexteFrWebp, contexteFr, contexteEnWebp, contexteEn))
const contexteMobileImage = computed(() =>
  localizedPicture(contexteMobileFrWebp, contexteMobileFr, contexteMobileEnWebp, contexteMobileEn)
)

const cadrageImage = computed(() => localizedPicture(cadrageFrWebp, cadrageFr, cadrageEnWebp, cadrageEn))
const cadrageMobileImage = computed(() =>
  localizedPicture(cadrageMobileFrWebp, cadrageMobileFr, cadrageMobileEnWebp, cadrageMobileEn)
)

const needsImages = computed(() => [
  {
    src: localizedPicture(personasFrWebp, personasFr, personasEnWebp, personasEn),
    mobileSrc: localizedPicture(personasMobileFrWebp, personasMobileFr, personasMobileEnWebp, personasMobileEn),
    alt: pageContent.value.needsAlt
  },
  {
    src: localizedPicture(frictionsFrWebp, frictionsFr, frictionsEnWebp, frictionsEn),
    mobileSrc: localizedPicture(frictionsMobileFrWebp, frictionsMobileFr, frictionsMobileEnWebp, frictionsMobileEn),
    alt: pageContent.value.discoveryTitle
  }
])

const principlesImages = computed(() => [
  {
    src: localizedPicture(principesFrWebp, principesFr, principesEnWebp, principesEn),
    mobileSrc: localizedPicture(principesMobileFrWebp, principesMobileFr, principesMobileEnWebp, principesMobileEn),
    alt: pageContent.value.uxTitle
  },
  {
    src: localizedPicture(priorisationFrWebp, priorisationFr, priorisationEnWebp, priorisationEn),
    mobileSrc: localizedPicture(
      priorisationMobileFrWebp,
      priorisationMobileFr,
      priorisationMobileEnWebp,
      priorisationMobileEn
    ),
    alt: pageContent.value.uxTitle
  }
])

const roadmapImage = computed(() => localizedPicture(roadmapFrWebp, roadmapFr, roadmapEnWebp, roadmapEn))
const roadmapMobileImage = computed(() =>
  localizedPicture(roadmapMobileFrWebp, roadmapMobileFr, roadmapMobileEnWebp, roadmapMobileEn)
)

const arboImage = computed(() => localizedPicture(arboFrWebp, arboFr, arboEnWebp, arboEn))
const arboMobileImage = computed(() =>
  localizedPicture(arboMobileFrWebp, arboMobileFr, arboMobileEnWebp, arboMobileEn)
)

const impactImage = computed(() => localizedPicture(impactFrWebp, impactFr, impactEnWebp, impactEn))
const impactMobileImage = computed(() =>
  localizedPicture(impactMobileFrWebp, impactMobileFr, impactMobileEnWebp, impactMobileEn)
)


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
