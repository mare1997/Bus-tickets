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
      return axios.get('http://localhost:3001/carrier')
        .then((response) => {
          commit('setCarriers', response.data)
          return response.data
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
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ commit }, payload) {
      return axios.post('http://localhost:3001/carrier', {
        name: payload.name,
        pib: payload.pib,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        site: payload.site,
        image: payload.image,
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
      return axios.put('http://localhost:3001/carrier', {
        id: payload.id,
        name: payload.name,
        pib: payload.pib,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        site: payload.site,
        image: payload.image,
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
      return axios.delete('http://localhost:3001/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
