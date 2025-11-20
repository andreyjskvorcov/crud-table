import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Главная' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { title: 'О проекте' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404View.vue'),
    meta: { title: 'Страница не найдена' },
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// SEO: динамический title из meta
router.afterEach((to) => {
  const baseTitle = 'CRUD Table'
  const pageTitle = (to.meta && (to.meta as any).title)
    ? `${(to.meta as any).title} — ${baseTitle}`
    : baseTitle
  if (typeof document !== 'undefined') {
    document.title = pageTitle
  }
})

export default router
