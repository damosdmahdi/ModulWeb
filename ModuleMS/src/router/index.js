import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Ganti nama import dari SemesterView menjadi MatkulView
import MatkulView from '../views/MatkulView.vue'
import FileViewer from '../views/FileViewer.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { layout: 'default' },
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: MatkulView,
    meta: { layout: 'default' },
  },
  {
    path: '/view-file',
    name: 'FileViewer',
    component: FileViewer,
    meta: { layout: 'viewer' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
