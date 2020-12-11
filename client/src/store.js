import { createStore } from 'vuex'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const store = createStore({
  state() {
    return {
      firebaseId: null,
      token: null,
      tokenExpiration: null,
      email: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.firebaseId = payload.firebaseId
      state.token = payload.token
      state.tokenExpiration = payload.tokenExpiration
      state.email = payload.email
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
          tokenExpiration: response.data.tokenExpiration,
          email: response.data.email
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
          tokenExpiration: response.data.expiresIn,
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
          tokenExpiration: response.data.expiresIn,
          email: response.data.email
        })
        return
      } catch (error) {
        throw new Error('Could not change password')
      }
    },

    signOut(context, _payload) {
      context.commit('setUser', {
        firebaseId: null,
        token: null,
        tokenExpiration: null,
        email: null
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
    email(state) {
      return state.email
    }
  }
})

export default store
