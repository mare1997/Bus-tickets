const axios = require('axios')

export default {
  namespaced: true,
  actions: {
    search ({ commit }, payload) {
      return axios.get('http://localhost:3001/review/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ commit }, payload) {
      debugger
      return axios.post('http://localhost:3001/review', {
        rollingStock: payload.rollingStock,
        staff: payload.staff,
        accuracy: payload.accuracy,
        hygiene: payload.hygiene,
        carrierId: payload.carrierId,
        userId: payload.userId
      })
        .then((response) => {
          debugger
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
