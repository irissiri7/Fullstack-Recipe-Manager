import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  ingredients: [String],
  description: String,
  details: {
    categories: [String],
    qualities: [String],
    'time to cook': String
  }
})

export default mongoose.model('Recipe', recipeSchema)
