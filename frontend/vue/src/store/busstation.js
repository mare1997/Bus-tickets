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
    },
    removeBusStation (state, id) {
      for (let i = 0; i < state.stations.length; i++) {
        if (state.stations[i].id === id) {
          state.stations.splice(i, 1)
        }
      }
    }
  },
  getters: {
    getBusStations (state) {
      return state.stations
    }
  },
  actions: {
    stations ({ commit }) {
      return axios.get('http://localhost:3001/busstation')
        .then((response) => {
          commit('setBusStations', response.data)
          return response.data
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
    },
    create ({ commit }, payload) {
      return axios.post('http://localhost:3001/busstation', {
        name: payload.name,
        worktime: payload.worktime,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        latitude: payload.latitude,
        longitude: payload.longitude,
        locationId: payload.locationId
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    update ({ commit }, payload) {
      return axios.put('http://localhost:3001/busstation', {
        id: payload.id,
        name: payload.name,
        worktime: payload.worktime,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        latitude: payload.latitude,
        longitude: payload.longitude,
        locationId: payload.locationId
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    delete ({ commit }, payload) {
      return axios.delete('http://localhost:3001/busstation/' + payload.id)
        .then((response) => {
          if (response.data === 'OK') {
            commit('removeBusStation', payload.id)
          }
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
