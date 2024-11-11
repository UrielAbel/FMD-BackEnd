const Articles = require('../../models/Articles.js')
const { createArticleValidator } = require('../../validators/Articles/createArticle.validator.js')

const express = require('express');
const router = express.Router()

router.post('/articulo', createArticleValidator, async (req, res, next) => {

    try {
        
      const { title, description, imageUrl, category, author, CDNurl } = req.body
      
      const { nanoid } = await import('nanoid');
      const uri = nanoid(8)

      try {

        const createdArticle = await Articles.create({
          title: title,
          description: description,
          imageUrl: imageUrl,
          category: category,
          uri: uri,
          CDNurl: CDNurl,
          author: author,
          views: 0
        })
        
        res.status(201).json({mensaje: 'Articulo creado exitosamente!', article: createdArticle})
        console.log('Articulo creado exitosamente!!', createdArticle)
        
      } catch (error) {
        res.status(400).json({ errormensaje: 'Ha ocurrido un error al crear el Articulo', Error: error.message })
        console.log('Error al crear un articulo', error)
      }
        
    } catch (error) {
      next(error)
    }
  
  })

module.exports = router;
