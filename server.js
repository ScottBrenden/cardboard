'use strict'

const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const bodyParser = require('body-parser').json()
const debug = require('debug')('ltg:server')

require('dotenv').load()

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI)

const PORT = process.evn.PORT
const app = express()

app.use(cors())
let production = process.env.NODE_ENV === 'production'
let morganFormat = production ? 'common' : 'dev'
app.use(morgon(morganFormat))

app.use(bodyParser);
app.use(require('/lib/error-midware'))

app.use(authRouter)
app.use(errorMiddleware)

const server = module.exports = app.listen(PORT , () => {
  debug(`server up on ${PORT}`)
})

server.isRunning = true
