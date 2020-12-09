import { createStore } from 'vuex'
import router from './router.js'
import dotenv from 'dotenv'
import axios from 'axios'

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
    async signIn(context, payload) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/sign-in`,
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          }
        )
        context.commit('setUser', {
          firebaseId: response.data.localId,
          token: response.data.idToken,
          tokenExpiration: response.data.tokenExpiration
        })
        return
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error('Could not log in')
        }
      }
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
    },
    token(state) {
      return state.token
    }
  }
})

export default store
