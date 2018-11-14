import mongoose from 'mongoose'
import Sensor from './Sensor'
import ControlCode from './ControlCode'

const Schema = mongoose.Schema

const HubSchema = new Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    location: [Number, Number],
    deployed: Boolean,
    createdAt: Date,
    sensors: [Sensor.schema],
    controlCodes: [ControlCode.schema]
})

const Hub = mongoose.model('Hub', HubSchema)

export default Hub
