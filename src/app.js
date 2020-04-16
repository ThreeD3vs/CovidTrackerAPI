const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const app = express();


const index = require('./routes/index')
const usersRoute = require('./routes/usersRoute')
const authRoute = require('./routes/authRoute')

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 300,
    message: 'You look tired, go get some rest.'
  });


app.use(limiter);
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', index)
app.use('/users',  usersRoute)
app.use('/auth', authRoute)



module.exports = app;