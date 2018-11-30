import User from '../models/User'
import Reading from '../models/Reading'

class ReadingService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const reading = new Reading(req.body)
    sensor.readings.push(reading)
    await user.save()

    return reading
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    return sensor.readings
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const reading = sensor.readings.id(req.params.id)
    if (!reading) throw {status: 404, message: "Reading not found"}

    return reading
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const reading = sensor.readings.id(req.params.id)
    if (!reading) throw {status: 404, message: "Reading not found"}

    reading.set(req.body)
    await user.save()

    return reading
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const reading = sensor.readings.id(req.params.id)
    if (!reading) throw {status: 404, message: "Reading not found"}
    reading.remove()

    return user.save()
  }
}

export default ReadingService
