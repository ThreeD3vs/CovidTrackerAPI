const emailValidator = require('../helpers/emailValidator')
const userService = require('../services/userService')
const authService = require('../services/authService')

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "User Detail Cannot be empty"
        })
    } else if (!emailValidator.validate(email)) {
        res.status(400).json({
            message: "Invalid e-mail"
        })
    } else {
        
        userService.register(email,password)
        .then((result) => {

            res.status(200).json({ message: 'Successfully registered' })
       
        }).catch((err) => {
            res.status(err.httpStatusCode).json({ error: err.message })
        });
    }
}

exports.emailConfirmation = async (req, res) => {
    const { token } = req.query
    
    authService.verifyTokenEmail(token).then(async (result) => {
        const {email} = result
        
        userService.confirmUser(email).then(() =>{
            res.status(200).json({ message: 'Successfully confirmed' })
        }).catch((err) => {
            res.status(err.httpStatusCode).json({ error: err.message })
        })
    }).catch((err) => {
        res.status(err.httpStatusCode).json({ error: err.message })
    })
}

exports.me = async (req, res) => {
    await userService.findByPk(req.userId)
    .then((user) => {
        res.status(201).json({ data: user });
    }).catch((err) => {
        console.log(err)
        res.status(err.httpStatusCode).json({ error: err.message })
    })
}
