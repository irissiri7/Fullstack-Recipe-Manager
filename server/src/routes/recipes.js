import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'
import auth from '../firebase/authenticator.js'

//single recipe routes
router.post('/recipe/add-image', recipeController.addRecipeImage)
router.post(
  '/recipe/add-recipe',
  auth.authenticateUser,
  recipeController.addRecipe
)
router.get('/recipe/get-recipe', recipeController.getRecipe)
router.delete('/recipe/delete-recipe/:recipeId', recipeController.deleteRecipe)
router.put('/recipe/update-recipe/', recipeController.updateRecipe)

//multiple recipe routes
router.get('/get-recipes', recipeController.getRecipes)

export default router
