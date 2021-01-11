import dotenv from 'dotenv'

dotenv.config()

const setUserInLocalStorage = user => {
  localStorage.setItem('firebaseId', user.firebaseId)
  localStorage.setItem('token', user.token)
  localStorage.setItem('refreshToken', user.refreshToken)
  localStorage.setItem('email', user.email)
}

const getUserFromLocalStorage = () => {
  const firebaseId = localStorage.getItem('firebaseId')
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const email = localStorage.getItem('email')

  const userExists = firebaseId && token && refreshToken && email

  if (userExists) {
    return {
      firebaseId: firebaseId,
      token: token,
      refreshToken: refreshToken,
      email: email
    }
  }
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('firebaseId')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('email')
}

export default {
  setUserInLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage
}
