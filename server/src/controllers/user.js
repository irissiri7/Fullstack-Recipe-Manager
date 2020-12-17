import User from '../models/User.js'
import axios from 'axios'
import dotenv from 'dotenv'

// import Middlewares from '../middleware/Middlewares.js'
import services from '../util/services.js'
// import { bucket } from '../firebase/adminSetUp.js'

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
    res
      .status(400)
      .send({ message: 'Something went wrong, could not change email' })
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

// const deleteUser = async (req, res, next) => {
//   bucket.getFiles({prefix})
// }

// const addProfilePicture = async (req, res, _next) => {
//   Middlewares.upload(req, res, (error) => {
//     if (error) {
//       res.status(400).send({ message: error.message })
//     } else {
//       res
//         .status(200)
//         .send({ src: `${process.env.BASE_URL}${req.file.filename}` })
//     }
//   })
// }

export default {
  signIn,
  signUp,
  changeEmail,
  changePassword,
  getUserDetails,
  updateUserDetails
  // addProfilePicture
}
