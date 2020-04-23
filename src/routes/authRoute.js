const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 5,
    message: 'You look tired, go get some rest.'
  });

const controller = require('../controllers/authController')

router.post('/', limiter, controller.auth)

module.exports = router