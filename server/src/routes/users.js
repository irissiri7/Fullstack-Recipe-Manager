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

router.post(
  '/user/change-password',
  auth.authenticateUser,
  userController.changePassword
)

router.get(
  '/user/get-user-details',
  auth.authenticateUser,
  userController.getUserDetails
)

router.post(
  '/user/update-user-details',
  auth.authenticateUser,
  userController.updateUserDetails
)

router.post(
  '/user/add-profile-picture',
  auth.authenticateUser,
  userController.addProfilePicture
)

export default router
