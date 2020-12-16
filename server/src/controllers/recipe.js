import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'
import services from '../util/services.js'

dotenv.config()

const addRecipe = async (req, res, _next) => {
  try {
    const data = JSON.parse(req.body.recipe)
    const file = req.file
    const user = await User.findOne({
      firebaseId: data.firebaseId
    })
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
      const result = await services.uploadImageToStorage(
        recipeId.toHexString(),
        file
      )
      if (result) {
        newRecipe.imageURL = result[0]
        newRecipe.imageName = result[1]
      }
    }
    await newRecipe.save()
    res.status(201).send(newRecipe)
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
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
      const result = await services.uploadImageToStorage(data._id, file)
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
    if (deletedRecipe.imageName) {
      await services.deleteImageFromStorage(deletedRecipe.imageName)
    }
    if (deletedRecipe) {
      res.sendStatus(204)
    } else {
      throw new Error('Could not find a recipe to delete')
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
export default {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe
}
