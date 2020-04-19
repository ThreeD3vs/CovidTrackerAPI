const emailValidator = require('../helpers/emailValidator')
const userService = require('../services/userService')
const authService = require('../services/authService')
const { invalidOperationError,responseErrorFormated } = require('../helpers/errorHandler')

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw invalidOperationError(400, 'User detail cannot be empty')
    } else if (!emailValidator.validate(email)) {
        throw invalidOperationError(400, 'Invalid e-mail')
    } else {
        try {
            await userService.register(email,password)

            res.status(200).json({ message: 'Successfully registered' })   
        } catch (err) {
            responseErrorFormated(res,err)
        }
    }
}

exports.emailConfirmation = async (req, res) => {
    const { token } = req.query

    try {
        const { email } = await authService.verifyTokenEmail(token)
        await userService.confirmUser(email)
        res.status(200).json({ message: 'Successfully confirmed' })
    } catch (err) {
        responseErrorFormated(res,err)
    }
}

exports.me = async (req, res) => {
    try {
        const user = await userService.findByPk(req.userId)
        res.status(201).json({ data: user })
    } catch (err) {
        responseErrorFormated(res,err)
    }
}
