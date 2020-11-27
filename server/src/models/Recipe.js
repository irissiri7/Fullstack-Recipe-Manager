import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  creator: { type: String, required: true },
  title: String,
  ingredients: [String],
  description: String,
  details: {
    category: [String],
    qualitys: [String],
    "time to cook": String,
  },
});

export default mongoose.model("Recipe", recipeSchema);
