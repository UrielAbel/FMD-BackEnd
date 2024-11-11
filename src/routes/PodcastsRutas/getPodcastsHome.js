const Podcasts = require('../../models/Podcasts.js');

const dotenv = require('dotenv');
const express = require('express')


dotenv.config();
const router = express.Router()


router.get('/home/podcasts', async (req, res, next) => {

  try { 

    const results = await Podcasts.find().exec()
    const finalyResults = results.map(result => ({
      imageUrl: result.imageUrl,
      title: result.title,
      category: result.category,
      author: result.author,
      uri: result.uri
    }))
    
    res.status(200).json(finalyResults)
    console.log('Se han recibido todos los Podcasts para el Home')

  } 
  catch(error) {
    res.status(400).json({ errormensaje: 'Error al recuperar los podscasts', error: error.message })
    console.log(`Error al recuperar todos los podcasts ERROR: ${error}`)
  }
  
})


module.exports = router;
