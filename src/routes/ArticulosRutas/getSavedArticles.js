const verifyLogged = require('../../middlewares/verifyLogged')
const verifyToken = require('../../utils/verifyToken.js')
const Users = require('../../models/Users.js')

const express = require('express');
const router = express.Router()

router.get('/getSavedArticles', verifyLogged, async (req, res, next) => {

    try {
        const savedCookie = req.cookies.IL
        const verifiedToken = verifyToken(savedCookie)
        const userID = verifiedToken._id

        const savedArticles = await Users.findById(userID).select('savedArticles').populate('savedArticles')

        if (savedArticles.savedArticles.length === 0) {
            return res.status(200).json({ foundSavedArticles: false, errorMessage: 'El usuario no tiene ningún articulo guardado' });
        }

        res.status(200).json({ foundSavedArticles: true, savedArticles: savedArticles })
        
    } catch (error) {
        next(error)
    }

})


module.exports = router;
