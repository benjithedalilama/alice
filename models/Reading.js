import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReadingSchema = new Schema({
    id: mongoose.Types.ObjectId,
    createdAt: Date,
    action: {
      type: String,
      enum: ['readHumidity','readTemperature'],
      default: 'readHumidity'
    },
    data: Number
})

const Reading = mongoose.model('Reading', ReadingSchema)

export default Reading
