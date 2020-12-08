import dotenv from 'dotenv'
import axios from 'axios'
import store from '../store.js'

dotenv.config()

const deleteRecipe = recipeId => {
  return new Promise((resolve, reject) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      axios
        .delete(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/delete-recipe/${recipeId}`,
          {
            headers: {
              Authorization: `Basic ${store.getters.token}`
            }
          }
        )
        .then(_result => {
          resolve(true)
        })
        .catch(_error => {
          reject(false)
        })
    }
  })
}

export default {
  deleteRecipe
}
