const Articles = require('../../models/Articles.js')
const { editArticleValidator } =  require('../../validators/Articles/editArticle.validator.js')

const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = express.Router()


router.patch('/articulo', editArticleValidator, async (req, res) => {

  try {
    
    const editedArticle = req.body.editedArticle
    const uri = editedArticle.uri
    
    const exitsArticle = await Articles.exists({ uri: uri })
    if (!exitsArticle) {
      return res.status(404).json({ mensaje: "El articulo no existe en la base de datos" });
    }

    try {
      
      await Articles.updateOne({ uri: uri}, { $set: articuloEditado }, { upsert: true})
      res.status(200).json({ mensaje: "Actualización exitosa" });
      
    } catch (error) {
      res.status(400).json({ errormensaje: 'Hubo un error al actualizar el articulo', Error: error.message })
      console.log('Ocurrio un error al actualizar un articulo', error)
    }
  } 
  
  catch (error) {
    
  }

})
  
  
  
  module.exports = router;

