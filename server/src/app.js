const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()



const app = express()

// Middleware 
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
)
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.urlencoded({ extended: true}))
app.use(helmet())
app.use(morgan('combined'))


// DB connection
const db = require('./config/db')
db.connect()

// Scheduler Force Delete 
const cron = require('node-cron')
require('./middlewares/schedulerForceDelete')

// Routes
const routes = require('./routes')
app.use(routes)

// Using ErrorHandler Middleware
const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)


module.exports = app