const UploadImg = require('../../models/UploadImg.js');

const dotenv = require('dotenv');
const express = require('express')

dotenv.config();
const router = express.Router()



router.get('/obtenerlibreria', (req, res, next) => {
    
    try {
  
      UploadImg.find().exec()
        .then(results => {
          const resultsArray = Array.from(results)
          res.status(200).json(resultsArray)
          console.log('Se han recibido todos los datos de la libreria')
        })
        .catch(error => {
          res.status(400).json({ errormensaje: 'Error al recuperar la libreria', error: error.message })
          console.log(`Error al recuperar la libreria ERROR: ${error}`)
        });
  
    } catch (error) {
      next(error)
    }
  
  })



  module.exports = router;
