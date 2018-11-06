import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ControlCommandSchema = new Schema({
    id: mongoose.Types.ObjectId,
    createdAt: Date,
    action: {
      type: String,
      enum: ['setHumidity','setTemperature'],
      default: 'setHumidity'
    },
    data: Number
})

const ControlCommand = mongoose.model('ControlCommand', ControlCommandSchema)

export default ControlCommand
