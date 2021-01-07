const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    locations: []
  }),
  mutations: {
    addLocations (state, locations) {
      state.locations = locations
      localStorage.setItem('locations', JSON.stringify(locations))
    },
    removeLocation (state, id) {
      for (let i = 0; i < state.locations.length; i++) {
        if (state.locations[i].id === id) {
          state.locations.splice(i, 1)
        }
      }
    }
  },
  getters: {
    getLocations (state) {
      return state.locations
    }
  },
  actions: {
    locations ({ commit }) {
      return axios.get('http://localhost:3001/location')
        .then((response) => {
          commit('addLocations', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    location ({ commit }, payload) {
      return axios.get('http://localhost:3001/location/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ rootState }, payload) {
      return axios.post('http://localhost:3001/location', {
        name: payload.name,
        zip_code: payload.zip_code
      }, { headers: { auth: rootState.user.token } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    update ({ rootState }, payload) {
      return axios.put('http://localhost:3001/location', {
        id: payload.id,
        name: payload.name,
        zip_code: payload.zip_code
      }, { headers: { auth: rootState.user.token } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    delete ({ commit, rootState }, payload) {
      return axios.delete('http://localhost:3001/location/' + payload.id, { headers: { auth: rootState.user.token } })
        .then((response) => {
          if (response.data === 'OK') {
            commit('removeLocation', payload.id)
          }
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
