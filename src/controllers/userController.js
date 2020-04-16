const { Users } = require('../app/models')
const jwt = require('jsonwebtoken');
const validator = require('../helpers/emailValidator')
const sendEmail = require('../helpers/sendEmail')

require('dotenv').config({ path: './.env' });

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: 'User Detail Cannot be empty'
        })
    } else if (!validator.emailValidation(email)) {
        res.status(400).json({
            error: 'Invalid e-mail'
        })
    } else {
        try {
            const result = await Users.count({
                where: {
                    email: email
                }
            });
            if (result >= 1) {
                res.status(406).json({ message: 'User Already Registered' });
            }
            else {
                Users.create({
                    email: email, password: password
                });

                var token = jwt.sign({ email }, process.env.SECRET_EMAIL, {
                    expiresIn: 300
                });
                sendEmail.send(token, email)
                res.status(201).json({ message: 'Successfully Registered' });
            }
        } catch (err) {
            res.status(500).json({ error: 'Occurred error' });
        }
    }
}

exports.users = async (req, res) => {
    const users = await Users.findAll();
    res.send(users);
}

exports.verify = async (req, res) => {
    var decoded = jwt.verify(req.query.token, process.env.SECRET_EMAIL, async function (err, decoded) {
        if (err) {
            res.status(500).send('Invalid Token');
        } else {
            let result = await Users.findAll({
                where: {
                    email: decoded.email
                },
                limit: 1,
                raw: true,
            })

            if (!result.confirmed) {
                await Users.update({ confirmed: true }, { where: { email: decoded.email } })
                res.status(200).json({ message: 'Email confirmed successfully' })
            } else {
                res.status(500).json({ error: 'This email has already confirmed' })
            }
        }
    })

}

exports.resendEmailValidation = async (req, res) => {
    const { email } = req.body;
    let result = await Users.findAndCountAll({
        where: {
            email: email,
        },
        limit: 1,
        raw: true,
    })

    if (!validator.emailValidation(email)) {
        res.status(400).json({
            message: 'Invalid e-mail'
        })

        if (!result.count) {
            res.status(500).json({ error: 'User not found!' });
        }

    } else if (!result.rows[0].confirmed) {
        var token = jwt.sign({ email }, process.env.SECRET_EMAIL, { expiresIn: 300 });
        sendEmail.send(token, email)
        res.status(201).json({ error: 'A confirmation email has been sent' });
    } else {
        res.status(201).json({ error: 'Email has already confirmed' });
    }
}

exports.me = async (req, res) => {
    const me = await Users.findByPk(req.userId);
    res.status(201).json({ data: me });
}
