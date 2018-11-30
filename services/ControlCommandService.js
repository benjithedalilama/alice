import User from '../models/User'
import Command from '../models/Command'

class CommandService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.codeId)
    if (!code) throw {status: 404, message: "Code not found"}

    const command = new Command(req.body)
    code.commands.push(command)
    await user.save()

    return command
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.codeId)
    if (!code) throw {status: 404, message: "Code not found"}

    return code.commands
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.codeId)
    if (!code) throw {status: 404, message: "Code not found"}

    const command = code.commands.id(req.params.id)
    if (!command) throw {status: 404, message: "Command not found"}

    return command
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.codeId)
    if (!code) throw {status: 404, message: "Code not found"}

    const command = code.commands.id(req.params.id)
    if (!command) throw {status: 404, message: "Command not found"}

    command.set(req.body)
    await user.save()

    return command
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const code = hub.codes.id(req.params.codeId)
    if (!code) throw {status: 404, message: "Code not found"}

    const command = code.commands.id(req.params.id)
    if (!command) throw {status: 404, message: "Command not found"}
    command.remove()

    return user.save()
  }
}

export default CommandService
