import mongoose from 'mongoose'
import Reading from './Reading'

const Schema = mongoose.Schema

const SensorSchema = new Schema({
    id: mongoose.Types.ObjectId,
    type: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    readings: [Reading.schema]
})

const Sensor = mongoose.model('Sensor', SensorSchema)

export default Sensor
