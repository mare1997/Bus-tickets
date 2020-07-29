import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CarriersPage from '@/components/CarriersPage'
import CarrierPage from '@/components/CarrierPage'
import BusStationsPage from '@/components/BusStationsPage'
import BusStation from '@/components/BusStation'
import Sign from '@/components/Sign'
import Checkout from '@/components/Checkout'
import SchedulePage from '@/components/SchedulePage'

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
      path: '/prevoznik',
      name: 'CarrierPage',
      component: CarrierPage
    },
    {
      path: '/stanice',
      name: 'BusStationsPage',
      component: BusStationsPage
    },
    {
      path: '/stanica',
      name: 'BusStations',
      component: BusStation
    },
    {
      path: '/placanje',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/red-voznje',
      name: 'SchedulePage',
      component: SchedulePage
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
