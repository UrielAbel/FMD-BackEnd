const Podcasts = require('../../models/Podcasts.js');
const { editPodcastsValidator } = require('../../validators/Podcasts/editPodcasts.validator.js')

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = express.Router()



router.patch('/podcast', editPodcastsValidator, async (req, res, next) => {

  try {
    
    const editedPodcast = req.body.editedPodcast
    const uri = editedPodcast.uri
    
    const existsPodcast = await Podcasts.exists({ uri: uri })
    if (!existsPodcast) {
      return res.status(404).json({ mensaje: "El podcast no existe en la base de datos" });
    }
    
    try {

      await Podcasts.updateOne({ uri: uri}, {$set: editedPodcast}, {upsert: true})
      res.status(200).json({ mensaje: "Actualización exitosa" });
      
    } catch (error) {
      res.status(400).json({ errormensaje: 'Hubo un error al actualizar el podcast', Error: error.message })
      console.log('Ocurrio un error al actualizar un podcast', error)
    }
  } 
  catch (error) {
    next(error)  
  }
  })
  


  module.exports = router;

