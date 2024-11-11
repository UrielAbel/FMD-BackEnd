const Podcasts = require('../../models/Podcasts.js');
const { getPodcastsValidator } =  require('../../validators/Podcasts/getPodcasts.validator.js')

const dotenv = require('dotenv');
const express = require('express')


dotenv.config();
const router = express.Router()


router.get('/podcasts', async (req, res, next) => {
  
  try {
    const results = await Podcasts.find().exec()

    const resultsArray = Array.from(results)

    res.status(200).json(resultsArray)

    console.log('Se han recibido todos los podcasts')
  } 
  catch (error) {
     res.status(500).json({ errormensaje: 'Error al recuperar los podcasts', error: error.message });
     
     console.error(`Error al recuperar todos los podcasts ERROR: ${error}`);
  }

  })



router.get('/podcast/:uri', getPodcastsValidator, async (req, res, next) => {
  
  try {

    const uri = req.params.uri
  
    const updatedPodcast = await Podcasts.findOneAndUpdate({ uri: uri }, { $inc: { views: 1 } }, { new: true }).exec();
        
    if (!updatedPodcast) {
      throw new Error('Podcast no encontrado');
    }
      
      
    res.status(200).json(updatedPodcast)
    console.log('Se ha recibido un podcast y se ha incrementado el número de vistas');
  } 
  
  catch (error) {

    if (error.message === 'Podcast no encontrado') {
      res.status(404).json({ errormensaje: error.message });
    } else {
      res.status(500).json({ errormensaje: 'Error al recuperar el podcast', error: error.message });
      console.log('Error al ejecutar findOne, Error: ', error)
    }

  }
  
  })
  
  
  module.exports = router;
  