import mongoose from 'mongoose'
import Command from './Command'

const Schema = mongoose.Schema

const CodeSchema = new Schema({
    id: mongoose.Types.ObjectId,
    version: String,
    action: {
      type: String,
      enum: ['setHumidity','setTemperature'],
      default: 'setHumidity'
    },
    commands: [Command.schema]
})

const Code = mongoose.model('Code', CodeSchema)

export default Code
