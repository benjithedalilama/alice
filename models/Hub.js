import mongoose from 'mongoose'
import Sensor from './Sensor'

const Schema = mongoose.Schema

const HubSchema = new Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    location: [Number, Number],
    createdAt: Date,
    sensors: [Sensor.schema]
})

const Hub = mongoose.model('Hub', HubSchema)

export default Hub
