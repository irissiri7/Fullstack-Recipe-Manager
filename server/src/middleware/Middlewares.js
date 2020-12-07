import dotenv from 'dotenv'
import multer from 'multer'
import Configurations from '../configurations/Configurations.js'

dotenv.config()

const notFound = (req, res, next) => {
  const error = new Error(`Not found at: ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    statusCode: statusCode,
    message: error.message,
    stackTrace: process.env.ENVIROMENT === 'PRODUCTION' ? 'hidden' : error.stack
  })
}

const upload = multer({
  storage: Configurations.fileStorage,
  fileFilter: Configurations.fileFilter
}).single('image')

export default {
  notFound,
  errorHandler,
  upload
}
