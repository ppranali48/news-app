import { createRouter, createWebHashHistory } from 'vue-router'
import NewsResult from '../components/NewsResult.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: NewsResult
  },
  {
    path: '/detail',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/NewsDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
