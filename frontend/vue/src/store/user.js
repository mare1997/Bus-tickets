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
      localStorage.setItem('token', token)
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
    },
    removeUsers (state, id) {
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === id) {
          state.users.splice(i, 1)
        }
      }
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
    },
    isAdmin (state) {
      return state.user ? state.user.role === 'ADMIN' : false
    },
    isCarrier (state) {
      return state.user ? state.user.role === 'CARRIER' : false
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
          alert(error)
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
        locationId: payload.locationId
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
          auth: state.token
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
    user ({ commit }, payload) {
      return axios.get('http://localhost:3001/user/' + payload.id)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    create ({ dispatch }, payload) {
      return axios.post('http://localhost:3001/register', {
        userName: payload.userName,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        age: payload.age,
        role: payload.role,
        locationId: payload.locationId,
        carrierId: payload.carrierId || null
      })
        .then((response) => {
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
        password: payload.password,
        lastName: payload.lastName,
        age: payload.age,
        role: payload.role,
        locationId: payload.locationId
      }, {
        headers: {
          auth: state.token
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
          auth: state.token
        }
      })
        .then((response) => {
          if (response.data === 'OK') {
            commit('removeUsers', payload.id)
          }
          return response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
