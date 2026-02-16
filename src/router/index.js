/**
 * ROUTER — index.js
 * src/router/index.js
 *
 * Defines client-side routes using Vue Router 4.
 * Lazy-loads view components for better performance.
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home — Academe' },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/StudentsView.vue'),
    meta: { title: 'Students — Academe' },
  },
  {
    // Catch-all — redirect unknown routes to home
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

// Update document title on each navigation
router.afterEach((to) => {
  document.title = to.meta?.title ?? 'Academe'
})

export default router