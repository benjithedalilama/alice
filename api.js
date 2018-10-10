import express from 'express'
import User from './models/User'
import db from './db'
import bodyParser from 'body-parser'

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api'

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello world!\n')
})

app.get(base_path + '/users', (req, res) => {
  User.find(function (err, user) {
    if (err) return console.error(err)
    res.send(user)
  })
})

app.get(base_path + '/users/:id', (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) return console.error(err)
    res.send(user)
  })
})

app.post(base_path + '/users', (req, res) => {
  const user = new User(req.body)
  user.save(function(err) {
    if (err) return console.error(err)
    res.send(user)
  })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
