import dotenv from 'dotenv'
import axios from 'axios'
import User from '../models/User.js'
import Recipe from '../models/Recipe.js'
import StatusCode from '../configurations/StatusCode.js'

// import Middlewares from '../middleware/Middlewares.js'
import services from '../util/services.js'
import { bucket } from '../firebase/adminSetUp.js'

dotenv.config()

const signIn = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true
      }
    )
    return res.status(StatusCode.OK).send(response.data)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const signUp = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true
      }
    )
    const newUser = new User({
      firebaseId: response.data.localId,
      firstName: '',
      lastName: '',
      profilePictureURL: ''
    })
    await newUser.save()
    return res.status(StatusCode.CREATED).send(response.data)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const changeEmail = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        idToken: req.headers.authorization.split(' ')[1],
        email: req.body.email,
        returnSecureToken: true
      }
    )
    return res.status(StatusCode.OK).send(response.data)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const changePassword = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        idToken: req.headers.authorization.split(' ')[1],
        password: req.body.password,
        returnSecureToken: true
      }
    )

    return res.status(StatusCode.OK).send(response.data)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const getUserDetails = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'User not found' })
    }
    return res.status(StatusCode.OK).send(user)
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const updateUserDetails = async (req, res, _next) => {
  try {
    const data = JSON.parse(req.body['user-details'])
    const file = req.file
    const user = await User.findOne({ firebaseId: data.firebaseId })
    if (!user)
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Could not find user to update' })

    const updatedInformation = {
      foodPreferences: data.foodPreferences,
      firstName: data.firstName,
      lastName: data.lastName
    }
    if (file) {
      const result = await services.uploadImageToStorage(
        data.firebaseId,
        file,
        'ProfilePictures/'
      )
      if (result) {
        updatedInformation.profilePictureURL = result[0]
        updatedInformation.profilePictureName = result[1]
      }
    }
    const updatedUserDetails = await User.findByIdAndUpdate(
      user._id,
      updatedInformation,
      { new: true }
    )
    if (!updatedUserDetails)
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: 'Was not able to update user details' })
    return res.status(StatusCode.OK).send(updatedUserDetails)
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const deleteUser = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    if (!user)
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Could not find user to delete' })
    //Remove from Firebase
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.firebase_AUTH_API_KEY}`,
      { idToken: req.token }
    )
    //Remove user from Db
    await User.deleteOne({ _id: user._id })
    //Remove users Recipes from Db
    await Recipe.deleteMany({ userId: user._id })

    //Remove any stored files from Firebase Storage
    await bucket.deleteFiles({
      force: true,
      prefix: `Recipes/${req.query.firebaseId}`
    })
    await bucket.deleteFiles({
      force: true,
      prefix: `ProfilePictures/${req.query.firebaseId}`
    })

    return res.sendStatus(StatusCode.NO_CONTENT)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    } else {
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: error.message })
    }
  }
}

const refreshToken = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.firebase_AUTH_API_KEY}`,
      { grant_type: 'refresh_token', refresh_token: req.body.refreshToken }
    )
    return res.status(StatusCode.OK).send({
      token: response.data.id_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    })
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const resetPassword = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        email: req.body.email,
        requestType: 'PASSWORD_RESET'
      }
    )
    return res.status(StatusCode.OK).send(response.data)
  } catch (error) {
    console.log(error)
    if (error.isAxiosError && error.response) {
      return res
        .status(error.response.status)
        .send({ message: error.response.data.error.message })
    }
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

export default {
  signIn,
  signUp,
  changeEmail,
  changePassword,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  refreshToken,
  resetPassword
}
