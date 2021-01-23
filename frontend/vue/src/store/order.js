const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    order: []
  }),
  mutations: {
    setOrder (state, order) {
      state.order = order
      localStorage.setItem('order', JSON.stringify(order))
    }
  },
  getters: {
    getOrder (state) {
      return state.order
    }
  },
  actions: {
    create ({ commit }, payload) {
      return axios.post('http://localhost:3001/order', {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        travelingId: payload.travelingId,
        userId: payload.userId,
        qty: payload.qty,
        additionalData: payload.additionalData
      })
        .then((response) => {
          commit('setOrder', response.data)
          return response.data
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
