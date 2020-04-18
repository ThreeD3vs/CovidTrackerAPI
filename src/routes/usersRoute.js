const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const controller = require('../controllers/userController')

router.get('/emailConfirmation', controller.emailConfirmation);
router.get('/me', verifyJWT, controller.me);
router.post('/register', controller.register);

module.exports = router;