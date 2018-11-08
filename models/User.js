import mongoose from 'mongoose'
import Hub from './Hub'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        index: {
            unique: true
        }
    },
    hashed_password: {
        type: String,
        default: ''
    },
    email: String,
    hubs: [Hub.schema]
})

UserSchema.pre("save", (next) => {
    const user = this
    if (user._password === undefined) {
        return next()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(user._password, salt, (err, hash) => {
            if (err) console.log(err)
            user.hashed_password = hash
            next()
        })
    })
})

UserSchema.methods = {
    comparePassword: candidatePassword, cb) => {
        bcrypt.compare(candidatePassword, this.password, err, isMatch) => {
            if (err) return cb(err)
            cb(null, isMatch)
        })
    }
}

const User = mongoose.model('User', UserSchema)

export default User
