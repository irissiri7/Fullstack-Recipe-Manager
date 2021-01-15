import { describe, it } from 'mocha'
import chai from 'chai'
import sinon from 'sinon'

import { auth } from '../src/firebase/adminSetUp.js'
import authenticator from '../src/middleware/authenticator.js'
import StatusCode from '../src/configurations/StatusCode.js'

const expect = chai.expect

//SET UP
//Dummy request object
const req = {
  get(_header) {
    return 'Basic 123'
  },
  body: {
    firebaseId: '123'
  },
  query: {
    firebaseId: '123'
  }
}
//Dummy response object
const res = {
  status(_statusCode) {
    return this
  },
  send() {
    return
  }
}

//UNITY TESTS
const validToken = () => {
  describe('Testing a valid token', () => {
    it('Should not throw an error', (done) => {
      //Faking a valid token response
      sinon.stub(auth, 'verifyIdToken')
      auth.verifyIdToken.returns({ uid: '123' })

      authenticator
        .authenticateUser(req, res, () => {})
        .then((result) => {
          expect(result).to.not.be.an('error')
          done()
        })
        .catch(done)

      auth.verifyIdToken.restore()
    })
  })
}

const invalidToken = () => {
  describe('Testing an invalid token', () => {
    it('Should throw an error', (done) => {
      //Faking a valid token response
      sinon.stub(auth, 'verifyIdToken')
      auth.verifyIdToken.throws()

      authenticator
        .authenticateUser(req, res, () => {})
        .then((result) => {
          expect(result).to.be.an('error')
          done()
        })
        .catch(done)

      auth.verifyIdToken.restore()
    })
  })
}

const tokenAndFirebaseIdInRequestBodyDoNotMatch = () => {
  describe('Testing if token does not match firebaseId in the request body', () => {
    it('Should throw an error with statusCode UNAUTHORIZED/401', (done) => {
      //Faking a valid token response
      sinon.stub(auth, 'verifyIdToken')
      auth.verifyIdToken.returns({ uid: '321' })

      authenticator
        .authenticateUser(req, res, () => {})
        .then((result) => {
          expect(result).to.be.an('error')
          expect(result)
            .to.have.a.property('statusCode')
            .eq(StatusCode.UNAUTHORIZED)
          done()
        })
        .catch(done)

      auth.verifyIdToken.restore()
    })
  })
}

const tokenAndFirebaseIdInRequestQueryDoNotMatch = () => {
  describe('Testing if token does not match firebaseId in the request query', () => {
    it('Should throw an error with statusCode UNAUTHORIZED/401', (done) => {
      //Faking a valid token response
      sinon.stub(auth, 'verifyIdToken')
      auth.verifyIdToken.returns({ uid: '321' })

      //Make sure request body firebaseId is correct so we get to second if check
      req.body.firebaseId = '321'
      authenticator
        .authenticateUser(req, res, () => {})
        .then((result) => {
          expect(result).to.be.an('error')
          expect(result)
            .to.have.a.property('statusCode')
            .eq(StatusCode.UNAUTHORIZED)
          done()
        })
        .catch(done)

      auth.verifyIdToken.restore()
    })
  })
}

//MAIN TEST
describe('TESTING THE AUTHENTICATOR MIDDLEWARE', () => {
  validToken()
  invalidToken()
  tokenAndFirebaseIdInRequestBodyDoNotMatch()
  tokenAndFirebaseIdInRequestQueryDoNotMatch()
})
