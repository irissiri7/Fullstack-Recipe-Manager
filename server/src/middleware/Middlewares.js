import dotenv from 'dotenv'
import multer from 'multer'
import Configurations from '../configurations/Configurations.js'
import StatusCode from '../configurations/StatusCode.js'

dotenv.config()

const notFound = (req, res, next) => {
  const error = new Error(`Not found at: ${req.originalUrl}`)
  error.statusCode = StatusCode.NOT_FOUND
  next(error)
}

const errorHandler = (error, _req, res, _next) => {
  console.log(error)
  let status = error.statusCode || StatusCode.INTERNAL_SERVER_ERROR
  let message = error.message
  if (error.isAxiosError && error.response) {
    status = error.response.status
    message = error.response.data.error.message
  }
  return res.status(status).send({ message: message })
}

//OLD ERROR HANDLER
// const errorHandler = (error, req, res, _next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//   res.status(statusCode)
//   res.json({
//     statusCode: statusCode,
//     message: error.message,
//     stackTrace: process.env.ENVIROMENT === 'PRODUCTION' ? 'hidden' : error.stack
//   })

const upload = multer({
  storage: Configurations.fileStorage,
  fileFilter: Configurations.fileFilter
}).single('image')

export default {
  notFound,
  errorHandler,
  upload
}
