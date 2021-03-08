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
      return axios.post('http://localhost:3001/review', {
        rollingStock: payload.rollingStock,
        staff: payload.staff,
        accuracy: payload.accuracy,
        hygiene: payload.hygiene,
        carrierId: payload.carrierId,
        userId: payload.userId
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          alert('You must be logged in.')
          console.error(error)
        })
    }
  }
}
