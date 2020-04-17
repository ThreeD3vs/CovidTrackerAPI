const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const usersRoute = require('./routes/usersRoute')
const authRoute = require('./routes/authRoute')   

app.use(bodyParser.urlencoded({extended: true}))
app.use('/users',  usersRoute)
app.use('/auth', authRoute)

module.exports = app;