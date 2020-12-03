import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'

router.post('/recipe/add-recipe', recipeController.addRecipe)

router.get('/get-recipes', recipeController.getRecipes)

export default router
