const { Users } = require('../app/models');
const jwt = require('jsonwebtoken');

const validator = require('../helpers/emailValidator')

require('dotenv').config({path:'./.env'});


exports.auth = async (req, res) => {
    const { email, password,  } = req.body;

    if (!email || !password) {
        res.status(500).json({
            message: "User Detail Cannot be empty"
        })
    } else if(!validator.emailValidation(email)){
        res.status(400).json({
            message: "Invalid e-mail"
        })
    } else {

        let result = await Users.findAndCountAll({
            where: {
                email: email,
                password: password
            },
            limit: 1,
            raw: true,
        })

        if (!result.count) {
            res.status(400).json({
                message: 'User or Password Incorrect'
            })
        } else if(!result.rows[0].confirmed){
            res.status(400).json({
                message: 'User not confirmed'
            })
        } else {
            const id = result.rows[0].id;

            var token = jwt.sign({id}, process.env.SECRET, {
                expiresIn: '1d' // expires in 5min
              });

            console.log(token)

            res.status(200).send({auth: true, token: token});

        }

    }


}