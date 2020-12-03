import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

const addRecipe = (req, res, _next) => {
  User.findOne({
    firebaseId: req.body.firebaseId
  })
    .then((user) => {
      const recipe = new Recipe({
        userId: user._id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        description: req.body.description,
        details: {
          categories: req.body.details.categories,
          qualities: req.body.details.qualities,
          'time to cook': req.body.details.timeToCook
        }
      })
      recipe
        .save()
        .then((result) => {
          res.status(201).send(result)
        })
        .catch((err) => {
          console.log(err)
          throw new Error('Could not add recipe')
        })
    })
    .catch((error) => {
      res.status(500).send(error)
    })
}

export default {
  addRecipe
}
