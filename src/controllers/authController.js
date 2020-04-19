const userService = require('../services/userService')
const authService = require('../services/authService')
const { invalidOperationError, responseErrorFormated } = require('../helpers/errorHandler')

const emailValidator = require('../helpers/emailValidator')

require('dotenv').config({path:'./.env'})


exports.auth = async (req, res) => {
    const { email, password,  } = req.body;

    if (!email || !password) {
        throw invalidOperationError(401, 'User detail cannot be empty')        
    } else if(!emailValidator.validate(email)){
        throw invalidOperationError(400, 'Invalid e-mail')
    } else {
        try {
            const result = await userService.findByEmailAndPassword(email, password);
           
            if(!result.length > 0)
                throw invalidOperationError(406, 'User or password incorrect')
            else{
                const isConfirmed = await userService.userIsConfirmed(email)
                if(!isConfirmed)
                    throw invalidOperationError(406, 'This user not is confirmed, please confirm your email')
                const id = result[0].id;
                const expires = '1h'
                const token = authService.sign(expires,id)    
                res.status(200).json({auth: true, token: token});
            }
        } catch (err) {
            responseErrorFormated(res,err)
        }
    }


}