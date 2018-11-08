import mongoose from 'mongoose'
import Hub from './Hub'
import bcrypt from 'bcryptjs'

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
    password: {
        type: String,
        default: ''
    },
    email: String,
    hubs: [Hub.schema]
})

UserSchema.pre('save', function(next) {
    const user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', UserSchema)

export default User
