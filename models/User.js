import mongoose from 'mongoose'
import Hub from './Hub'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    email: String,
    hubs: [Hub.schema]
})

UserSchema.pre('save', async function(next) {
    const user = this

    if (!user.isModified('password')) return next()

    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash
      next()
    }
    catch (err) {
      next(err)
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword, cb) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password)
      cb(null, isMatch)
    }
    catch (err) {
      cb(err)
    }
}

const User = mongoose.model('User', UserSchema)

export default User
