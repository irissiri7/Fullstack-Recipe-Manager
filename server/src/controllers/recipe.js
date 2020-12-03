import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

const addRecipe = (req, res, _next) => {
  User.findOne({
    firebaseId: req.body.firebaseId
  })
    .then((user) => {
      const recipe = new Recipe({
        userId: user._id,
        title: req.body.title,
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
const getRecipes = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId }).exec()
    const recipes = await Recipe.find(
      { userId: user._id },
      'details ingredients title description'
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
    next(error)
  }
}

export default {
  addRecipe,
  getRecipes,
  getRecipe
}
