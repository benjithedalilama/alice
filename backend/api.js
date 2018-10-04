const express = require('express')
const User = require('./models/User')
const db = require('./db')
const bodyParser = require('body-parser');

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api/v1'

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
  console.log(req.body)
  user.save(function(err) {
    if (err) return console.error(err)
    res.send(user)
  })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
