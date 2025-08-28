import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SemesterDetailView from '../views/SemesterDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/semester/:id',
    name: 'SemesterDetail',
    component: SemesterDetailView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
