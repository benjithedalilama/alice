import {} from 'dotenv/config'
import express from 'express'
import db from './db'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import User from './models/User'
import Hub from './models/Hub'
import Sensor from './models/Sensor'
import Reading from './models/Reading'
import Code from './models/Code'
import Command from './models/Command'
import { validateToken } from './utils.js'

import UserService from './services/UserService'
import HubService from './services/HubService'
import SensorService from './services/SensorService'
import ReadingService from './services/ReadingService'
import CodeService from './services/CodeService'
import CommandService from './services/CommandService'

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const base_path = '/api'

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// Create new user
app.post(`${base_path}/users`, async (req, res, next) => {
  try {
    const user = await UserService.create(req)
    res.send({user: user})
  }
  catch (err) {
    next(err)
  }
})

// Get users
app.get(`${base_path}/users`, validateToken, async (req, res, next) => {
  try {
    const users = await UserService.getAll()
    res.send({users: users})
  }
  catch (err) {
    next(err)
  }
})

// Get user by id
app.get(`${base_path}/users/:id`, validateToken, async (req, res, next) => {
  try {
    const user = await UserService.get(req)
    res.send({user: user})
  }
  catch (err) {
    next(err)
  }
})

// Login user
app.post(`${base_path}/users/login`, async (req, res, next) => {
  try {
    const result = await UserService.login(req)
    res.cookie('token', result.token, {maxAge: 172800000})
    res.cookie('userId', JSON.parse(JSON.stringify(result.user._id)), {maxAge: 172800000})
    res.send(result)
  }
  catch (err) {
    next(err)
  }
})

// Logout user
app.post(`${base_path}/users/logout`, async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.clearCookie('userId')
    res.send({})
  }
  catch (err) {
    next(err)
  }
})

// Update user by id
app.put(`${base_path}/users/:id`, validateToken, async (req, res, next) => {
  try {
    const user = await UserService.update(req)
    res.send({user: user})
  }
  catch (err) {
    next(err)
  }
})

