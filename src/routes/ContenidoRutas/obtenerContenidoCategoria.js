const Articles = require('../../models/Articles.js')
const Podcasts = require('../../models/Podcasts.js')
const express = require('express')


const router = express.Router()


router.get('/contenido/category/:category', (req, res, next) => {
 
    try {
      const category = req.params.category
      const regex = new RegExp(`\\b${category}\\b`, 'i');


      const promesaArticulos = Articles.find({ category: regex })

      const promesaPodcasts = Podcasts.find({ category: regex })

      Promise.all([promesaArticulos, promesaPodcasts])
      .then(resultados => {
        const articulosEncontrados = resultados[0];
        const podcastsEncontrados = resultados[1];

        if (articulosEncontrados.length === 0 && podcastsEncontrados.length === 0) {
          res.status(404).json({ mensaje: `No se han encontrado resultados para: ${category}` });
        } else {
          res.status(200).json({ articulosEncontrados, podcastsEncontrados });
        }
      })
      .catch(error => {
        res.status(500).json({ errormensaje: `Ocurrió un error en el servidor: ${error.message}` });
        console.log(error);
      });


    } catch (error) {
      next(error)
    }
  
  })


module.exports = router;
