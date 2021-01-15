import express from 'express'
const router = express.Router()
import recipeController from '../controllers/recipe.js'
import auth from '../middleware/authenticator.js'
import fileUploader from '../middleware/fileUploader.js'
import recipeValidator from '../middleware/recipeValidator.js'

router.post(
  '/recipe/add-recipe',
  auth.authenticateUser,
  fileUploader.upload,
  recipeValidator.validateRecipe,
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
  fileUploader.upload,
  recipeController.updateRecipe
)

router.get('/get-recipes', auth.authenticateUser, recipeController.getRecipes)

export default router
