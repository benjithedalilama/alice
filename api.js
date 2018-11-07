import express from 'express'
import User from './models/User'
import Hub from './models/Hub'
import Sensor from './models/Sensor'
import SensorReading from './models/SensorReading'
import ControlCode from './models/ControlCode'
import ControlCommand from './models/ControlCommand'
import db from './db'
import bodyParser from 'body-parser'

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api'

app.use(bodyParser.json())

app.post(base_path + '/users', (req, res, next) => {
  const user = new User(req.body)
  user.save(function(err) {
    if (err) return next(err)
    res.send(user)
  })
})

app.get(base_path + '/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return next(err)
    res.send(user)
  })
})

app.put(base_path + '/users/:username', (req, res, next) => {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return next(err)
    user = User(req.body)
    user.save(function(err) {
      if (err) return next(err)
      res.send(user)
    })
  })
})

app.post(base_path + '/hubs', (req, res, next) => {
  User.findById( req.body.userId, function (err, user) {
    if (err) return next(err)
    const hub = new Hub(req.body)
    user.hubs.push(hub)
    user.save(function(err) {
      if (err) return next(err)
      res.send(hub)
    })
  })
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
