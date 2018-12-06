import mongoose from 'mongoose'
import {} from 'dotenv/config'
import User from './models/User'

const connectionUrl = process.env.MONGO_LOCAL_CONN_URL

mongoose.Promise = global.Promise
const db = mongoose.connection

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect(connectionUrl)
}

db.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connectWithRetry, 500)
})

db.on('connected', () => {
  console.log('MongoDB is connected')
})

const connect = () => {
  connectWithRetry()
}

connect()

export default db
