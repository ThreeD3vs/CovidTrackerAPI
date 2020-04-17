const validator = require('email-validator')

exports.validate = (email) => {
    return validator.validate(email)
}

exports.validateAsync = async (email) => {
    return await validator.validate_async(email)
}