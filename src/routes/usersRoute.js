const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const controller = require('../controllers/userController')
const rateLimit = require('express-rate-limit')



const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Hour
    max: 4,
    message: {error: 'You look tired, go get some rest.'}
  });


router.get('/', verifyJWT, controller.users);
router.post('/resend', limiter, controller.resendEmailValidation);
router.get('/verify', controller.verify);
router.get('/me', verifyJWT, controller.me);
router.post('/register', controller.register);

module.exports = router;