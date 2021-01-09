import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async addRecipe(recipeData) {
    await axios.post(`${this.baseUrl}recipes/recipe/add-recipe`, recipeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }
  async updateRecipe(recipeData) {
    await axios.put(`${this.baseUrl}recipes/recipe/update-recipe`, recipeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${store.getters.token}`
      }
    })
  }
}

const client = new Client(`${process.env.VUE_APP_MY_URL}`)

export default client
