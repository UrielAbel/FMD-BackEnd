const Articles = require('../../models/Articles.js')
const { getArticleValidator } = require('../../validators/Articles/getArticle.validator.js')

const express = require('express')
const router = express.Router()



router.get('/articulos', async (req, res, next) => {

    try {

      const results = await Articles.find().exec()

      const resultsArray = Array.from(results)

      res.status(200).json(resultsArray)

      console.log('Se han recibido todos los Articulos')

    } catch (error) {

      res.status(500).json({ errormensaje: 'Error al recuperar los articulos', error: error.message });
      console.error(`Error al recuperar todos los articulos ERROR: ${error}`);
    }
  
  })


  router.get('/articulo/:uri', getArticleValidator, async (req, res) => {  

    try {
      
      const uri = req.params.uri
      
      const updatedArticle = await Articles.findOneAndUpdate({ uri: uri }, { $inc: { views: 1 } }, { new: true }).exec();
        
      if (!updatedArticle) {
        throw new Error('Articulo no encontrado');
      }
       
      res.status(200).json(updatedArticle)
      console.log('Se ha recibido un Articulo y se ha incrementado el número de vistas');

    } 
    
    catch (error) {

      if (error.message === 'Articulo no encontrado') {
        res.status(404).json({ errormensaje: error.message });
        
      } else {
        res.status(500).json({ errormensaje: 'Error al recuperar el articulo', error: error.message });
        console.log('Error al ejecutar findOne, Error: ', error)

      }
    }

  })
    
    
    
    module.exports = router;
    