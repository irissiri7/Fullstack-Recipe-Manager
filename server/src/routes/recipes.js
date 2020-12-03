import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'

//single recipe routes
router.post('/recipe/add-recipe', recipeController.addRecipe)
router.get('/recipe/get-recipe', recipeController.getRecipe)

//multiple recipe routes
router.get('/get-recipes', recipeController.getRecipes)

export default router
