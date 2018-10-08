const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: String,
    email: String,
    password_hash: String,
    points: Number
})

const User = mongoose.model('User', UserSchema)

module.exports = User
