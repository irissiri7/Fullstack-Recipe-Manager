import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()

const connectToDatabase = async () => {
  try {
    const DB_URL = process.env.DB_URL
    mongoose.set('useFindAndModify', false)
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
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log('SERVER IS RUNNING ON PORT: ' + PORT)
  })
}

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return cb(null, true)
  } else {
    return cb(new Error('Wrong file type, must be .jpg, .jpeg or .png'))
  }
}

export default {
  connectToDatabase,
  connectToPort,
  fileStorage,
  fileFilter
}
