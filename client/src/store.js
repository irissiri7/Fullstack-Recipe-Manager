import { createStore } from 'vuex'
import dotenv from 'dotenv'
import axios from 'axios'
import router from '../src/router.js'
import services from '../src/util/services.js'

dotenv.config()

//Global timer responsible for refreshing token alt. auto sign out functionality
let timer

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
          refreshToken: response.data.refreshToken,
          email: response.data.email
        }

        const expiresIn = +response.data.expiresIn * 1000

        const tokenExpirationDate = new Date().getTime() + expiresIn

        services.setUserInLocalStorage({
          ...user,
          tokenExpirationDate: tokenExpirationDate
        })

        timer = setTimeout(() => {
          context.dispatch('refreshToken')
        }, expiresIn)

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
    async changeEmail(context, payload) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/change-email`,
          {
            email: payload.email
          },
          {
            headers: {
              Authorization: `Basic ${context.getters.token}`
            }
          }
        )

        context.commit('setUser', {
          firebaseId: response.data.localId,
          token: response.data.idToken,
          email: response.data.email
        })
        return
      } catch (error) {
        throw new Error('Could not change email')
      }
    },
    async changePassword(context, payload) {
      try {
        console.log(payload.password)
        const response = await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/change-password`,
          {
            password: payload.password
          },
          {
            headers: {
              Authorization: `Basic ${context.getters.token}`
            }
          }
        )

        context.commit('setUser', {
          firebaseId: response.data.localId,
          token: response.data.idToken,
          email: response.data.email
        })
        return
      } catch (error) {
        throw new Error('Could not change password')
      }
    },
    autoSignIn(context, _payload) {
      const user = services.getUserFromLocalStorage()

      if (user) {
        //Number of milliseconds until token expires
        const expiresIn = +user.tokenExpirationDate - new Date().getTime()
        //If there is less than 1 min left on token validity, don't even bother logging in
        if (expiresIn < 60000) return

        //Set up auto log out
        timer = setTimeout(() => {
          context.dispatch('refreshToken')
        }, expiresIn)

        context.commit('setUser', {
          firebaseId: user.firebaseId,
          token: user.token,
          refreshToken: user.refreshToken,
          email: user.email
        })
      }
    },
    signOut(context, _payload) {
      services.removeUserFromLocalStorage()

      clearTimeout(timer)

      context.commit('setUser', {
        firebaseId: null,
        token: null,
        refreshToken: null,
        email: null
      })

      router.push('/')
    },
    async refreshToken(context, _payload) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/refresh-token`,
          {
            refreshToken: context.getters.refreshToken
          }
        )
        const expiresIn = +response.data.expiresIn * 1000

        const tokenExpirationDate = new Date().getTime() + expiresIn
        localStorage.setItem('tokenExpirationDate', tokenExpirationDate)
        clearInterval(timer)
        timer = setInterval(() => {
          context.dispatch('refreshToken')
        }, expiresIn)
        context.commit('updateTokens', {
          token: response.data.token,
          refreshToken: response.data.refreshToken
        })
      } catch (error) {
        console.log(error)
        context.dispatch('signOut')
      }
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
