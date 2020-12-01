// import User from '../models/User.js'
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

export default {
  signIn
}
