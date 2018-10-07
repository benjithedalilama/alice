const mongoose = require('mongoose')

const mongoDB = 'mongodb://root:example@mongo:27017'

mongoose.Promise = global.Promise
const db = mongoose.connection

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect(mongoDB)
}

// Exit application on error
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
