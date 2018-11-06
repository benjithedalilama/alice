import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ControlCodeSchema = new Schema({
    id: Schema.Types.ObjectId,
    version: String,
    commands: [String],
    hubId: String
})

const ControlCode = mongoose.model('ControlCode', ControlCodeSchema)

export default ControlCode
