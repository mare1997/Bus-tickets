import router from '../router'

const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    user: null,
    isLoggedIn: false,
    token: null

  }),
  mutations: {
    addToken (state, token) {
      state.token = token
      localStorage.setItem('token', JSON.stringify(token))
    },
    isLoggedIn (state, value) {
      state.isLoggedIn = value
      localStorage.setItem('isLoggedIn', value)
    },
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    getToken (state) {
      return state.token
    }
  },
  actions: {
    login ({commit, dispatch}, payload) {
      axios.post('http://localhost:3001/auth/login', {
        userName: payload.userName,
        password: payload.password
      })
        .then((response) => {
          commit('addToken', response.data.token)
          commit('setUser', response.data.user)
          commit('isLoggedIn', true)
          dispatch('carrier/carriers', {}, { root: true })
          dispatch('busstation/stations', {}, { root: true })
          router.push({name: 'Home'})
        })
        .catch((error) => {
          console.error(error)
        })
    },
    register ({ dispatch }, payload) {
      axios.post('http://localhost:3001/register', {
        userName: payload.userName,
        password: payload.password,
        firstName: payload.firstname,
        lastName: payload.lastname,
        age: payload.age,
        role: 'USER',
        locationId: 1 // hardcoded
      })
        .then(() => {
          dispatch('login', { userName: payload.userName, password: payload.password })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    logout ({ commit }) {
      commit('addToken', '')
      commit('isLoggedIn', false)
      commit('setUser', {})
      commit('carrier/setCarriers', [], {root: true})
      commit('busstation/setBusStation', [], {root: true})
      router.push({ name: 'Home' })
    }
  }
}
