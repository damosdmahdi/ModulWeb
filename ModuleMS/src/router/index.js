import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SemesterView from '../views/SemesterView.vue'
import FileViewer from '../views/FileViewer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/semester/:id',
    name: 'SemesterDetail',
    component: SemesterView,
  },
  {
    path: '/view-file',
    name: 'FileViewer',
    component: FileViewer,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
