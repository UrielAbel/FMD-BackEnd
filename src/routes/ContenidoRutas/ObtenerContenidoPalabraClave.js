const Articles = require('../../models/Articles.js')
const Podcasts = require('../../models/Podcasts.js')
const express = require('express')


const router = express.Router()


router.get('/contenido/palabraClave/:palabraclave', (req, res, next) => {
 
    try {
      const palabraClave = req.params.palabraclave
      const regex = new RegExp(`\\b${palabraClave}\\b`, 'i');


      const promesaArticulos = Articles.find({
        $or: [
          { title: regex },
          { description: regex },
          { category: regex }
        ]
      })

      const promesaPodcasts = Podcasts.find({
        $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { subCategory: { $in: [regex] } },
        { 'episodes.title': regex },
        { 'episodes.description': regex },
        { 'autor.name': regex }
      ]
      })

      Promise.all([promesaArticulos, promesaPodcasts])
      .then(resultados => {
        const articulosEncontrados = resultados[0];
        const podcastsEncontrados = resultados[1];

        if (articulosEncontrados.length === 0 && podcastsEncontrados.length === 0) {
          res.status(404).json({ mensaje: `No se han encontrado resultados para: ${palabraClave}` });
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
