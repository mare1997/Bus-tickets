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
    },
    removeCarrier (state, id) {
      for (let i = 0; i < state.carriers.length; i++) {
        if (state.carriers[i].id === id) {
          state.carriers.splice(i, 1)
        }
      }
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
    create ({ rootState }, payload) {
      return axios.post('http://localhost:3001/carrier', {
        name: payload.name,
        pib: payload.pib,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        site: payload.site,
        locationId: payload.locationId
      }, { headers: { auth: rootState.user.token } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    update ({ rootState }, payload) {
      return axios.put('http://localhost:3001/carrier', {
        id: payload.id,
        name: payload.name,
        pib: payload.pib,
        street: payload.street,
        phone: payload.phone,
        email: payload.email,
        site: payload.site,
        locationId: payload.locationId
      }, { headers: { auth: rootState.user.token } })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    delete ({ commit, rootState }, payload) {
      return axios.delete('http://localhost:3001/carrier/' + payload.id, { headers: { auth: rootState.user.token } })
        .then((response) => {
          if (response.data === 'OK') {
            commit('removeCarrier', payload.id)
          }
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
