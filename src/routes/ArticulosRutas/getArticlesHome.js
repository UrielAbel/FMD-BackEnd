const Articles = require('../../models/Articles.js')
const express = require('express')


const router = express.Router()


router.get('/home/articulos', async (req, res, next) => {
 
  try {

    const results = await Articles.find().exec()          
    const finalyResults = results.map(result => ({
      title: result.title,
      description: result.description,
      imageUrl: result.imageUrl,
      category: result.category,
      uri: result.uri,
    }))

      res.status(200).json(finalyResults)
      console.log('Se han recibido todos los Articulos para el Home')
  
  } 
  catch (error) {
    res.status(400).json({ errormensaje: 'Error al recuperar los articulos', Error: error.message })
    console.log(`Error al recuperar todos los articulos ERROR: ${error}`)
  }
  
  })


module.exports = router;
