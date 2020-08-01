const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    stations: []
  }),
  mutations: {
    setBusStations (state, stations) {
      state.stations = stations
      localStorage.setItem('stations', JSON.stringify(stations))
    }
  },
  getters: {
    getBusStations (state) {
      return state.stations
    }
  },
  actions: {
    stations ({ commit }) {
      axios.get('http://localhost:3001/busstation')
        .then((response) => {
          commit('setBusStations', response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    station ({ commit }, payload) {
      return axios.get('http://localhost:3001/busstation/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    search ({ commit }, payload) {
      return axios.post('http://localhost:3001/busstation/search', {
        value: payload.value
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
