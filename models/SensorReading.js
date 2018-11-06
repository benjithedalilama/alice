import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SensorReadingSchema = new Schema({
    id: Schema.Types.ObjectId,
    createdAt: Date,
    action: {
      type: String,
      enum: ['readHumidity','readTemperature'],
      default: 'readHumidity'
    },
    data: Number
})

const SensorReading = mongoose.model('SensorReading', SensorReadingSchema)

export default SensorReading
