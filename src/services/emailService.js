const nodemailer = require("nodemailer");
const { invalidOperationError } = require('../helpers/errorHandler')

require('dotenv').config({path:'./.env'});

const createTransportEmail = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
}

const transporter = createTransportEmail();

exports.sendEmailVerification = async (token, email) => {
    await transporter.sendMail({
        from: `"CoronaTracker 👩🏻‍💻" <naka@waifu.club>`,
        to: `${email}, ${email}`,
        subject: 'CoronaTracker - Account Activation',
        html: `Click here to verify your account: <a href="http://127.0.0.1:3000/users/emailConfirmation?token=${token}">Verify</a></b>`
    })
}

exports.resendEmailVerification =  async (token, email) => {
    await transporter.sendMail({
        from: `"CoronaTracker 👩🏻‍💻" <naka@waifu.club>`,
        to: `${email}, ${email}`,
        subject: 'CoronaTracker - Resend Account Activation',
        html: `Click here to verify your account: <a href="http://127.0.0.1:3000/users/emailConfirmation?token=${token}">Verify</a></b>`
    })
}