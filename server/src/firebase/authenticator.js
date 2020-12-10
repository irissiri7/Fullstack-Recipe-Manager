//Firebase auth object (from the firebase-admin SDK)
import auth from './adminSetUp.js'

const authenticateUser = async (req, res, next) => {
  try {
    // 1. AUTHENTICATION

    //Getting the token
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]

    //Verify the token with Firebase (verifyIdToken() throws an error if token is invalid)
    const decodedToken = await auth.verifyIdToken(token)

    //attatch the decoded token to request for use in other middlewares
    req.decodedToken = decodedToken

    // 2. AUTHORIZATION
    //I want to make sure that an authenticated user can only POST and/or GET
    //information associated with him/herself.

    //Extraxt the firebaseId from the decoded token
    const firebaseId = decodedToken.uid

    if (req.body.firebaseId && req.body.firebaseId != firebaseId) {
      throw new Error('Unauthorized')
    }
    if (req.query.firebaseId && req.query.firebaseId != firebaseId) {
      throw new Error('Unauthorized')
    }

    //If no errors are thrown at this point, user is authenticated and authorized, calling next()
    next()

    //Any errors are caught and we send a 401 response.
  } catch (error) {
    res.status(401).send({ message: error.message })
  }
}

export default {
  authenticateUser
}