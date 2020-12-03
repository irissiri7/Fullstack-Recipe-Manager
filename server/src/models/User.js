import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  firebaseId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  foodPreferences: [String]
})

export default mongoose.model('User', userSchema)
