import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import services from '../util/services.js'
import StatusCode from '../configurations/StatusCode.js'

dotenv.config()

const addRecipe = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.recipe)
    const file = req.file
    const user = await User.findOne({
      firebaseId: data.firebaseId
    })
    if (!user) {
      const error = new Error('Can not find user to add recipe to')
      error.statusCode = StatusCode.NOT_FOUND
      throw error
    }
    const recipeId = mongoose.Types.ObjectId()
    const newRecipe = new Recipe({
      _id: recipeId,
      userId: user._id,
      title: data.title,
      ingredients: data.ingredients,
      description: data.description,
      details: data.details
    })
    //If user also uploaded recipe file (aka an image)
    if (file) {
      const folder = `Recipes/${data.firebaseId}/`
      const result = await services.uploadImageToStorage(
        recipeId.toHexString(),
        file,
        folder
      )
      if (result) {
        newRecipe.imageURL = result[0]
        newRecipe.imageName = result[1]
      }
    }
    await newRecipe.save()
    return res.status(StatusCode.CREATED).send(newRecipe)
  } catch (error) {
    next(error)
  }
}

const updateRecipe = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.recipe)
    const file = req.file
    const updatedInformation = {
      title: data.title,
      ingredients: data.ingredients,
      description: data.description,
      details: data.details
    }
    if (file) {
      const recipePrefix = data.firebaseId + '/'
      const result = await services.uploadImageToStorage(
        data._id,
        file,
        recipePrefix
      )
      if (result) {
        updatedInformation.imageURL = result[0]
        updatedInformation.imageName = result[1]
      }
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      data._id,
      updatedInformation,
      {
        new: true
      }
    )
    if (!updatedRecipe) {
      const error = new Error('Could not update recipe')
      error.statusCode = StatusCode.INTERNAL_SERVER_ERROR
      throw error
    }
    return res.status(StatusCode.OK).send(updatedRecipe)
  } catch (error) {
    next(error)
  }
}

const getRecipes = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    if (!user) {
      const error = new Error('Could not find user')
      error.statusCode = StatusCode.NOT_FOUND
      throw error
    }
    //make middleware that constructs query object??
    const queryObject = {
      userId: user._id
    }
    if (req.query.categories) {
      queryObject['details.categories'] = { $in: req.query.categories }
    }
    if (req.query.qualities) {
      queryObject['details.qualities'] = { $in: req.query.qualities }
    }
    if (req.query.timeToCook) {
      queryObject['details.timeToCook'] = req.query.timeToCook
    }
    const recipes = await Recipe.find(
      queryObject,
      'details ingredients title description imageURL'
    ).sort([['createdAt', 'descending']])
    return res.status(StatusCode.OK).send(recipes)
  } catch (error) {
    next(error)
  }
}

const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.query.recipeId)
    if (!recipe) {
      const error = new Error('Recipe not found')
      error.statusCode = StatusCode.NOT_FOUND
      throw error
    }
    return res.status(StatusCode.OK).send(recipe)
  } catch (error) {
    next(error)
  }
}

const deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)
    if (!deletedRecipe) {
      const error = new Error('Could not delete recipe')
      error.statusCode = StatusCode.INTERNAL_SERVER_ERROR
      throw error
    }
    if (deletedRecipe.imageName) {
      await services.deleteImageFromStorage(deletedRecipe.imageName)
    }
    return res.sendStatus(StatusCode.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}
export default {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
