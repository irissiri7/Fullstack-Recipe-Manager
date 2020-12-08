import auth from './adminSetUp.js'

const authenticateUser = async (firebaseId, token) => {
  //auth.verifyIdToken() throws an Error if it can't verify the token.
  const verficationResult = await auth.verifyIdToken(token)

  if (verficationResult.uid !== firebaseId) {
    throw new Error('Could not autheticate user')
  }
}

export default {
  authenticateUser
}
