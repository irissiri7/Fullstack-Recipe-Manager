import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'

router.post('/recipe/add-recipe', recipeController.addRecipe)

export default router
