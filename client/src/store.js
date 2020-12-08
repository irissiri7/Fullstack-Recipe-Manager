import { createStore } from 'vuex'
import router from './router.js'
import dotenv from 'dotenv'

dotenv.config()

const store = createStore({
  state() {
    return {
      firebaseId: null,
      token: null,
      tokenExpiration: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.firebaseId = payload.firebaseId
      state.token = payload.token
      state.tokenExpiration = payload.tokenExpiration
      router.push('/home')
    }
  },
  actions: {
    signIn(context, payload) {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.VUE_APP_MY_URL}users/user/sign-in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        })
          .then(response => {
            if (response.ok) return response.json()
            else {
              const error = new Error('Failed to authenticate')
              throw error
            }
          })
          .then(responseData => {
            context.commit('setUser', {
              firebaseId: responseData.localId,
              token: responseData.idToken,
              tokenExpiration: responseData.tokenExpiration
            })
            resolve('success')
          })
          .catch(error => reject(error))
      })
    },
    signUp(context, payload) {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.VUE_APP_MY_URL}users/user/sign-up`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        })
          .then(response => {
            if (response.ok) return response.json()
            else {
              const error = new Error('Failed to sign up')
              throw error
            }
          })
          .then(responseData => {
            context.commit('setUser', {
              firebaseId: responseData.localId,
              token: responseData.idToken,
              tokenExpiration: responseData.tokenExpiration
            })
            resolve('success')
          })
          .catch(error => reject(error))
      })
    },
    signOut(context, _payload) {
      context.commit('setUser', {
        firebaseId: null,
        token: null,
        tokenExpiration: null
      })
    }
  },
  getters: {
    isAuth(state) {
      return !!state.token
    },
    user(state) {
      return state.firebaseId
    }
  }
})

export default store
