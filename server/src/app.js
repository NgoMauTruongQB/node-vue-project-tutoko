const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Middleware 
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.urlencoded({ extended: true}))
app.use(helmet())
app.use(morgan('combined'))



// DB connection
const db = require('./config/db')
db.connect()

// Routes
const routes = require('./routes')
app.use(routes)

// Using ErrorHandler Middleware
const errorHandler = require('./middlewares/errorHandler')
app.use(errorHandler)



module.exports = app