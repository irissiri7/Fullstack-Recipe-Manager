import User from '../models/User.js'
// import mongoose from 'mongoose'
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
      email: response.data.email
    })
    await newUser.save()
    res.status(201).send(response.data)
  } catch (error) {
    if (error.isAxiosError) {
      res.status(400).send({ message: error.response.data.error.message })
    } else {
      res.status(400).send({ message: error.message })
    }
  }
}

export default {
  signIn,
  signUp
}
