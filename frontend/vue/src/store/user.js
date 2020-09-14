import router from '../router'

const axios = require('axios')

export default {
  namespaced: true,
  state: () => ({
    user: null,
    users: [],
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
    },
    setUsers (state, users) {
      state.users = users
      localStorage.setItem('users', JSON.stringify(users))
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getUsers (state) {
      return state.users
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
          dispatch('location/locations', {}, { root: true })
          router.push({name: 'Home'}).catch(() => {})
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
      commit('location/addLocations', [], { root: true })
      commit('schedule/setResultSearch', [], { root: true })
      router.push({ name: 'Home' })
    },
    users ({ commit, state }, payload) {
      return axios.get('http://localhost:3001/user', {
        headers: {
          auth: state.token.slice(1, -1)
        }
      })
        .then((response) => {
          commit('setUsers', response.data)
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    update ({ commit, state }, payload) {
      return axios.put('http://localhost:3001/user', {
        id: payload.id,
        userName: payload.userName,
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        role: payload.role,
        locationId: payload.locationId
      }, {
        headers: {
          auth: state.token.slice(1, -1)
        }
      })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    delete ({ commit, state }, payload) {
      return axios.delete('http://localhost:3001/user/' + payload.id, {
        headers: {
          auth: state.token.slice(1, -1)
        }
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
