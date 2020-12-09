import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    imageURL: { type: String },
    ingredients: [String],
    description: String,
    details: {
      categories: [String],
      qualities: [String],
      timeToCook: String
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Recipe', recipeSchema)
