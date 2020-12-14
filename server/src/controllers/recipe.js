import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const addRecipe = async (req, res, _next) => {
  try {
    const recipeData = JSON.parse(req.body.recipe)
    const user = await User.findOne({
      firebaseId: recipeData.firebaseId
    })
    const newRecipe = new Recipe({
      userId: user._id,
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      description: recipeData.description,
      details: recipeData.details
    })
    if (req.file) {
      newRecipe.imageURL = `${process.env.BASE_URL}${req.file.filename}`
    }
    await newRecipe.save()
    res.status(201).send(newRecipe)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
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
  const data = JSON.parse(req.body.recipe)
  const updatedInformation = {
    title: data.title,
    ingredients: data.ingredients,
    description: data.description,
    details: data.details
  }
  if (req.file) {
    updatedInformation.imageURL = `${process.env.BASE_URL}${req.file.filename}`
  }
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      data._id,
      updatedInformation,
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
    console.log(error)
    res.status(400).send({ message: error.message })
  }
}

export default {
  addRecipe,
  // addRecipeImage,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
