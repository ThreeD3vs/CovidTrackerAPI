const { Users } = require('../app/models');
const { invalidOperationError } = require('../helpers/errorHandler')

const emailService = require('../services/emailService')
const authService = require('../services/authService')

require('dotenv').config({path:'./.env'});

exports.findByPk = async (id) => {
    const result = await Users.findByPk(id)
    if(!result)
        throw invalidOperationError(406,'Incorret user id')
    return result
}

exports.findByEmailAndPassword = async (email,password) => {
    const result = await Users.findAll({
        where: { 
            email: email,
            password: password
        },
        limit: 1,
        raw: true
    })
    return result
}

exports.findByEmail = async (email) => {
    
    const result = await Users.findAll({
        where: { 
            email: email
        },
        limit: 1,
        raw: true
    })

    return result
}

exports.register = async (email,password) => {
    const result = await this.findByEmail(email)
    
    if (result.length > 0)
        throw invalidOperationError(406,'User Already Registered')

    await Users.create({
        email: email,
        password: password
    })

    const expires = '1d'
    const token = authService.createTokenWithEmail(expires,email)
    await emailService.sendEmailVerification(token, email)
}

exports.resendEmailVerification = async (email) => {
    const result = await this.userIsConfirmed(email)

    if(result){
        throw invalidOperationError(406,"User is activated, not is possible resend")
    } else {
        const expires = '1d'
        const token = authService.createTokenWithEmail(expires,email)            
        await emailService.resendEmailVerification(token, email)
    }
}

exports.userIsConfirmed = async (email) => {
    const result = await Users.count({
        where: { 
            email: email,
            confirmed : true
        }
    })

    if(result > 0)
        return true
    return false
}

exports.confirmUser = async (email) => {

    const result = await this.userIsConfirmed(email)

    if(!result){
        await Users.update({ confirmed: true }, {
            where: { 
                email: email 
            } 
        })
    } else {
        throw invalidOperationError(406,'This user is confirmed')
    }

    return result
}