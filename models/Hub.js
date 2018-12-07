import mongoose from 'mongoose'
import Sensor from './Sensor'
import Code from './Code'

const Schema = mongoose.Schema

const HubSchema = new Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    location: [Number, Number],
    deployed: Boolean,
    createdAt: {
      type: Date,
      default: Date.now
    },
    sensors: [Sensor.schema],
    codes: [Code.schema]
})

const Hub = mongoose.model('Hub', HubSchema)

export default Hub
