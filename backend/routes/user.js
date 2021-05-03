// importation des plugins
const express = require('express');
const router = express.Router(); 
const userControl = require('../controllers/user');  // ont crée la variable userControl pour utiliser le fichier

//on crée les routes  
router.post('/signup', userControl.signup)
router.post('/login', userControl.login)

module.exports = router