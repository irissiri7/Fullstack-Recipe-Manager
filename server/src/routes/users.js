import express from 'express'
const router = express.Router()
import userController from '../controllers/user.js'

router.post('/user/sign-in', userController.signIn)

export default router
