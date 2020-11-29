import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

import serviceKey from './service-account-key.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: process.env.firestore_URL
})

const db = admin.firestore()

export default db

//Test route for firebase
// app.get("/", async (req, res, next) => {
//   const testRef = db.collection("recipes").doc("test");
//   const doc = await testRef.get();
//   if (!doc.exists) {
//     console.log("No such document!");
//   } else {
//     console.log("Document data:", doc.data());
//   }

//   res.send("<h1>Hello world!</h1>");
// });
