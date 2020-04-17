const { invalidOperationError } = require('../helpers/errorHandler')
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'./.env'});

exports.verifyToken = async (token) => {
    await jwt.verify(token, process.env.SECRET_EMAIL, async function (err, decoded) {
        if (err) {
            throw invalidOperationError(500,'Invalid token')
        } else {
            if(!decoded)
                return decoded
        }
    })
}

exports.createTokenWithEmail = (expires, email) => {
    var token = jwt.sign({ email }, process.env.SECRET_EMAIL, {
        expiresIn: expires
    });

    return token
}

exports.sign = (expires, id) => {
    var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: expires
    });

    return token
}