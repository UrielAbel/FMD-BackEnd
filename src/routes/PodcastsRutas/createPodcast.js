const Podcasts = require('../../models/Podcasts.js');
const { createPodcastsValidator } = require('../../validators/Podcasts/createPodcasts.validator.js')

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = express.Router()

router.post('/podcast', createPodcastsValidator, async (req, res, next) => {

    try {
  
      const { title, description, category, subCategory, imageUrl, relatedContent, episodes, author } = req.body
      
      const { nanoid } = await import('nanoid');
      const uri = nanoid(8)
  
      try {
        
        const createdPodcast = await Podcasts.create({
          title: title,
          description: description,
          category: category,
          subCategory: subCategory,
          uri: uri,
          imageUrl: imageUrl,
          relatedContent: relatedContent,
          episodes: episodes,
          author: author,
          views: 0
        })
        
        res.status(201).json({ mensaje: 'Podcast creado exitosamente!!', podcast: createdPodcast })
        
        console.log('Podcast creado exitosamente!!', createdPodcast)
        
      } catch (error) {
        res.status(400).json({ errormensaje: 'Ha ocurrido un error al crear el podcast', Error: error.message })
        console.log('Error al crear un podcast', error)
      }
    } catch (error) {
      next(error)
    }
  
  })

module.exports = router;
