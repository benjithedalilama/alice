import mongoose from 'mongoose'
import SensorReading from './models/SensorReading'

const Schema = mongoose.Schema

const SensorSchema = new Schema({
    id: mongoose.Types.ObjectId,
    type: String,
    location: [Number, Number],
    createdAt: Date,
    sensorReadings: [SensorReading.schema]
})

const Sensor = mongoose.model('Sensor', SensorSchema)

export default Sensor
