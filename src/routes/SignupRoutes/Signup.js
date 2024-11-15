const Users = require('../../models/Users.js')

const { createUserValidator } =  require('../../validators/Signup/createUser.validator.js')
const generateToken = require('../../utils/generateToken.js')
const generateLoginToken = require('../../utils/generateLoginToken.js')
const sendEmail = require('../../utils/sendEmail.js')

const express = require('express')
const router = express.Router()


router.post('/registro', createUserValidator, async (req, res, next) => {
    
    try {
        const {userName, email, password, confirmPassword} = req.body
        
        try {

            // VALIDAMOS SI LAS CONTRASEÑAS SON IGUALES

            if (password != confirmPassword) {
                return res.status(400).json({ passwordsMatch: false, errorMessage: 'Las contraseñas no coinciden entre si' })
            }
            
            // VALIDAMOS SI EL USUARIO YA ESTA EN USO
            
            const existsUser = await Users.exists({ userName: userName })
            if (existsUser) {
                return res.status(400).json({ userNameInUse: true, errorMessage: 'El nombre de usuario ingresado ya esta en uso' })
            }
            
            
            // VALIDAMOS SI EL EMAIL YA ESTA EN USO
            const existsEmail = await Users.exists({ email: email })
            
            if (existsEmail) {
                return res.status(400).json({ emailInUse: true, errorMessage: 'El email ingresado ya esta en uso' })
            }


            
            
            // GENERAR TOKEN DE VERIFICACION DEL CORREO
            
            const payload = {
                email: email
            }

            const verificationToken = generateToken(payload)
            
            // GENERAMOS EL LINK DE CONFIRMACION QUE MAS ADELANTE SE LE ENVIARA POR EMAIL
            const confirmationLink = `https://logintestsfm.onrender.com/${verificationToken}`
            
            // ENVIAMOS EL EMAIL AL USUARIO
            sendEmail(email, confirmationLink)
            
            
            // CREAMOS EL USUARIO
            const createdUser = await Users.create({
                userName: userName,
                password: password,
                email: email,
                emailConfirmed: false,
                verificationToken: verificationToken
            })

            // CREAMOS EL TOKEN DE LOGEO
        
            const id = createdUser._id
            const emailConfirmed = false
            const loginToken = generateLoginToken(id, emailConfirmed)

            // GUARDAMOS EL TOKEN EN LAS COOKIES (MAX DURACION 24hs)

            res.cookie('IL', loginToken, { maxAge: 24 * 60 * 60 * 1000 }); 

            // RESPONDEMOS AL CLIENTE

            res.status(201).json({ userCreated: true, message: 'Usuario creado exitosamente!'})
            console.log('Usuario creado exitosamente!!', createdUser)

        } catch (error) {
            res.status(400).json({ userCreated: false, errorMessage: `Ocurrio un error al registrar el usuario: Error: ${error.message}` })
            console.log(error)
        }

        
    } catch (error) {
        next(error)
    }
})




module.exports = router