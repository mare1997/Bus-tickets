const axios = require('axios')

export default {
  namespaced: true,
  actions: {
    getTickets ({ commit }, payload) {
      return axios.get('http://localhost:3001/ticket/traveling/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
