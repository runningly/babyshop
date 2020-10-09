import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('../views/classify.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../components/Detail/Detail.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine.vue')
  },
  {
    path: '/login',
    component: () => import('../components/mine/Login.vue')
  },
  {
    path: '/userinfo',
    component: () => import('../components/mine/userInfo.vue')
  },
  {
    path: '/address',
    component: () => import('../components/mine/Address.vue')
  },
  {
    path: '/addaddress/:mode',
    component: () => import('../components/mine/Addaddress.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
