import User from '../models/User'
import Sensor from '../models/Sensor'

class SensorService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = new Sensor(req.body)
    hub.sensors.push(sensor)
    await user.save()

    return sensor
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    return hub.sensors
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    return sensor
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    sensor.set(req.body)
    await user.save()

    return sensor
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) throw {status: 404, message: "Sensor not found"}
    sensor.remove()

    return user.save()
  }
}

export default SensorService
