const Articles = require('../../models/Articles.js')
const { deleteArticleValidator } = require('../../validators/Articles/deleteArticle.validator.js')

const express = require('express')
const router = express.Router()


router.delete('/articulo', deleteArticleValidator, async (req, res, next) => {

    try { 
  
    const uri = req.body.uri

    const deletedArticle = await Articles.findOneAndDelete({uri: uri})

    if (deletedArticle) {
      res.status(200).json({mensaje: 'Articulo eliminado exitosamente'})
      console.log('Se ha eliminado un Articulo');

    } else {
      res.status(404).json({ errormensaje: `No se encontró el articulo con el uri: ${uri} especificado`})
    }
  
  }
  catch (error) {
    res.status(500).json({ errormensaje: 'Hubo un error al eliminar el articulo', error: error.message });  }
    console.error('Error al ejecutar findOneAndDelete:', error);
  })


  module.exports = router;
