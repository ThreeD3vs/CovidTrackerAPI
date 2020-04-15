const validator = require('email-validator')

exports.emailValidation = (email) => {
    return validator.validate(email)
}

exports.emailValidationAsync = async (email) => {
    return await validator.validate_async(email)
}