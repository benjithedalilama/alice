import jwt from 'jsonwebtoken'
import User from '../models/User'

class UserService {
  static create(req) {
    const user = new User(req.body)
    return user.save()
  }
  static getAll() {
    return User.find()
  }
  static async get(req) {
    const user = await User.findById(req.params.id)
    if (!user) throw {status: 404, message: "User not found"}

    return user
  }
  static async update(req) {
    const user = await User.findById(req.params.id)
    if (!user) throw {status: 404, message: "User not found"}

    user.set(req.body)
    return user.save()
  }
  static async delete(req) {
    const user = await User.findById(req.params.id)
    if (!user) throw {status: 404, message: "User not found"}

    return user.remove()
  }
  static async login(req) {
    const user = await User.findOne({username: req.body.username})
    if (!user) throw {status: 404, message: "User not found"}

    const isMatch = await user.comparePassword(req.body.password, user.password)
    if (!isMatch) throw {status: 401, message: "Authentication error"}

    const payload = { user: user.id }
    const options = { expiresIn: '2d', issuer: 'Mr Beniamino' }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, options)

    return {user: user, token: token}
  }
}

export default UserService
