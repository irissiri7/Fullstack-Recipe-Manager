import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { describe, it as test } from 'mocha'

import app from '../server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(10)
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

// const getUserDetails = () => {
//   describe('Testing to get details about existing user', () => {
//     test('Excpecting to get user details', (done) => {
//       Chai.request(app)
//         .get('/users/user/get-user-details')
//         .set(
//           'Authorization',
//           'Basic eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjaXBlLW1hbmFnZXItZWQ5NDgiLCJhdWQiOiJyZWNpcGUtbWFuYWdlci1lZDk0OCIsImF1dGhfdGltZSI6MTYxMDQ1ODEwMywidXNlcl9pZCI6InkzUDNvYmMwOXdWV1liZW9YUVJzRlFtQlkxMzMiLCJzdWIiOiJ5M1Azb2JjMDl3VldZYmVvWFFSc0ZRbUJZMTMzIiwiaWF0IjoxNjEwNDU4MTAzLCJleHAiOjE2MTA0NjE3MDMsImVtYWlsIjoiZHdpZ2h0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR3aWdodEBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.YHd8wYDcmCiIukQCwEQ9RHAHpLVjpHnhZMCpp9ul5YeubLZwtNkTksGk4zxJld6QgLnoXCBh3Zgq4xxdh0sI3D1YsifWEJWlbacLnb-6iCQNNyt6B45nAJH0VGkZY32MT1ytbKCsHHMOU_7mOn4aqLiWsd7ROk4GMlMoB2wP3TSUn4T-1BQTAUrriP0MkPIgsCLfmHpjGUI1y69zG6r8dOoZ0zP06Qabp53FbiAFiFt0vcXiycebJqSMg5iuOrvN8j2ARHpU-m9DF-dNc3J5xhhXFpkQCVY1Tu7CUaY5jNVfh_Sh0nId3NWNtJD_6iKYvwY1JVKQRUpcfV7cdiFTtg'
//         )
//         .query({ firebaseId: user.firebaseId })
//         .end((err, res) => {
//           res.should.have.a.status(200)
//           done()
//         })
//     })
//   })
// }

describe('TESTING THE USER API ROUTE', () => {
  testingNonExistentRoute()
  signIn()
  //   getUserDetails()
})
