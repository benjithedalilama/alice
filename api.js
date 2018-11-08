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

// Create new user
app.post(base_path + '/users', (req, res, next) => {
  const user = new User(req.body)
  user.save( (err) => {
    if (err) return next(err)
    res.send(user)
  })
})

// Get user by id
app.get(base_path + '/users/:id', (req, res, next) => {
  User.findById( req.params.id, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    res.send(user)
  })
})

// Get users
app.get(base_path + '/users', (req, res, next) => {
  User.find( (err, users) => {
    if (err) return next(err)
    if (!users) return next({status: 404, message: "Users not found"})

    res.send(users)
  })
})

// Update hub by id
app.put(base_path + '/users/:id', (req, res, next) => {
  User.findById( req.params.id, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    user = User(req.body)
    user.save( (err) => {
      if (err) return next(err)
      res.send(user)
    })
  })
})

// Delete hub by id
app.delete(base_path + '/users/:id', (req, res, next) => {
  User.findByIdAndRemove( req.params.id, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    res.status(204).send({})
  })
})

// Create new hub
app.post(base_path + '/users/:userId/hubs', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = new Hub(req.body)
    user.hubs.push(hub)
    user.save( (err) => {
      if (err) return next(err)
      res.send(hub)
    })
  })
})

// Get hubs
app.get(base_path + '/users/:userId/hubs', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    res.send(user.hubs)
  })
})

// Get hub by id
app.get(base_path + '/users/:userId/hubs/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.id)
    if (!hub) return next({status: 404, message: "Hub not found"})
    res.send(hub)
  })
})

// Update hub by id
app.put(base_path + '/users/:userId/hubs/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.id)
    if (!hub) return next({status: 404, message: "Hub not found"})
    hub.set(req.body)
    user.save((err) => {
      if (err) return next(err)
      res.send(hub)
    })
  })
})

// Delete hub by id
app.delete(base_path + '/users/:userId/hubs/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.id)
    if (!hub) return next({status: 404, message: "Hub not found"})
    hub.remove()
    user.save((err) => {
      if (err) return next(err)
      res.status(204).send({})
    })
  })
})

// Create new sensor
app.post(base_path + '/users/:userId/hubs/:hubId/sensors', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) return next({status: 404, message: "Hub not found"})

    const sensor = new Sensor(req.body)
    hub.sensors.push(sensor)
    user.save( (err) => {
      if (err) return next(err)
      res.send(sensor)
    })
  })
})

// Get all sensors by hub
app.get(base_path + '/users/:userId/hubs/:hubId/sensors', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) return next({status: 404, message: "Hub not found"})
    res.send(hub.sensors)
  })
})

// Get sensor by id
app.get(base_path + '/users/:userId/hubs/:hubId/sensors/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) return next({status: 404, message: "Hub not found"})

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) return next({status: 404, message: "Sensor not found"})
    res.send(sensor)
  })
})

// Update sensor by id
app.put(base_path + '/users/:userId/hubs/:hubId/sensors/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) return next({status: 404, message: "Hub not found"})

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) return next({status: 404, message: "Sensor not found"})
    sensor.set(req.body)
    user.save((err) => {
      if (err) return next(err)
      res.send(sensor)
    })
  })
})

// Delete sensor by id
app.delete(base_path + '/users/:userId/hubs/:hubId/sensors/:id', (req, res, next) => {
  User.findById( req.params.userId, (err, user) => {
    if (err) return next(err)
    if (!user) return next({status: 404, message: "User not found"})

    const hub = user.hubs.id(req.params.hubId)
    if (!hub) return next({status: 404, message: "Hub not found"})

    const sensor = hub.sensors.id(req.params.id)
    if (!sensor) return next({status: 404, message: "Sensor not found"})
    sensor.remove()
    user.save((err) => {
      if (err) return next(err)
      res.status(204).send({})
    })
  })
})

app.use( (err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
