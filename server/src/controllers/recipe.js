import Recipe from "../models/Recipe.js";

const recipeController = {
  addRecipe: (req, res, next) => {
    const recipe = new Recipe({
      creator: "Lydia Lind",
      title: "Mango Chimken",
      ingredients: ["chicken", "mango chutney", "creme fraiche"],
      description: "Mix all and throw in the oven",
      details: {
        category: ["dinner", "snack"],
        qualitys: ["gluten free"],
        "time to cook": "<15 min",
      },
    });
    recipe
      .save()
      .then((result) => {
        console.log(result);
        res.send("<h1>Added recipe</h1>");
      })
      .catch((err) => {
        console.log(err);
        res.send("<h1>Could not add recipe :( ...</h1>");
      });
  },
};

export default recipeController;
