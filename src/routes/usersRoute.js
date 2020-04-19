const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, // 20 minutes
    max: 25,
    message: 'You look tired, go get some rest.'
  });

const controller = require('../controllers/userController')

router.get('/emailConfirmation', limiter, controller.emailConfirmation);
router.get('/me', verifyJWT, limiter, controller.me);
router.post('/register', limiter, controller.register);

module.exports = router;