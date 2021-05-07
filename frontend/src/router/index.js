import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
 {
  path: '/',
  name: 'wall',
  component: () => import('../views/wall.vue')
},
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router