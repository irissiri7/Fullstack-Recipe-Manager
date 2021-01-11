import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  get formHeader() {
    return {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${store.getters.token}`
    }
  }
  get authHeader() {
    return {
      Authorization: `Basic ${store.getters.token}`
    }
  }
  getHeader(method) {
    if (method === 'POST' || method === 'PUT') {
      return this.formHeader
    } else if (method === 'DELETE') {
      return this.authHeader
    } else {
      return null
    }
  }
  async makeCall(method, endpoint, data) {
    let axiosCall = {
      method: method,
      url: `${this.baseUrl}${endpoint}`
    }
    if (data) {
      axiosCall.data = data
    }
    const header = this.getHeader(method)
    if (header) {
      axiosCall.headers = header
    }
    await axios(axiosCall)
  }
  //This method makes sure we always try the request again if the FIRST response was unauth/401,
  // the method then tries to refresh the tokens and send the request again
  async attemptRequest(method, endpoint, data) {
    const unauthorized = 401
    try {
      console.log('first attempt')
      await this.makeCall(method, endpoint, data)
    } catch (error) {
      if (error.response && error.response.status === unauthorized) {
        const tokensRefreshed = await this.refreshTokens()
        if (tokensRefreshed) {
          console.log('second attempt')

          await this.makeCall(method, endpoint, data)
        }
      } else {
        throw error
      }
    }
  }

  async addRecipe(recipeData) {
    await this.attemptRequest('POST', 'recipes/recipe/add-recipe', recipeData)
  }
  async updateRecipe(recipeData) {
    await this.attemptRequest('PUT', 'recipes/recipe/update-recipe', recipeData)
  }
  async deleteRecipe(recipeId) {
    await this.attemptRequest(
      'DELETE',
      `recipes/recipe/delete-recipe/${recipeId}`
    )
  }
  async refreshTokens() {
    console.log('refreshing tokens')
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_MY_URL}users/user/refresh-token`,
        {
          refreshToken: store.getters.refreshToken
        }
      )

      store.dispatch('updateTokens', {
        token: response.data.token,
        refreshToken: response.data.refreshToken
      })
      return true
    } catch (error) {
      console.log(error)
      store.dispatch('signOut', { route: '/auto-signed-out' })
    }
  }
}

const client = new Client(`${process.env.VUE_APP_MY_URL}`)

export default client
