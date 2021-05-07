import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
 {
  path: '/',
  name: 'Wall',
  component: () => import('../views/wall.vue')
},
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router