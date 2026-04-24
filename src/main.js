import { createApp } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import router from './router'
import { initPageAnimations } from './animations/pageAnimations'
import { initializeLocale } from '@/i18n'

import './styles/main.css'

gsap.registerPlugin(ScrollTrigger)

initPageAnimations()
initializeLocale()

createApp(App).use(router).mount('#app')
