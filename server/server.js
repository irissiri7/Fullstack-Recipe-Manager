import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

//Configurations
import Configurations from './src/configurations/Configurations.js'

//Middlewares
import Middlewares from './src/middleware/Middlewares.js'

//Routers
import usersRouter from './src/routes/users.js'
import recipesRouter from './src/routes/recipes.js'

//Creating the server
const app = express()

//Apply middleware packages
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//serve static files/images
app.use(express.static('images'))

//Apply routes
app.use('/users', usersRouter)
app.use('/recipes', recipesRouter)

//Error handling
app.use(Middlewares.notFound)
app.use(Middlewares.errorHandler)

//Connect to db and start server
Configurations.connectToDatabase()
Configurations.connectToPort(app)

export default app
