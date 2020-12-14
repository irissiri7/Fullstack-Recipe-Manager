import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  firebaseId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  foodPreferences: [String],
  profilePictureURL: { type: String }
})

export default mongoose.model('User', userSchema)
