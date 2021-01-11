import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  //PUBLIC METHODS
  async addRecipe(recipeData) {
    await this.attemptRequest({
      method: 'POST',
      url: `${this.baseUrl}recipes/recipe/add-recipe`,
      data: recipeData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }
  async updateRecipe(recipeData) {
    await this.attemptRequest({
      method: 'PUT',
      url: `${this.baseUrl}recipes/recipe/update-recipe`,
      data: recipeData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }
  async deleteRecipe(recipeId) {
    await this.attemptRequest({
      method: 'DELETE',
      url: `${this.baseUrl}recipes/recipe/delete-recipe/${recipeId}`,
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }
  async changeEmail(newEmail) {
    const response = await this.attemptRequest({
      method: 'POST',
      url: `${this.baseUrl}users/user/change-email`,
      data: { email: newEmail },
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return response
  }
  async changePassword(newPassword) {
    const response = await this.attemptRequest({
      method: 'POST',
      url: `${this.baseUrl}users/user/change-password`,
      data: { password: newPassword },
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return response
  }

  //PRIVATE METHODS
  async attemptRequest(callObject) {
    const unauthorized = 401
    let response = null
    try {
      console.log('first attempt')
      response = await axios(callObject)
      return response.data
    } catch (error) {
      if (error.response && error.response.status === unauthorized) {
        const refreshedToken = await this.refreshTokens()
        if (refreshedToken) {
          console.log('second attempt')
          callObject.headers.Authorization = `Basic ${refreshedToken}`
          response = await axios(callObject)
          return response.data
        }
      } else {
        throw error
      }
    }
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
      return response.data.token
    } catch (error) {
      console.log(error)
      store.dispatch('signOut', { route: '/auto-signed-out' })
    }
  }
}

const client = new Client(`${process.env.VUE_APP_MY_URL}`)

export default client
