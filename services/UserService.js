import User from '../models/User'

class UserService {
  static create(req) {
    const user = new User(req.body);
    return user.save();
  }
  static getAll() {
    return User.find()
  }
  static get(req) {
    return User.findById(req.params.id)
  }
  static async update(req) {
    const user = await User.findById(req.params.id)
    user.set(req.body)
    return user.save()
  }
  static async delete(req) {
    const user = await User.findById(req.params.id)
    return user.remove()
  }
}

export default UserService
