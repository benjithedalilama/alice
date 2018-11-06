import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SensorSchema = new Schema({
    id: mongoose.Types.ObjectId,
    type: String,
    location: [Number, Number],
    createdAt: Date,
    hubId: String
})

const Sensor = mongoose.model('Sensor', SensorSchema)

export default Sensor
