const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    schedules: [],
    resultSearch: []
  }),
  mutations: {
    setSchedules (state, schedules) {
      state.schedules = schedules
      localStorage.setItem('schedules', JSON.stringify(schedules))
    },
    setResultSearch (state, resultSearch) {
      state.resultSearch = resultSearch
      localStorage.setItem('resultSearch', JSON.stringify(resultSearch))
    }
  },
  getters: {
    getSchedules (state) {
      return state.schedules
    },
    getResultSearch (state) {
      return state.resultSearch
    }
  },
  actions: {
    schedulesByCarrierId ({ commit }, payload) {
      return axios.get('http://localhost:3001/traveling/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    schedule ({ commit }, payload) {
      return axios.get('http://localhost:3001/traveling/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    schedules ({ commit }) {
      return axios.get('http://localhost:3001/traveling')
        .then((response) => {
          commit('setSchedules', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    search ({ commit }, payload) {
      return axios.post('http://localhost:3001/traveling/search', {
        date: payload.date,
        start: payload.start,
        finish: payload.finish
      })
        .then((response) => {
          commit('setResultSearch', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ rootState }, payload) {
      return axios.post('http://localhost:3001/traveling', {
        vehicleId: payload.vehicleId,
        price: payload.price,
        date: payload.date,
        stations: payload.stations
      }, { headers: { auth: rootState.user.token } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
