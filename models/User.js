import mongoose from 'mongoose'
import Hub from './models/Hub'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: mongoose.Types.ObjectId,
    username: String,
    email: String,
    hashed_password: String,
    hubs: [Hub.schema]
})

const User = mongoose.model('User', UserSchema)

export default User
