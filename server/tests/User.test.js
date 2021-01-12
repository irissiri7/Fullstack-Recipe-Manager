import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { describe, it as test } from 'mocha'

import app from '../server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(10)
const token = 'dummytoken'
const user = {
  email: 'dwight@example.com',
  password: '111111',
  firebaseId: 'y3P3obc09wVWYbeoXQRsFQmBY133'
}

const testingNonExistentRoute = () => {
  describe('Testing a route that does not exist', () => {
    test('Expecting 404 not found', (done) => {
      Chai.request(app)
        .get(`/${randomString}`)
        .end((req, res) => {
          res.should.have.a.status(404)
          done()
        })
    })
  })
}

const signIn = () => {
  describe('Testing sign in (POST) for existing user', () => {
    test('Expecting user to be signed in', (done) => {
      Chai.request(app)
        .post('/users/user/sign-in')
        .send(user)
        .end((error, response) => {
          response.should.have.a.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('localId')
          response.body.should.have.property('idToken')
          response.body.should.have.property('refreshToken')
          response.body.should.have.property('email').eq(user.email)
          done()
        })
    })
  })
}

const getUserDetails = () => {
  describe('Testing to get details about existing user', () => {
    test('Excpecting to get user details', (done) => {
      Chai.request(app)
        .get('/users/user/get-user-details')
        .set('Authorization', token)
        .query({ firebaseId: user.firebaseId })
        .end((err, res) => {
          res.should.have.a.status(200)
          done()
        })
    })
  })
}

describe('TESTING THE USER API ROUTE', () => {
  testingNonExistentRoute()
  signIn()
  //   getUserDetails()
})
