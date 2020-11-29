import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectToDatabase = async () => {
  try {
    const DB_URL = process.env.DB_URL
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('SUCCESSFULLY CONNECTED TO DB')
  } catch (err) {
    console.log('COULD NOT CONNECT TO DB: ' + err)
    process.exit()
  }
}

const connectToPort = (app) => {
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT: ' + PORT)
  })
}

export default {
  connectToDatabase,
  connectToPort
}
