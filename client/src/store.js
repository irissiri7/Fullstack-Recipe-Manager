import { createStore } from 'vuex'
import dotenv from 'dotenv'
import router from '../src/router.js'
import services from '../src/util/services.js'

dotenv.config()

const store = createStore({
  state() {
    return {
      firebaseId: null,
      token: null,
      refreshToken: null,
      email: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.firebaseId = payload.firebaseId
      state.token = payload.token
      state.refreshToken = payload.refreshToken
      state.email = payload.email
    },
    updateTokens(state, payload) {
      state.token = payload.token
      state.refreshToken = payload.refreshToken
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit('setUser', {
        firebaseId: payload.firebaseId,
        token: payload.token,
        refreshToken: payload.refreshToken,
        email: payload.email
      })
    },
    autoSignIn(context, _payload) {
      const user = services.getUserFromLocalStorage()

      if (user) {
        context.commit('setUser', {
          firebaseId: user.firebaseId,
          token: user.token,
          refreshToken: user.refreshToken,
          email: user.email
        })
      }
    },
    signOut(context, payload) {
      services.removeUserFromLocalStorage()
      context.commit('setUser', {
        firebaseId: null,
        token: null,
        refreshToken: null,
        email: null
      })

      router.push(payload.route)
    },
    updateTokens(context, payload) {
      localStorage.setItem('token', payload.token)
      localStorage.setItem('refreshToken', payload.refreshToken)
      context.commit('updateTokens', {
        token: payload.token,
        refreshToken: payload.refreshToken
      })
    }
  },
  getters: {
    isAuth(state) {
      return !!state.token
    },
    firebaseId(state) {
      return state.firebaseId
    },
    token(state) {
      return state.token
    },
    refreshToken(state) {
      return state.refreshToken
    },
    email(state) {
      return state.email
    }
  }
})

export default store
