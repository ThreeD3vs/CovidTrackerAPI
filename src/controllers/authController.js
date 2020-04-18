const jwt = require('jsonwebtoken')
const userService = require('../services/userService')
const authService = require('../services/authService')

const emailValidator = require('../helpers/emailValidator')

require('dotenv').config({path:'./.env'})


exports.auth = async (req, res) => {
    const { email, password,  } = req.body;

    if (!email || !password) {
        res.status(500).json({ message: "User Detail Cannot be empty" })
        
    } else if(!emailValidator.validate(email)){
        res.status(400).json({ message: "Invalid e-mail" })
    } else {

        userService.findByEmailAndPassword(email, password).then(async (result) => {
            if(result.lenght <= 0) {
                res.status(406).json({ message: 'User or Password Incorrect' })
            } else {
                const id = result[0].id;
                const expires = '1h'
                
                const token = authService.sign(expires,id)
    
                res.status(200).json({auth: true, token: token});
    
            }
        }).catch((err) => {
            res.status(err.httpStatusCode).json({ message: err.message })
        }) 
    }


}