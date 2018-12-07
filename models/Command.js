import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommandSchema = new Schema({
    id: mongoose.Types.ObjectId,
    createdAt: {
      type: Date,
      default: Date.now
    },
    action: {
      type: String,
      enum: ['setHumidity','setTemperature'],
      default: 'setHumidity'
    },
    data: Number
})

const Command = mongoose.model('Command', CommandSchema)

export default Command
