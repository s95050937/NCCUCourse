import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// views
import Date from '../views/date/Date.vue'
import Calendar from '../views/calendar/Calender.vue'
import Favorite from '../views/favorite/Favorite.vue'

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
  },
  {
    path: '/calender',
    // component: () => import('../views/calendar/Calender.vue')
    component: Calendar
  },
  {
    path: '/favorite',
    component: Favorite
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
