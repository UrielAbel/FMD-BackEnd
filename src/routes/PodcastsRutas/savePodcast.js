const Users = require('../../models/Users.js')

const { savePodcastValidator } = require('../../validators/Podcasts/savePodcast.validator.js')
const verifyLogged = require('../../middlewares/verifyLogged.js')
const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const Podcasts = require('../../models/Podcasts.js');
const router = express.Router()


router.post('/savePodcast', savePodcastValidator, verifyLogged, async (req, res, next) => {

    try {
        const { podcastUri } = req.body

        
        const savedCookie = req.cookies.IL
        
        const verifiedToken =  verifyToken(savedCookie)
        const userID = verifiedToken._id
        
        const podcastID = await Podcasts.findOne({ uri: podcastUri}).select('_id')
        
        if (!podcastID) {
            return res.status(401).json({ updatedUser: false, errorMessage: 'No se encontro un podcast con ese uri' })
        }

        const user = await Users.findById(userID).select('savedPodcasts')

        const podcastExists = user.savedPodcasts.some(savedPodcast => savedPodcast.equals(podcastID._id));

        
        if (podcastExists) {
            return res.status(404).json({updatedUser: false, errorMessage: 'Este usuario ya ha guardado este podcast' })
        }

        const updatedUser = await Users.findByIdAndUpdate(userID, {$push: { savedPodcasts: podcastID }}, { new: true })

        if(!updatedUser) {
            return res.status(400).json({ updatedUser: false, errorMessage: 'Error al actualizar el usuario', Error: error.message })
        }

        res.status(200).json({ updatedUser: true, message: 'Se ha actualizado el uusario correctamente' })

    } catch (error) {
        next(error) 
    }

})




module.exports = router