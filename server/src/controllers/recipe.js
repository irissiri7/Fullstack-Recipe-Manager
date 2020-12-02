import Recipe from '../models/Recipe.js'

const addRecipe = (req, res, _next) => {
  const recipe = new Recipe({
    userId: req.body.userId,
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
      res.status(500).send(err)
    })
}

export default {
  addRecipe
}
