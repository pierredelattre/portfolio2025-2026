<template>
  <section class="project" :aria-label="projectLabel">
    <ProjectIntro v-if="hasProject" :title="projectData.title" :type="projectData.type" :intro="projectData.intro"
      :description="projectData.description" :services="projectData.services" :team="projectData.team"
      :links="projectData.links" />
    <section v-else class="project__error">
      <h2>Projet introuvable</h2>
      <RouterLink to="/" data-link>← Retour à l’accueil</RouterLink>
    </section>

    <ColumnTextLayout :image-src=contexte image-alt="Contexte & Enjeux" title="Contexte & Enjeux" text="Les apps d’apprentissage les plus populaires ont un problème que leurs métriques ne montrent pas : les utilisateurs les ouvrent tous les jours, mais n’apprennent pas vraiment. Duolingo s’est progressivement transformé en app de divertissement. Les streaks, les notifications, la pression sociale sont là pour la rétention, pas pour l’acquisition. C’est ce que les entretiens ont confirmé. On voulait partir d’une contrainte différente : est-ce qu’on peut concevoir une app où la progression est réellement visible, et où les situations d’entraînement ressemblent à quelque chose ?" />

    <GridScrollLayout :images="rechercheUX" title="Recherche utilisateur" text="Trois entretiens semi-directifs de 30 minutes, avec des utilisateurs actifs d’apps concurrentes.

Maxime, 25 ans, utilise Duolingo pour apprendre l’espagnol avant un voyage. Il bute sur la progression : impossible de sauter les notions déjà maîtrisées, et il confond régulièrement des mots similaires d’une langue à l’autre. L’app n’en tient pas compte.

Dorian, 27 ans, utilise MemRise dans un cadre pro. Ce qui l’a fait décrocher : les exercices sont trop simples pour son niveau, la répétition est mécanique, et il ne voit pas où il en est.

Noa ne peut pas cibler son apprentissage selon son domaine métier. Tout le vocabulaire est généraliste, peu importe ses besoins.

Les trois avaient la même situation de départ : ils voulaient apprendre. Le problème n’était pas la motivation. Aucune des apps ne leur donnait le sentiment de vraiment progresser." />

    <ImageFullWidthLayout :image-src=flows :image-mobile-src=flowsMobile secondary image-alt="Architecture & parcours"
      title="Architecture & parcours"
      text="L’expérience est structurée autour de cinq zones : Accueil, Apprendre, Quiz, Quêtes et Profil.
Nous avons conçu des parcours fluides pour le duel, les quizz thématiques et l’apprentissage guidé, en garantissant une navigation claire." />

    <GridScrollLayout :images=uiGridImages title="Conception UI"
      text="L’UI a été conçue pour simplifier la diversité des formats (cours, quiz, duels, quêtes) grâce à des patterns réutilisables : cartes de contenus, blocs de progression, modules de quiz et header cohérent.

La hiérarchie d’information a été pensée pour être immédiate : titres clairs, actions primaires visibles, actions secondaires accessibles sans distraire.

Les feedbacks (réponses, progression, score) jouent un rôle central pour soutenir la dimension gamifiée et garder l’utilisateur engagé.
L’ensemble vise, quant à elle, une interface prévisible et fluide, où chaque écran reprend les mêmes logiques pour réduire la charge cognitive." />

    <ColumnTextLayout :image-src=designsystem image-alt="Design system" title="Design system" text="Le projet couvre cinq sections (Accueil, Apprendre, Quiz, Quêtes, Profil) développées en parallèle par deux designers. Sans référentiel commun, les sections auraient divergé. Et n’importe quel développeur qui aurait récupéré le fichier Figma s’y serait perdu.

On a construit un design system complet : tokens, fondations, composants documentés par usage (Actions, Navigation, Formulaire, Contenu, Profil), templates et documentation publiée sur Zeroheight, synchronisée automatiquement depuis Figma." />

<ColumnTextLayout :image-src=tests image-alt="Tests utilisateurs" title="Tests utilisateurs" text="Tests réalisés avec 3 participants sur deux parcours distincts.

Les deux parcours ont été complétés à 100 %. La navigation était fluide, personne ne s’est perdu.

Les tests ont quand même révélé des problèmes précis. Sur le parcours quizz : confusion devant les &quot;réponses connues&quot; affichées dès le premier écran alors que l’utilisateur n’avait pas encore joué (&quot;Pourquoi il y’a déjà des réponses connues ?&quot;), impossibilité d’inviter plusieurs amis. Sur le parcours Apprendre : boutons non cliquables dans le prototype, absence de titre de page (&quot;À quoi sert le drapeau ?&quot;), pas de moyen de quitter puis reprendre un cours.

Ce qui a changé : clarification de l’écran initial du quizz, récapitulatif de fin de partie revu, états manquants ajoutés." />
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
import { works } from '@/data/content'
import { resolveOptimizedImageSrc } from '@/utils/image'

import projectBackground from '@/assets/talkie/banner.jpg?optimized'
import contexte from '@/assets/talkie/contexte.jpg?optimized'
import flows from '@/assets/talkie/flows.jpg?optimized'
import flowsMobile from '@/assets/talkie/mobile-flows.jpg?optimized'
import designsystem from '@/assets/talkie/designsystem.jpg?optimized'
import apprentissage from '@/assets/talkie/apprentissage.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import quiz from '@/assets/talkie/quiz.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import duels from '@/assets/talkie/duels.jpg?optimized&w=1920;2560;3200&quality=96&lossless=true'
import tests from '@/assets/talkie/tests.jpg?optimized'

import persona from '@/assets/talkie/per.jpg?optimized'
import entretiens from '@/assets/talkie/entr.jpg?optimized'
import entretiensMobile from '@/assets/talkie/mobile-entr.jpg?optimized'
import fonctions from '@/assets/talkie/fonctions.jpg?optimized'
import fonctionsMobile from '@/assets/talkie/mobile-fonctions.jpg?optimized'

const PROJECT_ROUTE = '/projet/talkie'
const projectData = works.find((work) => work.route === PROJECT_ROUTE) || null

if (!projectData) {
  console.error(`Project data not found for route "${PROJECT_ROUTE}"`)
}

const uiGridImages = [
  { src: apprentissage, alt: "Cours" },
  { src: quiz, alt: "Quizs en solo" },
  { src: duels, alt: "Duels entre joueurs" }
]

const rechercheUX = [
  { src: persona, alt: "Persona" },
  { src: entretiens, mobileSrc: entretiensMobile, alt: "Entretiens" },
  { src: fonctions, mobileSrc: fonctionsMobile, alt: "Fonctionnalités" }
]

const hasProject = computed(() => Boolean(projectData))
const projectLabel = computed(() =>
  hasProject.value ? `Projet ${projectData.title}` : 'Projet introuvable'
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
