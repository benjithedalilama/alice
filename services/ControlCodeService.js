import User from '../models/User'
import ControlCode from '../models/ControlCode'

class ControlCodeService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = new ControlCode(req.body)
    hub.controlCodes.push(controlCode)
    await user.save()

    return controlCode
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    return hub.controlCodes
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.id)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    return controlCode
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.id)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    controlCode.set(req.body)
    await user.save()

    return controlCode
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.id)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}
    controlCode.remove()

    return user.save()
  }
}

export default ControlCodeService
