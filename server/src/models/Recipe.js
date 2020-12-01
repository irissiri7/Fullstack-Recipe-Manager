import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  ingredients: [String],
  description: String,
  details: {
    category: [String],
    qualitys: [String],
    'time to cook': String
  }
})

export default mongoose.model('Recipe', recipeSchema)
