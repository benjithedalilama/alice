import mongoose from 'mongoose'
import User from './models/User'

const mongoDB = 'mongodb://root:example@mongo:27017'

mongoose.Promise = global.Promise
const db = mongoose.connection

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect(mongoDB)
}

db.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connectWithRetry, 5000)
})

db.on('connected', () => {
  console.log('MongoDB is connected')
})

const connect = () => {
  connectWithRetry()
}

connect()

const createUser = () => {
  const user = new User(req.body)
  user.save( (err) => {
    if (err) return err
    return user
  })
}

export default {
  db,
  createUser
}
