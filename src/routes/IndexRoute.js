const verifyLogged = require('../middlewares/verifyLogged.js')
const verifyToken = require('../utils/verifyToken.js')
const Users = require('../models/Users.js')
const Comments =  require('../models/Comments')

const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`<h1>HOLA DESDE EL HOME</h1><a href='/login'>Login</a>
  `)
})

router.post('/saveComment', verifyLogged, async (req, res, next) => {
  
  try {
    const { comment } = req.body
    const savedCookie =  req.cookies.IL
    const verifiedToken = verifyToken(savedCookie)
    const userID = verifiedToken._id
    
  } catch (error) {
    next(error)
  }
})

module.exports = router;
