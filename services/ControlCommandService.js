import User from '../models/User'
import ControlCommand from '../models/ControlCommand'

class ControlCommandService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.controlCodeId)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    const controlCommand = new ControlCommand(req.body)
    controlCode.controlCommands.push(controlCommand)
    await user.save()

    return controlCommand
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.controlCodeId)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    return controlCode.controlCommands
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.controlCodeId)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    const controlCommand = controlCode.controlCommands.id(req.params.id)
    if (!controlCommand) throw {status: 404, message: "ControlCommand not found"}

    return controlCommand
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.controlCodeId)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    const controlCommand = controlCode.controlCommands.id(req.params.id)
    if (!controlCommand) throw {status: 404, message: "ControlCommand not found"}

    controlCommand.set(req.body)
    await user.save()

    return controlCommand
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const controlCode = hub.controlCodes.id(req.params.controlCodeId)
    if (!controlCode) throw {status: 404, message: "ControlCode not found"}

    const controlCommand = controlCode.controlCommands.id(req.params.id)
    if (!controlCommand) throw {status: 404, message: "ControlCommand not found"}
    controlCommand.remove()

    return user.save()
  }
}

export default ControlCommandService
