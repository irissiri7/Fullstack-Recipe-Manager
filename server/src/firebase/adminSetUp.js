import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

import serviceKey from './service-account-key.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: process.env.firestore_URL
})

const auth = admin.auth()

export default auth
