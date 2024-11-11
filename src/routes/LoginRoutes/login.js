const Users = require('../../models/Users.js')
const generateLoginToken = require('../../utils/generateLoginToken.js')
const verifyIsLoggedIn = require('../../middlewares/verifyIsLoggedIn.js')

const express = require('express');
const router = express.Router()


router.post('/login', verifyIsLoggedIn, async (req, res, next) => {
    try {
        const { userName, password } = req.body
        
        const userFound =  await Users.findOne({ userName: userName })

        if (!userFound) {
           return res.status(404).json({ userFound: false, errorMessage: 'No se ha encontrado un usuario con ese nombre en la DB' })
        }
        
        console.log(userFound)
        
        const userId = userFound._id.toString()

        const isPasswordValid = await userFound.isValidPassword(password)
        
        if (isPasswordValid === false) {
            return res.status(401).json({ isPasswordValid: false, errorMessage: 'La contraseña no es correcta' })
        }
        else {

            const emailConfirmed = userFound.emailConfirmed
            
            const loginToken = generateLoginToken(userId, emailConfirmed)
            
            res.cookie('IL', loginToken, { maxAge: 24 * 60 * 60 * 1000 })

            res.status(200).json({ isLoggedIn: true, emailConfirmed: emailConfirmed, message: 'El usuario se ha logeado correctamente' })

        }

        
    } catch (error) {
        next(error)   
    }
})




module.exports = router