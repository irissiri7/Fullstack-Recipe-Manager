import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'
import auth from '../firebase/authenticator.js'

//single recipe routes
router.post(
  '/recipe/add-image',
  auth.authenticateUser,
  recipeController.addRecipeImage
)
router.post(
  '/recipe/add-recipe',
  auth.authenticateUser,
  recipeController.addRecipe
)
router.get(
  '/recipe/get-recipe',
  auth.authenticateUser,
  recipeController.getRecipe
)
router.delete(
  '/recipe/delete-recipe/:recipeId',
  auth.authenticateUser,
  recipeController.deleteRecipe
)
router.put(
  '/recipe/update-recipe/',
  auth.authenticateUser,
  recipeController.updateRecipe
)

//multiple recipe routes
router.get('/get-recipes', auth.authenticateUser, recipeController.getRecipes)

export default router
