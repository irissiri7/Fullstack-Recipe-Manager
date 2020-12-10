import { createStore } from 'vuex'
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
          throw new Error('Could not sign in')
        }
      }
    },
    async signUp(context, payload) {
      try {
        await axios.post(`${process.env.VUE_APP_MY_URL}users/user/sign-up`, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
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
