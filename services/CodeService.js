import User from '../models/User'
import Code from '../models/Code'

class CodeService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = new Code(req.body)
    hub.codes.push(code)
    await user.save()

    return code
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    return hub.codes
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.id)
    if (!code) throw {status: 404, message: "Code not found"}

    return code
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.id)
    if (!code) throw {status: 404, message: "Code not found"}

    code.set(req.body)
    await user.save()

    return code
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.id)
    if (!code) throw {status: 404, message: "Code not found"}
    code.remove()

    return user.save()
  }
}

export default CodeService
