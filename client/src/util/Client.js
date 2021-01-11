import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  async attemptRequest(callObject) {
    const unauthorized = 401
    try {
      console.log('first attempt')
      await axios(callObject)
    } catch (error) {
      if (error.response && error.response.status === unauthorized) {
        const refreshedToken = await this.refreshTokens()
        if (refreshedToken) {
          console.log('second attempt')
          callObject.headers.Authorization = `Basic ${refreshedToken}`
          await axios(callObject)
        }
      } else {
        throw error
      }
    }
  }

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
