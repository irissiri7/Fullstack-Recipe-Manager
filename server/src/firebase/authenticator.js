import auth from './adminSetUp.js'

const authenticateUser = async (req, res, next) => {
  console.log('authenticating user')
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const decodedToken = await auth.verifyIdToken(token)
    req.decodedToken = decodedToken
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}

export default {
  authenticateUser
}
