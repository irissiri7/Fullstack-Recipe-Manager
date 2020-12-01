import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

//Configurations
import Configurations from './src/configurations/Configurations.js'

//Middlewares
import Middlewares from './src/middleware/Middlewares.js'

//Controllers
import recipeController from './src/controllers/recipe.js'

//Models
// import User from './src/models/User.js'

//Routers
import usersRouter from './src/routes/users.js'

//Creating the server
const app = express()

//Apply middleware packages
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Apply routes
app.use('/users', usersRouter)

app.get('/', (req, res, _next) => {
  res.send('<h1>Hello world!</h1>')
})

app.get('/add-recipe', recipeController.addRecipe)

//Error handling
app.use(Middlewares.notFound)
app.use(Middlewares.errorHandler)

//Connect to db and start server
Configurations.connectToDatabase()
Configurations.connectToPort(app)
