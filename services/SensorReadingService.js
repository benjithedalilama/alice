import User from '../models/User'
import SensorReading from '../models/SensorReading'

class SensorReadingService {
  static async create(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const sensorReading = new SensorReading(req.body)
    sensor.sensorReadings.push(sensorReading)
    await user.save()

    return sensorReading
  }
  static async getAll(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    return sensor.sensorReadings
  }
  static async get(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const sensorReading = sensor.sensorReadings.id(req.params.id)
    if (!sensorReading) throw {status: 404, message: "SensorReading not found"}

    return sensorReading
  }
  static async update(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const sensorReading = sensor.sensorReadings.id(req.params.id)
    if (!sensorReading) throw {status: 404, message: "SensorReading not found"}

    sensorReading.set(req.body)
    await user.save()

    return sensorReading
  }
  static async delete(req) {
    const user = await User.findById(req.params.userId)
    if (!user) throw {status: 404, message: "User not found"}

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) throw {status: 404, message: "Hub not found"}

    const sensor = hub.sensors.id(req.params.sensorId)
    if (!sensor) throw {status: 404, message: "Sensor not found"}

    const sensorReading = sensor.sensorReadings.id(req.params.id)
    if (!sensorReading) throw {status: 404, message: "SensorReading not found"}
    sensorReading.remove()

    return user.save()
  }
}

export default SensorReadingService
