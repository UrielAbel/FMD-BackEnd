const nodemailer = require('nodemailer')

function sendEmail (email, confirmationLink) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: 'bentabrian5@gmail.com',
        pass: 'eiecnizilxvkyxwo'
        }
    })
  
    transporter.verify().then( () => {
        console.log('READY FOR SEND EMAILS')
    })

    transporter.sendMail({
        from: '"JAJAJAJA" <bentabrian5@gmail.com>',
        to: email,
        html: `<p>Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico:</p>
        <a href="${confirmationLink}">${confirmationLink}</a>`
      })


}

module.exports = sendEmail