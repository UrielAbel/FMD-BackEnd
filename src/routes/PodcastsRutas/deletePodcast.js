const Podcasts = require('../../models/Podcasts.js');
const { deletePodcastsValidator } = require('../../validators/Podcasts/deletePodcasts.validator.js')

const express = require('express')
const router = express.Router()


router.delete('/podcast', deletePodcastsValidator, async (req, res, next) => {

    try { 
  
    const uri = req.body.uri

    const deletedPodcast = await Podcasts.findOneAndDelete({uri: uri})

    if (deletedPodcast) {
      res.status(200).json({mensaje: 'Podcast eliminado exitosamente'})
      console.log('Se ha eliminado un podcast');

    } else {
      res.status(404).json({ errormensaje: `No se encontró el Podcast con el uri: ${uri} especificado`})
    }
  
  }
  catch (error) {
    res.status(500).json({ errormensaje: 'Hubo un error al eliminar el podcast', error: error.message });
    console.error('Error al ejecutar findOneAndDelete:', error);
  }
  })


  module.exports = router;
