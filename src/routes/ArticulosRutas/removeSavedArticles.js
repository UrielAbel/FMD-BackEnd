const Users = require('../../models/Users.js')
const Articles = require('../../models/Articles.js')
const { removeSavedArticleValidator } = require('../../validators/Articles/removeSavedArticle.validator.js')

const verifyLogged = require('../../middlewares/verifyLogged.js')
const verifyToken = require('../../utils/verifyToken.js')

const express = require('express');
const router = express.Router()

router.patch('/removeSavedArticle', verifyLogged, removeSavedArticleValidator, async (req, res, next) => {
  
  try {
    const { articleUri } = req.body
    const savedCookie = req.cookies.IL;
    const verifiedToken = verifyToken(savedCookie);
    const userID = verifiedToken._id;

   const foundArticle = await Articles.findOne({ uri: articleUri }).select('_id')

   if (!foundArticle) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'No se encontro un articulo con ese uri' })
   }
   if(!foundArticle._id) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'el articulo recibido no contiene un _id' })
   }

   const articleID = foundArticle._id

   const savedArticles = await Users.findById(userID).select('savedArticles')

   if (!savedArticles.savedArticles.includes(articleID)) {
    return res.status(404).json({ updatedUser: false, errorMessage: 'El usuario no guardo ese Articulo' })
   }

   const updatedUser = await Users.findByIdAndUpdate(userID, { $pull: { savedArticles: articleID } }, { new: true })
   
   res.status(200).json({ updatedUser: true, updatedUser: updatedUser })

  } catch (error) {
    next(error)
  }
})

module.exports = router;
