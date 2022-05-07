require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnectMongo } = require('./config/mongo')
const monganBody = require('morgan-body')
const { loggerStream } = require('./utils/handleLogger')
const { dbConnectMySQL } = require('./config/mysql')

const port = process.env.PORT || 3000
const app = express()
const ENGINE_DB = process.env.ENGINE_DB

// Use
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))
// Use Dependencies
monganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: (_, res) => res.statusCode < 400
})
// Routes
app.use('/api', require('./routes'))

// Server
app.listen(port, () => {
  console.log(`✅ App served in http://localhost:${port}`)
})

// DB
ENGINE_DB === 'nosql'
  ? dbConnectMongo()
  : dbConnectMySQL()
