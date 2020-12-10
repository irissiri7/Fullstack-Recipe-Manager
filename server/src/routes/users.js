import express from 'express'
const router = express.Router()
import userController from '../controllers/user.js'
import auth from '../firebase/authenticator.js'

router.post('/user/sign-in', userController.signIn)

router.post('/user/sign-up', userController.signUp)

router.post(
  '/user/change-email',
  auth.authenticateUser,
  userController.changeEmail
)

export default router
