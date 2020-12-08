import auth from './adminSetUp.js'

const authenticateUser = async (req, res, next) => {
  console.log('authenticating user')
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    await auth.verifyIdToken(token)
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

export default {
  authenticateUser
}
