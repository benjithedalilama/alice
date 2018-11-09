import User from '../models/User'

class UserService {
  static create(req) {
    const user = new User(req.body);
    return user.save();
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
}

export default UserService
