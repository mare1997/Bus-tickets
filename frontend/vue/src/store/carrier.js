const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    carriers: []
  }),
  mutations: {
    setCarriers (state, carriers) {
      state.carriers = carriers
      localStorage.setItem('carriers', JSON.stringify(carriers))
    }
  },
  getters: {
    getCarriers (state) {
      return state.carriers
    }
  },
  actions: {
    carriers ({ commit }) {
      axios.get('http://localhost:3001/carrier')
        .then((response) => {
          commit('setCarriers', response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    carrier ({ commit }, payload) {
      return axios.get('http://localhost:3001/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    search ({ commit }, payload) {
      return axios.post('http://localhost:3001/carrier/search', {
        value: payload.value
      })
        .then((response) => {
          return response.data
          // router.push({ name: 'CarriersPage', params: { carriers: response.data } }).catch(() => {})
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
