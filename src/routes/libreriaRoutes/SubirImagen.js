const UploadImg = require('../../models/UploadImg.js');

const dotenv = require('dotenv');
const express = require('express');
const ImageKit = require('imagekit');

dotenv.config();
const router = express.Router()


const imageKit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey,
    urlEndpoint: process.env.urlEndpoint
  })
  
  router.post('/subirimagen', (req, res, next) => {
  
    try {
  
      const filename = req.body.filename
      const base64Img = req.body.base64
  
      imageKit.upload({
        file: base64Img,
        fileName: filename,
        tags: ['tag1', 'tag2']
      }, function (error, result) {
  
        if (error) {
          res.status(400).json({ errormensaje: 'Se ha producido un error', error: error.message } || error)
          console.error('Se ha producido un error inesperado', error)
        } else {
  
          UploadImg.create({
            nombre: filename,
            imagen: result.url
          })
  
          console.log(result, 'Se ha subido correctamente la imagen')
  
          res.status(200).json({ imageURL: result.url })
        }
  
      })
  
    } catch (error) {
      next(error)
    }
  
  })
  
  


  module.exports = router;
