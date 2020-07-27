import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CarriersPage from '@/components/CarriersPage'
import BusStationsPage from '@/components/BusStationsPage'
import Sign from '@/components/Sign'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/prevoznici',
      name: 'CarriersPage',
      component: CarriersPage
    },
    {
      path: '/stanice',
      name: 'BusStationsPage',
      component: BusStationsPage
    },
    {
      path: '/login',
      name: 'Sign',
      component: Sign,
      props: (route) => ({ path: route.path })
    },
    {
      path: '/register',
      name: 'Sign',
      component: Sign,
      props: (route) => ({ path: route.path })
    }
  ]
})
