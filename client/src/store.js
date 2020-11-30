import { createStore } from 'vuex'
import router from './router.js'
import apiKey from './assets/api-key'

const store = createStore({
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      state.userId = payload.userId
      state.tokenExpiration = payload.tokenExpiration
      router.push('/home')
    }
  },
  actions: {
    logIn(context, payload) {
      return new Promise((resolve, reject) => {
        fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true
            })
          }
        )
          .then(response => {
            if (response.ok) return response.json()
            else {
              const error = new Error('Failed to authenticate')
              throw error
            }
          })
          .then(responseData => {
            context.commit('setUser', {
              token: responseData.idToken,
              userId: responseData.localId,
              tokenExpiration: responseData.tokenExpiration
            })
            resolve('success')
          })
          .catch(error => reject(error))
      })
    }
  },
  getters: {
    isAuth(state) {
      return !!state.token
    }
  }
})

export default store
