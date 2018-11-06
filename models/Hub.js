import mongoose from 'mongoose'

const Schema = mongoose.Schema

const HubSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    location: [Number, Number],
    createdAt: Date,
    userId: String
})

const Hub = mongoose.model('Hub', HubSchema)

export default Hub
