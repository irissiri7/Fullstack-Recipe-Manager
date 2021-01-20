import StatusCode from '../configurations/StatusCode.js'

// Validating that all recipes have a title, setting appropriate default values if ome properties are empty/non existent
const validateRecipe = (req, res, next) => {
  try {
    const recipe = JSON.parse(req.body.recipe)
    if (!recipe.title) {
      const error = new Error('Recipes must have a title')
      error.statusCode = StatusCode.BAD_REQUEST
      throw error
    }
    if (!Array.isArray(recipe.ingredients)) {
      recipe.ingredients = []
    }
    if (typeof recipe.description !== 'string') {
      recipe.description = ''
    }
    if (typeof recipe.details !== 'object') {
      recipe.details = {
        qualities: [],
        categories: [],
        timeToCook: 'About 15 min'
      }
    }
    if (!Array.isArray(recipe.details.qualities)) {
      recipe.details.qualities = []
    }
    if (!Array.isArray(recipe.details.categories)) {
      recipe.details.categories = []
    }
    if (
      recipe.details.timeToCook !== 'About 15 min' ||
      recipe.details.timeToCook !== 'About 30 min' ||
      recipe.details.timeToCook !== 'About 60 min'
    ) {
      recipe.details.timeToCook = 'About 15 min'
    }
    req.body.recipe = JSON.stringify(recipe)
    next()
    return recipe
  } catch (error) {
    next(error)
    return error
  }
}

export default {
  validateRecipe
}
