import mongoose from 'mongoose'
import ControlCommand from './ControlCommand'

const Schema = mongoose.Schema

const ControlCodeSchema = new Schema({
    id: mongoose.Types.ObjectId,
    version: String,
    action: {
      type: String,
      enum: ['setHumidity','setTemperature'],
      default: 'setHumidity'
    },
    controlCommands: [ControlCommand.schema]
})

const ControlCode = mongoose.model('ControlCode', ControlCodeSchema)

export default ControlCode
