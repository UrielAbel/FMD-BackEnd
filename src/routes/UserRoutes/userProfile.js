const Users = require('../../models/Users.js')

const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const router = express.Router()


router.get('/userProfile', async (req, res, next) => {
    try {
        const loginCookie = req.cookies.IL
        if (!loginCookie) {
            return res.status(404).json({ loggedIn: false, errorMessage: 'Ningun usuario se ha logueado (no existe en la cookie)' })
        }

        const verifiedToken = verifyToken(loginCookie)
        const userID = verifiedToken._id

        if(!userID) {
            return res.status(404).json({ loggedIn: false, errorMessage: 'El token se verifico correctamente pero este no contiene un id de usuario' })
        }

        const userFound = await Users.findById(userID).select('userName')

        if (!userFound) {
            return res.status(404).json({ userFound: false, errorMessage: 'No se ha encotrado un usuario con el id almacenado en la cookie en la DB'})
        }

        const userName = userFound.userName
        res.status(302).json({ userFound: userName })

        
    } catch (error) {
        next(error)   
    }
})




module.exports = router