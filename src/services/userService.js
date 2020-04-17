const { Users } = require('../app/models');
const { invalidOperationError } = require('../helpers/errorHandler')

const emailService = require('../services/emailService')
const authService = require('../services/authService')

require('dotenv').config({path:'./.env'});

exports.findByEmailAndPassword = async (email) => {
    await Users.findAll({
        where: { 
            email: email,
            password: password
        },
        limit: 1,
        raw: true
    }).then((result) => {
        return result
    }).catch((err) => {
        throw invalidOperationError(500,'Ocurred error internal')
    })
}

exports.findByEmail = async (email) => {
    
    await Users.findAll({
        where: { 
            email: email
        },
        limit: 1,
        raw: true
    }).then((result) => {
        if(result)
            return result
        return
    }).catch((err) => {
        console.log(err)
        throw invalidOperationError(500,'Ocurred error internal')
    })
}

exports.register = async (email,password) => {
    await this.findByEmail(email).then((result) => {
        
        if (result)
            throw invalidOperationError(406,'User Already Registered')

        Users.create({
            email: email,
            password: password
        })
        .then((results)=>{
            console.log(results.rows)
            const expires = '1d'

            const token = authService.createTokenWithEmail(expires,email)
            
            emailService.sendEmailVerification(token, email)
        })
        .catch((err) => {
            console.log(err)
            throw invalidOperationError(500,'Ocurred error internal')
        });
    }).catch((err) => {
        console.log(err)
        throw invalidOperationError(500,'Ocurred error internal')
    });;
}

exports.resendEmailVerification = async (email) => {
    this.userIsConfirmed(email)
    .then((result) => {
        if(result){
            throw invalidOperationError(406,"User is activated, not is possible resend")
        } else {

            const expires = '1d'

            const token = authService.createTokenWithEmail(expires,email)
            
            emailService.resendEmailVerification(token, email)
        }
    }).catch((err) => {
        console.log(err)
        throw invalidOperationError(500,'Ocurred error internal')
    })
}

exports.userIsConfirmed = async (email) => {
    await Users.count({
        where: { 
            email: email,
            confirmed : true
        }
    }).then((result) => {
        if(result)
            return true
        return false
    }).catch((err) => {
        console.log(err)
        throw invalidOperationError(500,'Ocurred error internal')
    })
}

exports.confirmUser = async (email) => {

    await this.userIsConfirmed(email).then((result) => {
        if(!result){
            Users.update({ confirmed: true }, {
                where: { 
                    email: email 
                } 
            }).catch((err) => {
                console.log(err)
                throw invalidOperationError(500,'Ocurred error internal')
            });
        } else {
            throw invalidOperationError(406,'This user is confirmed')
        }
    }).catch((err) => {
        console.log(err)
        throw invalidOperationError(500,'Ocurred error internal')
    });
}