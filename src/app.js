const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const app = express();

const usersRoute = require('./routes/usersRoute')
const authRoute = require('./routes/authRoute')   

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 100,
    message: 'You look tired, go get some rest.'
  });

app.use(limiter);
app.use(bodyParser.urlencoded({extended: true}))
app.use('/users',  usersRoute)
app.use('/auth', authRoute)

module.exports = app;