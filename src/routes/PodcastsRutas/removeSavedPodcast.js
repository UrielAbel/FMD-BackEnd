const Users = require('../../models/Users.js')
const Podcasts = require('../../models/Podcasts.js')
const { removeSavedPodcastValidator } = require('../../validators/Podcasts/removeSavedPodcast.validator.js')

const verifyLogged = require('../../middlewares/verifyLogged.js')
const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const router = express.Router()

router.patch('/removeSavedPodcast', verifyLogged, removeSavedPodcastValidator, async (req, res, next) => {
  
  try {
    const { podcastUri } = req.body
    const savedCookie = req.cookies.IL;
    const verifiedToken = verifyToken(savedCookie);
    const userID = verifiedToken._id;

   const foundPodcast = await Podcasts.findOne({ uri: podcastUri }).select('_id')

   if (!foundPodcast) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'No se encontro un podcast con ese uri' })
   }
   if(!foundPodcast._id) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'el podcasts recibido no contiene un _id' })
   }

   const podcastID = foundPodcast._id

   const savedPodcasts = await Users.findById(userID).select('savedPodcasts')

   if (!savedPodcasts.savedPodcasts.includes(podcastID)) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'El usuario no guardo ese Podcast' })
   }

   const updatedUser = await Users.findByIdAndUpdate(userID, { $pull: { savedPodcasts: podcastID } }, { new: true })
   
   res.status(200).json({ updatedUser: true, updatedUser: updatedUser })

  } catch (error) {
    next(error)
  }
})

module.exports = router;
