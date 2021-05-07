// importation des plugins
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageControle = require("../controllers/message")

//Routage
router.post("/create", auth, multer, messageControle.create);//adresse + autorisation + multer verif (type) + controleur create 
router.put("/update", auth, multer, messageControle.update)//adresse + autorisation + multer verif (type) + controleur update
router.delete("/delete", messageControle.delete)//adresse + autorisation + multer verif (type) + controleur delete 
router.get("/", auth, messageControle.listMessage);//adresse + autorisation + multer verif (type) + controleur listMessage 

//exporte
module.exports = router; 