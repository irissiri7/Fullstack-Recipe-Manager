import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import services from '../util/services.js'
import StatusCode from '../configurations/StatusCode.js'

dotenv.config()

const addRecipe = async (req, res, _next) => {
  try {
    const data = JSON.parse(req.body.recipe)
    const file = req.file
    const user = await User.findOne({
      firebaseId: data.firebaseId
    })
    if (!user)
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Can not find user to add recipe to' })

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
    console.log(error)
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const updateRecipe = async (req, res, _next) => {
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
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Could not find recipe to update' })
    }
    return res.status(StatusCode.OK).send(updatedRecipe)
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const getRecipes = async (req, res, _next) => {
  try {
    const user = await User.findOne({ firebaseId: req.query.firebaseId })
    if (!user)
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Could not find user' })
    const recipes = await Recipe.find(
      { userId: user._id },
      'details ingredients title description imageURL'
    ).sort([['createdAt', 'descending']])
    return res.status(StatusCode.OK).send(recipes)
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}

const getRecipe = async (req, res, _next) => {
  try {
    const recipe = await Recipe.findById(req.query.recipeId)
    if (!recipe) {
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Recipe not found' })
    }
    return res.status(StatusCode.OK).send(recipe)
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: 'Could not get recipe' })
  }
}

const deleteRecipe = async (req, res, _next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)
    if (!deletedRecipe)
      return res
        .status(StatusCode.NOT_FOUND)
        .send({ message: 'Could not find a recipe to delete' })
    if (deletedRecipe.imageName) {
      await services.deleteImageFromStorage(deletedRecipe.imageName)
    }
    return res.sendStatus(StatusCode.NO_CONTENT)
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message })
  }
}
export default {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
