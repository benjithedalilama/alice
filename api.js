import express from 'express'
import User from './models/User'
import Hub from './models/Hub'
import Sensor from './models/Sensor'
import SensorReading from './models/SensorReading'
import ControlCode from './models/ControlCode'
import ControlCommand from './models/ControlCommand'
import UserService from './services/UserService'
import db from './db'
import bodyParser from 'body-parser'

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api'

app.use(bodyParser.json())

// Create new user
app.post(base_path + '/users', async (req, res, next) => {
  try {
    const user = await UserService.create(req)
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Get user by id
app.get(base_path + '/users/:id', async (req, res, next) => {
  try {
    const user = await UserService.get(req)
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Get users
app.get(base_path + '/users', async (req, res, next) => {
  try {
    const users = await UserService.getAll()
    res.send(users)
  }
  catch (err) {
    next(err)
  }
})

// Update hub by id
app.put(base_path + '/users/:id', async (req, res, next) => {
  try {
    const user = await UserService.update(req)
    res.send(user)
  }
  catch (err) {
    next(err)
  }
})

// Delete hub by id
app.delete(base_path + '/users/:id', async (req, res, next) => {
  try {
    UserService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
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
