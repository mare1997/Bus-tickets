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
    }
  }
}
