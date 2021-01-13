import User from '../models/User.js'
import Recipe from '../models/Recipe.js'
import axios from 'axios'
import dotenv from 'dotenv'

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
    res.status(200).send(response.data)
  } catch (error) {
    if (error.response) {
      res.status(400).send({ message: error.response.data.error.message })
    } else {
      res.status(400).send({ message: error.message })
    }
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
    res.status(201).send(response.data)
  } catch (error) {
    if (error.response) {
      res.status(400).send({ message: error.response.data.error.message })
    } else {
      res.status(400).send({ message: error.message })
    }
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

    res.status(200).send(response.data)
  } catch (error) {
    if (error.response) console.log(error.response)
    res.status(400).send({ message: error.message })
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

    res.status(200).send(response.data)
  } catch (error) {
    if (error.response) console.log(error.response.data)
    res
      .status(400)
      .send({ message: 'Something went wrong, could not change password' })
  }
}

const getUserDetails = async (req, res, _next) => {
  try {
    const response = await User.findOne({ firebaseId: req.query.firebaseId })
    if (response) {
      res.status(200).send(response)
    } else {
      throw new Error('Could not find user')
    }
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

const updateUserDetails = async (req, res, _next) => {
  try {
    const data = JSON.parse(req.body['user-details'])
    const file = req.file
    const user = await User.findOne({ firebaseId: data.firebaseId })
    if (!user) throw new Error('Could not find a user to update')
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
    res.status(200).send(updatedUserDetails)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}

const deleteUser = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    if (!user) throw new Error('Could not find user to delete')
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

    res.sendStatus(204)
  } catch (error) {
    console.log(error.response)
    res.status(400).send({ message: error.message })
  }
}

const refreshToken = async (req, res, _next) => {
  try {
    const response = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.firebase_AUTH_API_KEY}`,
      { grant_type: 'refresh_token', refresh_token: req.body.refreshToken }
    )
    res.status(200).send({
      token: response.data.id_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    })
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
    }
    res.status(400).send({ message: error.message })
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
    res.status(200).send(response.data)
  } catch (error) {
    if (error.response) {
      console.log(error.response)
      res.status(error.response.status).send(error.response.data)
    } else {
      console.log(error)
      res.status(500).send({ message: error.message })
    }
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
