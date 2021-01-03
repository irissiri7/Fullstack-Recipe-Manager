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

const setUserInLocalStorage = user => {
  localStorage.setItem('firebaseId', user.firebaseId)
  localStorage.setItem('token', user.token)
  localStorage.setItem('email', user.email)
  localStorage.setItem('tokenExpirationDate', user.tokenExpirationDate)
}

const getUserFromLocalStorage = () => {
  const firebaseId = localStorage.getItem('firebaseId')
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const tokenExpirationDate = localStorage.getItem('tokenExpirationDate')

  const userExists = firebaseId && token && email && tokenExpirationDate

  if (userExists) {
    return {
      firebaseId: firebaseId,
      token: token,
      email: email,
      tokenExpirationDate: tokenExpirationDate
    }
  }
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('firebaseId')
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('tokenExpirationDate')
}

export default {
  deleteRecipe,
  setUserInLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage
}
