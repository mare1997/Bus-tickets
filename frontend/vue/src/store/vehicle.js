const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    vehicles: []
  }),
  mutations: {
    addVehicles (state, vehicles) {
      state.vehicles = vehicles
      localStorage.setItem('vehicles', JSON.stringify(vehicles))
    },
    removeVehicle (state, id) {
      for (let i = 0; i < state.vehicles.length; i++) {
        if (state.vehicles[i].id === id) {
          state.vehicles.splice(i, 1)
        }
      }
    }
  },
  getters: {
    getVehicles (state) {
      return state.vehicles
    }
  },
  actions: {
    vehicle ({ commit }, payload) {
      return axios.get('http://localhost:3001/vehicle/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    vehicles ({ commit }) {
      return axios.get('http://localhost:3001/vehicle')
        .then((response) => {
          commit('addVehicles', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ commit }, payload) {
      return axios.post('http://localhost:3001/vehicle', {
        registration_number: payload.registration_number,
        driver: payload.driver,
        carrierId: payload.carrierId,
        numberSeats: payload.numberSeats
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    update ({ commit }, payload) {
      return axios.put('http://localhost:3001/vehicle', {
        id: payload.id,
        registration_number: payload.registration_number,
        driver: payload.driver,
        carrierId: payload.carrierId
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    delete ({ commit }, payload) {
      return axios.delete('http://localhost:3001/vehicle/' + payload.id)
        .then((response) => {
          if (response.data === 'OK') {
            commit('removeVehicle', payload.id)
          }
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
