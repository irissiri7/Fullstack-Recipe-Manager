import { describe, it } from 'mocha'
import chai from 'chai'

import recipeValidator from '../src/middleware/recipeValidator.js'
import StatusCode from '../src/configurations/StatusCode.js'

const expect = chai.expect

//SET UP
let recipe = {
  title: 'dummy',
  ingredients: ['a', 'b'],
  description: 'Mix well',
  details: {
    qualities: ['c', 'd'],
    categories: ['e', 'f'],
    timeToCook: 'About 15 min'
  }
}

const recipeWithoutTitle = () => {
  describe('Try to add recipe without title', () => {
    it('Should throw an error with statusCode 400', () => {
      recipe.title = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.be.an('error')
      expect(result).to.have.property('statusCode').eq(StatusCode.BAD_REQUEST)

      //restore recipe
      recipe.title = 'dummy'
    })
  })
}

const recipeWithoutIngredients = () => {
  describe('Try to add recipe without ingredients', () => {
    it('Adds a default empty ingredient array', () => {
      recipe.ingredients = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('ingredients').eql([])
      //   expect(result.ingredients).to.be.an('array').that.is.empty

      //restore recipe
      recipe.ingredients = ['a', 'b']
    })
  })
}
const recipeWithoutDescription = () => {
  describe('Try to add recipe without description', () => {
    it('Adds a default empty description', () => {
      recipe.description = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('description').eq('')

      //restore recipe
      recipe.description = 'Mix well'
    })
  })
}
const recipeWithoutDetails = () => {
  describe('Try to add recipe without details', () => {
    it('Adds a default empty details object', () => {
      recipe.details = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result)
        .to.have.property('details')
        .eql({ qualities: [], categories: [], timeToCook: 'About 15 min' })

      //restore recipe
      recipe.details = {
        qualities: ['c', 'd'],
        categories: ['e', 'f'],
        timeToCook: 'About 15 min'
      }
    })
  })
}

const recipeWithoutQualities = () => {
  describe('Try to add recipe without qualities', () => {
    it('Adds a default empty qualities array', () => {
      recipe.details.qualities = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('details')
      const details = result.details
      expect(details.qualities).to.eql([])

      //restore recipe
      recipe.details.qualities = ['c', 'd']
    })
  })
}

const recipeWithoutCategories = () => {
  describe('Try to add recipe without categories', () => {
    it('Adds a default empty categories array', () => {
      recipe.details.categories = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('details')
      const details = result.details
      expect(details.categories).to.eql([])

      //restore recipe
      recipe.details.categories = ['e', 'f']
    })
  })
}

const recipeWithoutTimeToCook = () => {
  describe('Try to add recipe without timeToCook', () => {
    it('Adds a default timeToCook', () => {
      recipe.details.timeToCook = undefined
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('details')
      const details = result.details
      expect(details.timeToCook).to.eq('About 15 min')

      //restore recipe
      recipe.details.timeToCook = 'About 15 min'
    })
  })
}

const recipeWithOnlyTitle = () => {
  describe('Try to add recipe where only title is provided', () => {
    it('Adds all the right default values', () => {
      recipe = {
        title: 'dummy'
      }
      const req = {
        body: {
          recipe: JSON.stringify(recipe)
        }
      }
      const result = recipeValidator.validateRecipe(req, {}, () => {})
      expect(result).to.have.property('ingredients').eql([])
      expect(result).to.have.property('description').eq('')
      expect(result)
        .to.have.property('details')
        .eql({ qualities: [], categories: [], timeToCook: 'About 15 min' })
      //restore recipe
      recipe = {
        title: 'dummy',
        ingredients: ['a', 'b'],
        description: 'Mix well',
        details: {
          qualities: ['c', 'd'],
          categories: ['e', 'f'],
          timeToCook: 'About 15 min'
        }
      }
    })
  })
}

//MAIN TEST
describe('TESTING THE RECIPE VALIDATOR MIDDLEWARE', () => {
  recipeWithoutTitle()
  recipeWithoutIngredients()
  recipeWithoutDescription()
  recipeWithoutDetails()
  recipeWithoutQualities()
  recipeWithoutCategories()
  recipeWithoutTimeToCook()
  recipeWithOnlyTitle()
})
