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
  },
  {
     path: '/conversation/:id',
     name: "conversation",
     component: () => import('../views/conversation.vue')
  },
  {
     path: '/forum/:id/conversation/create',
     name: "conversation_create",
     component: () => import('../views/create_conversation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router