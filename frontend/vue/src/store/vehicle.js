const axios = require('axios')

export default {
  namespaced: true,
  actions: {
    vehicle ({ commit }, payload) {
      return axios.get('http://localhost:3001/vehicle/carrier/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
