const { FormValidator } = require('../../validators/FeyWeb/FormValidator.js')
const nodemailer =  require('nodemailer')

const express = require('express');
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

transporter.verify().then( () => {
    console.log('READY FOR SEND EMAILS')
})

router.post('/sendEmail', FormValidator, async (req, res, next) => {

    try {
        const {userEmail, userName, userMessage} = req.body

        transporter.sendMail({
            from: userEmail,
            to: 'ventas@feyweb.com',
            subject: 'Mensaje del remitente para FeyWeb',
            html: `<h1>Hola! mi nombre es ${userName}</h1> <br> <p>Email del usuario: ${userEmail}</p> <br> <p>${userMessage}</p>`
        })

        res.send('has enviado el email')
        
    } catch (error) {
        next(error)
    }
})





module.exports = router