const verifyLogged = require('../../middlewares/verifyLogged')
const verifyToken = require('../../utils/verifyToken.js')
const Users = require('../../models/Users.js')
const Podcasts = require('../../models/Podcasts.js')

const express = require('express');
const router = express.Router()

router.get('/getSavedPodcasts', verifyLogged, async (req, res, next) => {

    try {
        const savedCookie = req.cookies.IL
        const verifiedToken = verifyToken(savedCookie)
        const userID = verifiedToken._id

        const savedPodcasts = await Users.findById(userID).select('savedPodcasts').populate('savedPodcasts')

        if (savedPodcasts.savedPodcasts.length === 0) {
            return res.status(200).json({ foundSavedPodcasts: false, errorMessage: 'El usuario no tiene ningún podcast guardado' });
        }

        res.status(200).json({ foundSavedPodcasts: true, savedPodcasts: savedPodcasts })
        
    } catch (error) {
        next(error)
    }

})


module.exports = router;
