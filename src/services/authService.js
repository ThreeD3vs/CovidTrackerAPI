const { invalidOperationError } = require('../helpers/errorHandler')
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'./.env'});

exports.verifyTokenEmail = async (token) => {
    const result = await jwt.verify(token, process.env.SECRET_EMAIL, async function (err, decoded) {
        if (err) {
            throw invalidOperationError(401,'Invalid token')
        } else {
            return decoded
        }
    })

    return result
}

exports.createTokenWithEmail = (expires, email) => {
    var token = jwt.sign({ email }, process.env.SECRET_EMAIL, {
        expiresIn: expires
    })

    return token
}

exports.verifyToken = async (token) => {
    const result = await jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) {
            throw invalidOperationError(401,'Invalid token')
        } else {
            return decoded
        }
    })

    return result
}

exports.sign = (expires, id) => {
    var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: expires
    });
    
    return token
}