const { User } = require('../app/models');
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

        let result = await User.findAndCountAll({
            where: {
                email: email,
                password: password
            },
            limit: 1,
            raw: true,
        })

        if (!result.count) {
            res.json({ message: 'User or Password Incorrect' });
            
        } else {
            const uid = result.rows[0].id;

            var token = jwt.sign({uid}, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
              });

            res.status(200).send({auth: true, token: token});

        }

    }


}