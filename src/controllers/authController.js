const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const authService = require('../services/authService')

const emailValidator = require('../helpers/emailValidator')

require('dotenv').config({path:'./.env'})


exports.auth = async (req, res) => {
    const { email, password,  } = req.body;

    if (!email || !password) {
        res.status(500).json({
            message: "User Detail Cannot be empty"
        })
        
    } else if(!emailValidator.validate(email)){
        res.status(400).json({
            message: "Invalid e-mail"
        })
    } else {

        await userService.findByEmailAndPassword(email, password).then((result) => {
            if(!result) {
                res.json({ message: 'User or Password Incorrect' });
            } else {
                const id = result.rows[0].id;
                const expires = '1h'

                const token = authService.sign(expires,id).then
    
                res.status(200).send({auth: true, token: token});
    
            }
        }).catch((err) => {
            res.status(err.httpStatusCode).json({ message: err.message })
        }) 
    }


}