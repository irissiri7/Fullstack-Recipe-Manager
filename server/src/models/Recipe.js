import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  ingredients: [String],
  description: String,
  details: {
    categories: [String],
    qualities: [String],
    timeToCook: String
  }
})

export default mongoose.model('Recipe', recipeSchema)
