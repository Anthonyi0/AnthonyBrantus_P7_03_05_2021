// importation des plugins
const express = require('express');
const router = express.Router(); 
const userControl = require('../controllers/user');  // ont crée la variable userControl pour utiliser le fichier
const auth = require('../middleware/auth'); //import du dossier auth pour vérifié que l'utilisateur à le droit de voir la page

//on crée les routes  
router.post('/signup', userControl.signup) //Adresse /signup + controllers de création du compte
router.post('/login', userControl.login)//Adresse /login + controllers de login du compte
router.get('/me', auth, userControl.userProfil)//Adresse /me + autorisation + controllers du profil
router.put('/update',auth, userControl.changePassword);//Adresse /update + autorisation  + controllers changePassword
router.delete('/delete', auth, userControl.deleteProfile);//Adresse /delete + autorisation + controllers deleteProfile

//exporte
module.exports = router