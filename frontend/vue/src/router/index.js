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
import AdminPage from '@/components/AdminPage'

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
      path: '/carriers',
      name: 'CarriersPage',
      component: CarriersPage,
      props: (route) => ({
        ...route.params
      })
    },
    {
      path: '/prevoznik/:id',
      name: 'CarrierPage',
      component: CarrierPage,
      props: (route) => ({
        ...route.params
      })
    },
    {
      path: '/stations',
      name: 'BusStationsPage',
      component: BusStationsPage
    },
    {
      path: '/stanica/:id',
      name: 'BusStation',
      component: BusStation,
      props: (route) => ({
        ...route.params
      })
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
      component: Sign
    },
    {
      path: '/register',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/admin-page',
      name: 'AdminPage',
      component: AdminPage
    }
  ]
})
