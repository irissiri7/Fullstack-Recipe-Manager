import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import Middlewares from '../middleware/Middlewares.js'
import dotenv from 'dotenv'

dotenv.config()

const addRecipe = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.body.firebaseId })
    const newRecipe = new Recipe({
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
    await newRecipe.save()
    res.status(201).send(newRecipe)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const addRecipeImage = async (req, res, _next) => {
  Middlewares.upload(req, res, (error) => {
    if (error) {
      res.status(400).send({ message: error.message })
    } else {
      res
        .status(200)
        .send({ src: `${process.env.BASE_URL}${req.file.filename}` })
    }
  })
}

const getRecipes = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    const recipes = await Recipe.find(
      { userId: user._id },
      'details ingredients title description imageURL'
    )
    res.status(200).send(recipes)
  } catch (error) {
    res.status(404).send({ message: 'Could not get recipes' })
  }
}

const getRecipe = async (req, res, _next) => {
  try {
    const recipe = await Recipe.findById(req.query.recipeId)
    if (recipe) {
      res.status(200).send(recipe)
    } else {
      throw new Error('Could not find recipe')
    }
  } catch (error) {
    res.status(404).send({ message: error.message })
  }
}

const deleteRecipe = async (req, res, _next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)
    if (deletedRecipe) {
      res.sendStatus(204)
    } else {
      throw new Error('Could not find a recipe to delete')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
const updateRecipe = async (req, res, _next) => {
  const newInformation = {
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
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.body._id,
      newInformation,
      {
        new: true
      }
    )
    if (updatedRecipe) {
      res.status(200).send(updatedRecipe)
    } else {
      throw new Error('Could not update recipe')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
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
