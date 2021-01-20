import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

// import path from 'path'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

//Configurations
import Configurations from './src/configurations/Configurations.js'

//Middlewares
import errorHandler from './src/middleware/errorHandler.js'

//Routers
import usersRouter from './src/routes/users.js'
import recipesRouter from './src/routes/recipes.js'

//Creating the server
const app = express()

// Apply middleware packages
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//Modifying helmet to set csp headers that allow images from ex firebase storage and to fetch data from spoonacular API
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // prettier-ignore
      'default-src': ['\'self\'', 'api.spoonacular.com'],
      // prettier-ignore
      'img-src': ['\'self\'', 'blob:',  '*'],
      // prettier-ignore
      'script-src': ['\'self\'', 'unsafe-eval']
    }
  })
)

//Apply routes
app.use('/users', usersRouter)
app.use('/recipes', recipesRouter)

//Serve Vue app
app.use(express.static(path.join(__dirname, 'frontend/dist')))

//Make sure requests always use https
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else next()
  })
}

//Serve Vue app as default
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
})

//Error handling
app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

//Connect to db and start server
Configurations.connectToDatabase()
Configurations.connectToPort(app)

export default app
