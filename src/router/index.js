import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// date 
import Date from '../views/date/Date.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/date/:time',
    component: Date
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
