import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

import serviceKey from './serviceKey.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  storageBucket: 'recipe-manager-ed948.appspot.com',

  databaseURL: process.env.firestore_URL
})

const auth = admin.auth()
const bucket = admin.storage().bucket()

export { auth, bucket }
