const Users = require('../../models/Users');
const Articles = require('../../models/Articles')

const { saveArticlesValidator } = require('../../validators/Articles/saveArticles.validator')
const verifyLogged = require('../../middlewares/verifyLogged.js')
const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const Podcasts = require('../../models/Podcasts.js');
const router = express.Router()


router.post('/saveArticle', saveArticlesValidator, verifyLogged, async (req, res, next) => {

    try {
        const { articleUri } = req.body

        
        const savedCookie = req.cookies.IL
        
        const verifiedToken =  verifyToken(savedCookie)
        const userID = verifiedToken._id
        
        const articleID = await Articles.findOne({ uri: articleUri}).select('_id')
        
        if (!articleID) {
            return res.status(401).json({ updatedUser: false, errorMessage: 'No se encontro un articulo con ese uri' })
        }

        const user = await Users.findById(userID).select('savedArticles')

        const articleExists = user.savedArticles.some(savedArticle => savedArticle.equals(articleID._id));

        
        if (articleExists) {
            return res.status(404).json({updatedUser: false, errorMessage: 'Este usuario ya ha guardado este articulo' })
        }

        const updatedUser = await Users.findByIdAndUpdate(userID, {$push: { savedArticles: articleID }}, { new: true })

        if(!updatedUser) {
            return res.status(400).json({ updatedUser: false, errorMessage: 'Error al actualizar el usuario', Error: error.message })
        }

        res.status(200).json({ updatedUser: true, message: 'Se ha actualizado el uusario correctamente' })

    } catch (error) {
        next(error) 
    }

})




module.exports = router