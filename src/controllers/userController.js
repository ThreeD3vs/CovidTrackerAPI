const { User } = require('../app/models')

const validator = require('../helpers/emailValidator')

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "User Detail Cannot be empty"
        })
    } else if(!validator.emailValidation(email)){
        res.status(400).json({
            message: "Invalid e-mail"
        })
    } else {
        const result = await User.count({
            where: {
                email: email
            }
        });

        if (result >= 1) {
            res.status(406).json({ message: 'User Already Registered'});
        }
        else {
            User.create({ email: email, password: password });
            res.status(201).json({ message: 'Successfully Registered' });
        }

    }
}

exports.users = async (req, res) => {
    const users = await User.findAll();
    res.send(users);
}


exports.me = async (req, res) => {
   const me = await User.findByPk(req.userId);
   res.status(201).json({ data: me});
}