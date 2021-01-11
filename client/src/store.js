import { createStore } from 'vuex'
import dotenv from 'dotenv'
import axios from 'axios'
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
    async authenticate(context, payload) {
      //Mode will be either 'signIn' or 'signUp'
      const mode = payload.mode
      //Default url is for 'signIn'
      let url = `${process.env.VUE_APP_MY_URL}users/user/sign-in`
      //Changing url if mode is 'signUp'
      if (mode == 'signUp')
        url = `${process.env.VUE_APP_MY_URL}users/user/sign-up`

      try {
        const response = await axios.post(url, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })

        const user = {
          firebaseId: response.data.localId,
          token: response.data.idToken,
          // token: '89wuoeisjdkm',

          refreshToken: response.data.refreshToken,
          email: response.data.email
        }

        services.setUserInLocalStorage(user)
        context.commit('setUser', user)
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error('Authentication failed')
        }
      }
    },
    async signIn(context, payload) {
      return context.dispatch('authenticate', { ...payload, mode: 'signIn' })
    },
    async signUp(context, payload) {
      return context.dispatch('authenticate', { ...payload, mode: 'signUp' })
    },
    //Refactor to use client
    async updateUser(context, payload) {
      console.log('updateUser')
      console.log(payload)
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
