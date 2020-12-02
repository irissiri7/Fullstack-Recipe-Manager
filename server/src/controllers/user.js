import User from '../models/User.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const signIn = (req, res, _next) => {
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true
      }
    )
    .then((response) => {
      res.status(200).json(response.data)
    })
    .catch((error) => {
      if (error.response) {
        res.sendStatus(error.response.status)
      } else {
        res.sendStatus(500)
      }
    })
}

const signUp = (req, res, _next) => {
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebase_AUTH_API_KEY}`,
      {
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true
      }
    )
    .then((response) => {
      const newUser = new User({
        _id: response.data.localId,
        email: response.data.email
      })
      newUser
        .save()
        .then((_result) => res.status(200).json(response.data))
        .catch((_err) => {
          throw new Error('Failed to sign up new user')
        })
    })
    .catch((error) => {
      if (error.response) {
        res.sendStatus(error.response.status)
      } else {
        res.sendStatus(500)
      }
    })
}

export default {
  signIn,
  signUp
}
