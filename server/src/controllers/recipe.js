import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import Middlewares from '../middleware/Middlewares.js'

const addRecipe = (req, res, _next) => {
  User.findOne({
    firebaseId: req.body.firebaseId
  })
    .then((user) => {
      const recipe = new Recipe({
        userId: user._id,
        title: req.body.title,
        imageURL: req.body.imageURL,
        ingredients: req.body.ingredients,
        description: req.body.description,
        details: {
          categories: req.body.details.categories,
          qualities: req.body.details.qualities,
          timeToCook: req.body.details.timeToCook
        }
      })
      recipe
        .save()
        .then((result) => {
          res.status(201).send(result)
        })
        .catch((err) => {
          console.log(err)
          throw new Error('Could not add recipe')
        })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
}

const addRecipeImage = (req, res, _next) => {
  Middlewares.upload(req, res, (error) => {
    if (error) {
      res.status(400).send({ message: error.message })
    } else {
      res
        .status(200)
        .send({ src: `http://localhost:3001/${req.file.filename}` })
    }
  })
}

const getRecipes = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId }).exec()
    const recipes = await Recipe.find(
      { userId: user._id },
      'details ingredients title description imageURL'
    ).exec()
    res.status(200).send(recipes)
  } catch (error) {
    next(error)
  }
}

const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.query.recipeId).exec()
    recipe ? res.status(200).send(recipe) : res.sendStatus(404)
  } catch (error) {
    //Refactor to custom error send instead of calling custom error handler
    next(error)
  }
}

const deleteRecipe = async (req, res, _next) => {
  try {
    const result = await Recipe.findByIdAndDelete(req.params.recipeId)
    console.log(result)
    res.sendStatus(204)
  } catch (error) {
    res.status(400).send({ message: 'Could not delete recipe' })
  }
}
const updateRecipe = async (req, res, _next) => {
  const updatedRecipe = {
    title: req.body.title,
    imageURL: req.body.imageURL,
    ingredients: req.body.ingredients,
    description: req.body.description,
    details: {
      categories: req.body.details.categories,
      qualities: req.body.details.qualities,
      timeToCook: req.body.details.timeToCook
    }
  }
  try {
    const result = await Recipe.findByIdAndUpdate(req.body._id, updatedRecipe, {
      new: true
    })
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: 'Could not update recipe' })
  }
}

export default {
  addRecipe,
  addRecipeImage,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
