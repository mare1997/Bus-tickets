import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import carrier from './carrier.js'
import busstation from './busstation.js'
import schedule from './schedule.js'
import location from './location.js'
import vehicle from './vehicle.js'
import comment from './comment.js'
import review from './review.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  namespaced: true,
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('token')) {
        state.user.token = localStorage.getItem('token')
      }
      if (localStorage.getItem('isLoggedIn')) {
        state.user.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      }
      if (localStorage.getItem('user')) {
        state.user.user = JSON.parse(localStorage.getItem('user'))
      }
      if (localStorage.getItem('carriers')) {
        state.carrier.carriers = JSON.parse(localStorage.getItem('carriers'))
      }
      if (localStorage.getItem('stations')) {
        state.busstation.stations = JSON.parse(localStorage.getItem('stations'))
      }
      if (localStorage.getItem('resultSearch')) {
        state.schedule.resultSearch = JSON.parse(localStorage.getItem('resultSearch'))
      }
      if (localStorage.getItem('locations')) {
        state.location.locations = JSON.parse(localStorage.getItem('locations'))
      }
      if (localStorage.getItem('vehicles')) {
        state.vehicle.vehicles = JSON.parse(localStorage.getItem('vehicles'))
      }
    }
  },
  modules: {
    user,
    carrier,
    busstation,
    schedule,
    location,
    vehicle,
    comment,
    review
  }
})
