const axios = require('axios')

export default {
  namespaced: true,
  actions: {
    search ({ commit }, payload) {
      return axios.get('http://localhost:3001/comment/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ commit }, payload) {
      return axios.post('http://localhost:3001/comment', {
        date: payload.date,
        fullname: payload.fullname,
        title: payload.title,
        description: payload.description,
        carrierId: payload.carrierId,
        userId: payload.userId
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
