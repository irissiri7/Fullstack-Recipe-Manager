import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

class Client {
  constructor() {
    if (process.env.ENVIROMENT === 'DEVELOPEMENT') {
      this.baseUrl = 'http://localhost:5000/'
    } else {
      this.baseUrl = ''
    }
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

  async getRecipes() {
    const response = await this.attemptRequest({
      method: 'GET',
      url: `${this.baseUrl}recipes/get-recipes/?firebaseId=${store.getters.firebaseId}`,
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return response
  }

  async getRecipeById(id) {
    const data = await this.attemptRequest({
      method: 'GET',
      url: `${this.baseUrl}recipes/recipe/get-recipe/?recipeId=${id}`,
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return data
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

  async updateUserDetails(userData) {
    await this.attemptRequest({
      method: 'POST',
      url: `${this.baseUrl}users/user/update-user-details/`,
      data: userData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }

  async deleteProfile() {
    await this.attemptRequest({
      method: 'DELETE',
      url: `${this.baseUrl}users/user/delete-user/?firebaseId=${store.getters.firebaseId}`,
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }

  async getUserDetails() {
    const data = await this.attemptRequest({
      method: 'GET',
      url: `${this.baseUrl}users/user/get-user-details/?firebaseId=${store.getters.firebaseId}`,
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return data
  }

  //These methods are not using attemptRequest() since we are not authenticated in the first place
  // hence no tokens that we can attempt to refresh if first call fails
  async authenticate(email, password, mode) {
    //Default url is for 'signIn'
    let url = `${this.baseUrl}users/user/sign-in`
    //Changing url if mode is 'signUp'
    if (mode == 'sign up') url = `${this.baseUrl}users/user/sign-up`
    const response = await axios({
      method: 'POST',
      url: url,
      data: { email: email, password: password },
      headers: {
        Authorization: `Basic ${store.getters.token}`
      }
    })
    return response.data
  }

  async resetPassword(email) {
    const response = await axios({
      method: 'POST',
      url: `${this.baseUrl}users/user/reset-password`,
      data: { email: email }
    })
    return response.data
  }

  //PRIVATE METHODS
  // If first response is 401/unauth, this method will
  // try to refresh the tokens and run request again
  async attemptRequest(callObject) {
    const unauthorized = 401
    let response = null
    try {
      response = await axios(callObject)
      return response.data
    } catch (error) {
      if (error.response && error.response.status === unauthorized) {
        const refreshedToken = await this.refreshTokens()
        if (refreshedToken) {
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
    try {
      const response = await axios.post(
        `${this.baseUrl}users/user/refresh-token`,
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

const client = new Client()

export default client
