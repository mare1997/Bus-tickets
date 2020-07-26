import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CarrierPage from '@/components/CarrierPage'
import BusStationsPage from '@/components/BusStationsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/prevoznici',
      name: 'CarrierPage',
      component: CarrierPage
    },
    {
      path: '/stanice',
      name: 'BusStationsPage',
      component: BusStationsPage
    }
  ]
})
