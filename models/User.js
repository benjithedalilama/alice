import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    hashed_password: String
})

const User = mongoose.model('User', UserSchema)

export default User
