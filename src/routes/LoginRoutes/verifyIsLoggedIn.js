const Users = require('../../models/Users.js')

const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const router = express.Router()


router.get('/verfyIsLoggedIn', async (req, res, next) => {

    try {
        const previousCookie = req.cookies.IL

        if (!previousCookie) {
            return res.status(404).json({ isLogged: false, errorMessage: 'No existe la cookie IL en las cookies' })
        }

        const verifiedToken = verifyToken(previousCookie)

        const userID = verifiedToken._id
        if (!userID) {
            return res.status(404).json({ isLogged: false, errorMessage: 'Se verifico el token correctamente pero este no contiene un id' })
        }

        const existsUser = await Users.exists({ _id: userID })
        if (!existsUser) {
            return res.status(404).json({ isLogged: false, errorMessage: 'No se encontro un usuario en la DB con el mismo id guardado en la cookie' })
        }
        res.status(200).json({ isLogged: true, emailConfirmed: verifiedToken.emailConfirmed})

    } catch (error) {
        next(error)   
    }

})




module.exports = router