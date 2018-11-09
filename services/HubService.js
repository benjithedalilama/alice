import User from '../models/User'
import Hub from '../models/Hub'

class HubService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = new Hub(req.body)

    user.hubs.push(hub)
    await user.save()

    return hub
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    return user.hubs
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.id)
    if (!hub) throw {status: 404, message: "Hub not found"}

    return hub
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.id)
    if (!hub) throw {status: 404, message: "Hub not found"}

    hub.set(req.body)
    await user.save()

    return hub
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.id)
    hub.remove()

    return user.save()
  }
}

export default HubService
