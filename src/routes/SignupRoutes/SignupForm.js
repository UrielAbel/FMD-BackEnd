const express = require('express');
const router = express.Router()

router.get('/registro', (req, res) => {

    res.send(`
  <form action="/registro" method="POST">

    <label for="nombre">NOMBRE</label>
    <input type="text" id="ueserName" name="userName" required>

    
    <label for="email">EMAIL</label>
    <input type="text" id="email" name="email" required>
    
    <label for="password">CONTRASEÑA:</label>
    <input type="text" id="password" name="password" required>

    
    <label for="confirmPassword">REPETIR CONTRASEÑA:</label>
    <input type="text" id="confirmPassword" name="confirmPassword" required>

    <button type="submit">SIGNUP</button>
  </form>
`);
})

module.exports = router