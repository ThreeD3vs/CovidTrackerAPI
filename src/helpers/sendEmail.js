const nodemailer = require("nodemailer");
require('dotenv').config({path:'./.env'});

exports.send = async (token, email) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    await transporter.sendMail({
        from: `"CoronaTracker 👩🏻‍💻" <naka@waifu.club>`,
        to: `${email}, ${email}`,
        subject: 'CoronaTracker - Account Activation',
        html: `Click here to verify your account: <a href="http://127.0.0.1:3000/users/verify?token=${token}">Verify</a></b>`
    })

}
