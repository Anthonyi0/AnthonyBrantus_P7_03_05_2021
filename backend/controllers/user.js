//Import
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');
let jwtUtiles = require('../utiles/jwtUtiles');
let verifInput = require('../utiles/verifInput')

//Création d'un user
exports.signup = (request, response) => {
  // Valider les paramètres de la requète
  let email = request.body.email;
  let username = request.body.username;
  let password = request.body.password;
  if (email === null || username === null || password === null) {
    response.status(400).json({ error: 'il manque un paramètre' })
  }
  //Vérification des saisies user
  let emailOk = verifInput.validEmail(email);
  console.log("email = " + emailOk)
  let passwordOK = verifInput.validPassword(password);
  console.log("password = " + passwordOK)
  let usernameOk = verifInput.validUsername(username);
  console.log("username = " + usernameOk)
  if (emailOk == true && passwordOK == true && usernameOk == true) {
    //Vérification si user n'existe pas déjà = Vérifier l'email
    models.user.findOne({
      attributes: ['email'],
      where: { email: email }
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(password, 10, function (error, bcryptPassword) { //hashage *10 du password
          // Création de l'user
          const newUser = models.user.create({
            email: email,
            username: username,
            password: bcryptPassword,
            is_Admin: false
          })
          .then(newUser => { response.status(201).json({ 'id': newUser.id }) })
          .catch(error => {
            response.status(500).json({ error })
          })
        })
      }else {
        response.status(409).json({ error: 'Cette utilisateur existe déjà ' })
      }
    })
    .catch(error => { response.status(500).json({ error }) })
  }else {
    console.log('pas cette fois')
  }
};
//Login d'un user
exports.login = (request, response) => {
  //Récupération et validation des paramètres
  let email = request.body.email;
  let password = request.body.password;
  if (email == null || password == null) {
    response.status(400).json({ error: 'Il manque un paramètre' })
  }
  //Vérification si user existe
  models.user.findOne({
    where: { email: email }
  })
  .then(user => {
    if (user) {
      bcrypt.compare(password, user.password, (resComparePassword) => {
        if (resComparePassword) {
          response.status(200).json({
            userId: user.id,
            token: jwtUtiles.generateToken(user),
            isAdmin: user.is_admin
          })
        }else {
          response.status(403).json({ error: 'invalid password' });
        };
      })
    }else {
      response.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
    }
  })
  .catch(error => { response.status(500).json({ error }) })
};
