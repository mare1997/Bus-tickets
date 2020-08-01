const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    resultSearch: []
  }),
  mutations: {
    setResultSearch (state, resultSearch) {
      state.resultSearch = resultSearch
      localStorage.setItem('resultSearch', JSON.stringify(resultSearch))
    }
  },
  getters: {
    getResultSearch (state) {
      return state.resultSearch
    }
  },
  actions: {
    search ({ commit }, payload) {
      return axios.post('http://localhost:3001/traveling/search', {
        date: payload.date,
        start: payload.start,
        finish: payload.finish
      })
        .then((response) => {
          commit('setResultSearch', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