// Delete user by id
app.delete(`${base_path}/users/:id`, validateToken, async (req, res, next) => {
  try {
    await UserService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new hub
app.post(`${base_path}/users/:userId/hubs`, validateToken, async (req, res, next) => {
  try {
    const hub = await HubService.create(req)
    res.send({hub: hub})
  }
  catch (err) {
    next(err)
  }
})

// Get hubs
app.get(`${base_path}/users/:userId/hubs`, validateToken, async (req, res, next) => {
  try {
    const hubs = await HubService.getAll(req)
    res.send({ hubs: hubs })
  }
  catch (err) {
    next(err)
  }
})

// Get hub by id
app.get(`${base_path}/users/:userId/hubs/:id`, validateToken, async (req, res, next) => {
  try {
    const hub = await HubService.get(req)
    res.send({hub: hub})
  }
  catch (err) {
    next(err)
  }
})

// Update hub by id
app.put(`${base_path}/users/:userId/hubs/:id`, validateToken, async (req, res, next) => {
  try {
    const hub = await HubService.update(req)
    res.send({hub: hub})
  }
  catch (err) {
    next(err)
  }
})

// Delete hub by id
app.delete(`${base_path}/users/:userId/hubs/:id`, validateToken, async (req, res, next) => {
  try {
    await HubService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new sensor
app.post(`${base_path}/users/:userId/hubs/:hubId/sensors`, validateToken, async (req, res, next) => {
  try {
    const sensor = await SensorService.create(req)
    res.send({sensor: sensor})
  }
  catch (err) {
    next(err)
  }
})

// Get all sensors by hub
app.get(`${base_path}/users/:userId/hubs/:hubId/sensors`, validateToken, async (req, res, next) => {
  try {
    const sensors = await SensorService.getAll(req)
    res.send({sensors: sensors})
  }
  catch (err) {
    next(err)
  }
})

// Get sensor by id
app.get(`${base_path}/users/:userId/hubs/:hubId/sensors/:id`, validateToken, async (req, res, next) => {
  try {
    const sensor = await SensorService.get(req)
    res.send({sensor: sensor})
  }
  catch (err) {
    next(err)
  }
})

// Update sensor by id
app.put(`${base_path}/users/:userId/hubs/:hubId/sensors/:id`, validateToken, async (req, res, next) => {
  try {
    const sensor = await SensorService.update(req)
    res.send({sensor: sensor})
  }
  catch (err) {
    next(err)
  }
})

// Delete sensor by id
app.delete(`${base_path}/users/:userId/hubs/:hubId/sensors/:id`, validateToken, async (req, res, next) => {
  try {
    await SensorService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new reading
app.post(`${base_path}/users/:userId/hubs/:hubId/sensors/:sensorId/readings`, validateToken, async (req, res, next) => {
  try {
    const reading = await ReadingService.create(req)
    res.send({reading: reading})
  }
  catch (err) {
    next(err)
  }
})

// Get all sensors by hub
app.get(`${base_path}/users/:userId/hubs/:hubId/sensors/:sensorId/readings`, validateToken, async (req, res, next) => {
  try {
    const readings = await ReadingService.getAll(req)
    res.send({readings: readings})
  }
  catch (err) {
    next(err)
  }
})

// Get reading by id
app.get(`${base_path}/users/:userId/hubs/:hubId/sensors/:sensorId/readings/:id`, validateToken, async (req, res, next) => {
  try {
    const reading = await ReadingService.get(req)
    res.send({reading: reading})
  }
  catch (err) {
    next(err)
  }
})

// Update reading by id
app.put(`${base_path}/users/:userId/hubs/:hubId/sensors/:sensorId/readings/:id`, validateToken, async (req, res, next) => {
  try {
    const reading = await ReadingService.update(req)
    res.send({reading: reading})
  }
  catch (err) {
    next(err)
  }
})

// Delete reading by id
app.delete(`${base_path}/users/:userId/hubs/:hubId/sensors/:sensorId/readings/:id`, validateToken, async (req, res, next) => {
  try {
    await ReadingService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new code
app.post(`${base_path}/users/:userId/hubs/:hubId/codes`, validateToken, async (req, res, next) => {
  try {
    const code = await CodeService.create(req)
    res.send({code: code})
  }
  catch (err) {
    next(err)
  }
})

// Get all codes by hub
app.get(`${base_path}/users/:userId/hubs/:hubId/codes`, validateToken, async (req, res, next) => {
  try {
    const codes = await CodeService.getAll(req)
    res.send({codes: codes})
  }
  catch (err) {
    next(err)
  }
})

// Get code by id
app.get(`${base_path}/users/:userId/hubs/:hubId/codes/:id`, validateToken, async (req, res, next) => {
  try {
    const code = await CodeService.get(req)
    res.send({code: code})
  }
  catch (err) {
    next(err)
  }
})

// Update code by id
app.put(`${base_path}/users/:userId/hubs/:hubId/codes/:id`, validateToken, async (req, res, next) => {
  try {
    const code = await CodeService.update(req)
    res.send({code: code})
  }
  catch (err) {
    next(err)
  }
})

// Delete code by id
app.delete(`${base_path}/users/:userId/hubs/:hubId/codes/:id`, validateToken, async (req, res, next) => {
  try {
    await CodeService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

// Create new command
app.post(`${base_path}/users/:userId/hubs/:hubId/codes/:codeId/commands`, validateToken, async (req, res, next) => {
  try {
    const command = await CommandService.create(req)
    res.send({command: command})
  }
  catch (err) {
    next(err)
  }
})

// Get all commands by hub
app.get(`${base_path}/users/:userId/hubs/:hubId/codes/:codeId/commands`, validateToken, async (req, res, next) => {
  try {
    const commands = await CommandService.getAll(req)
    res.send({commands: commands})
  }
  catch (err) {
    next(err)
  }
})

// Get command by id
app.get(`${base_path}/users/:userId/hubs/:hubId/codes/:codeId/commands/:id`, validateToken, async (req, res, next) => {
  try {
    const command = await CommandService.get(req)
    res.send({command: command})
  }
  catch (err) {
    next(err)
  }
})

// Update command by id
app.put(`${base_path}/users/:userId/hubs/:hubId/codes/:codeId/commands/:id`, validateToken, async (req, res, next) => {
  try {
    const command = await CommandService.update(req)
    res.send({command: command})
  }
  catch (err) {
    next(err)
  }
})

// Delete command by id
app.delete(`${base_path}/users/:userId/hubs/:hubId/codes/:codeId/commands/:id`, validateToken, async (req, res, next) => {
  try {
    await CommandService.delete(req)
    res.status(204).send({})
  }
  catch (err) {
    next(err)
  }
})

app.use( (err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
