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
      bcrypt.compare(password, user.password, (errorComparePassword,responseComparePassword) => {
        if (responseComparePassword) {
          response.status(200).json({
            userId: user.id,
            token: jwtUtiles.generateToken(user),
            is_admin: user.is_admin
          })
        }else {
          response.status(403).json({ error: 'invalid password' });
        };
      })
    }else {
      response.status(404).json({ 'erreur': "Cet utilisateur n'existe pas" })
    }
  })
  .catch(error => { response.status(500).json({ error }) })
};
//Profil d'un user
exports.userProfil = (request, response) => {
  let id = jwtUtiles.getUserId(request.headers.authorization)
  models.user.findOne({
    attributes: ['id', 'email', 'username','is_admin'],
    where: { id: id }
  })
  .then(user => response.status(200).json(user))
  .catch(error => response.status(500).json(error))
};
//modification d'un profil
exports.changePassword = (request, response) => {
  //Récupère l'id de l'user et le nouveau password
  let userId = jwtUtiles.getUserId(request.headers.authorization);
  const newPassword = request.body.newPassword;
  console.log(newPassword)
  //Vérification regex du nouveau mot de passe
  console.log('admin', verifInput.validPassword(newPassword))
  if (verifInput.validPassword(newPassword)) {
    //Vérifie qu'il est différent de l'ancien
    models.user.findOne({
    where: { id: userId }
    })
    .then(user => {
      console.log('user trouvé', user)
      bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
        //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
        if (resComparePassword) {
          response.status(406).json({ error: 'Vous avez entré le même mot de passe' })
        }else {
          bcrypt.hash(newPassword, 10, function (error, bcryptNewPassword) {
            models.user.update(
              { password: bcryptNewPassword },
              { where: { id: user.id } }
            )
            .then(() => response.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
            .catch(error => response.status(500).json(error))
          })
        }
      })
    })
    .catch(error => json(error))
  }else {
    response.status(406).json({ error: 'mot de passe non valide' })
  }
}
//Suppression d'un compte
exports.deleteProfile = (request, response) => {
  //récupération de l'id de l'user
  let userId = jwtUtiles.getUserId(request.headers.authorization);
  if (userId != null) {
    //Recherche sécurité si user existe bien
    models.user.findOne({
      where: { id: userId }
    })
    .then(user => {
      if (user != null) {
        //Delete de tous les posts de l'user 
        models.Post.destroy({
          where: { userId: user.id }
        })
        .then(() => {
          console.log('Tous les posts de cet user ont été supprimé');
          //Suppression de l'utilisateur
          models.user.destroy({
            where: { id: user.id }
          })
          .then(() => response.end())
          .catch(error => console.log(error))
        })
        .catch(error => response.status(500).json(error))
      }else {
        response.status(401).json({ error: "Cet user n'existe pas" })
      }
    })
  }else {
    response.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
  }
}