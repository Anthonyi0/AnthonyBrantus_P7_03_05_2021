//Import
let models = require('../models');
let jwtUtiles = require('../utiles/jwtUtiles');
const fs = require('fs'); //permet de naviger dans les dossiers 

//Création d'un message
exports.create = (request, response) => {
    //Declaration de l'url de l'image
    let attachmentURL
    //identifier qui créé le message
    let id = jwtUtiles.getUserId(request.headers.authorization)
    models.user.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
    .then(user => { //promise 
        if (user !== null) {
            //Récupération du corps du message
            let content = request.body.content;
            if (request.file != undefined) {
                attachmentURL = `${request.protocol}://${request.get('host')}/images/${request.file.filename}`;
            }else {
                attachmentURL == null
            };
            if ((content == 'null' && attachmentURL == null)) {
                response.status(400).json({ error: 'Rien à publier' })
            } else {
                models.message.create({ //permet de crée le message grâce au model
                    content: content,
                    attachement: attachmentURL,
                    UserId: user.id
                })
                .then((newMessage) => { //promise de newmessage
                    response.status(201).json(newMessage)
                })
                .catch((error) => { //catch en cas d'erreur 
                    response.status(500).json(error)
                })
            };
        } else {
            response.status(400).json(error);
        }
    })
    .catch(error => response.status(500).json(error)); //catch en cas d'erreur 
}
//Afficher les messages sur le mur
exports.listMessage = (request, response) => {
    models.message.findAll({ //cherche les message grâce au model 
        include: [{
            model: models.user,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
    .then(message => { //promise réponse 
        if (message.length > null) { //si la longeur du message est plus grand que null 
            response.status(200).json(message) //Status 200 car tout est okais 
        } else {
            response.status(404).json({ error: 'Pas de message à afficher' }) // aucun message à montrer donc error 
        }
    })
    .catch(error => response.status(500).json(error)) //catch en cas d'erreur 
}
//Suppression d'un message
exports.delete = (request, response) => {
    //request => userId, messageId, user.is_admin
    let userOrder = request.body.userIdOrder;
    //identification du demandeur
    let id = jwtUtiles.getUserId(request.headers.authorization) //ont à besoin de l'authorization 
    models.user.findOne({ //chercher le user grâce au model
        attributes: ['id', 'email', 'username', 'is_admin'],
        where: { id: id }
    })
    .then(user => { //promise du user
        //Vérification que le demandeur soit l'admin et soit le Poster (vérif aussi sur le front)
        if (user && (user.is_admin == true || user.id == userOrder)) { 
            console.log('Suppression du message id :', request.body.messageId); //suppression du message avec l'id : 
            models.message.findOne({ //recherche le message grâce au models 
                 where: { id: request.body.messageId }
            })
            .then((messageFind) => { //promise messageFInd
                if (messageFind.attachement) { //si le message trouver à une image 
                    const filename = messageFind.attachement.split('/images/')[1]; //on prend l'image ont split le /images/
                    console.log("test", filename); //on test le filename
                    fs.unlink(`images/${filename}`, () => { //grâce au plugin fs on cherche 
                        models.message.destroy({ //grâce au models on destroy 
                            where: { id: messageFind.id }
                        })
                        .then(() => response.end()) //promise de réussite 
                        .catch(error => response.status(500).json(error)) //catch si problème 
                    })
                } else {
                    models.message.destroy({ // si pas d'image ont prend que le message (grâce au model) et ont destroy 
                        where: { id: messageFind.id }
                    })
                    .then(() => response.end()) //promise de réussite 
                    .catch(error => response.status(500).json(error)) //catch en cas d'erreur 
                }
            })
            .catch(error => response.status(500).json(error)) //catch en cas d'erreur 
        } else { response.status(403).json('Utilisateur non autorisé à supprimer ce message') } // na pas le droit de supprimé 
    })
    .catch(error => response.status(500).json(error)); //catch en cas d'erreur 
};
//Modification d'un message
exports.update = (request, response) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = request.body.userIdOrder;
    //identification du demandeur
    let id = jwtUtiles.getUserId(request.headers.authorization); // besoin d'authorization 
    models.user.findOne({ //grâce au model user on cherche l'user 
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
    .then(user => { //promise user 
        //Vérification que le demandeur soit l'admin et soit le Poster (vérif aussi sur le front)
        if (user && (user.is_admin == true || user.id == userOrder)) {
            console.log('Modif ok pour le message :', request.body.messageId); //vérif de l'id message 
            models.message.update({ //grâce au model on update le message 
                    content: request.body.newText, //contenue
                    attachement: request.body.newImg //et image
            },
                { where: { id: request.body.messageId } }
            )
            .then(() => response.end()) //promise si réussis 
            .catch(error => response.status(500).json(error)) //catch si erreur 
        }else {
            response.status(401).json({ error: 'Utilisateur non autorisé à modifier ce message' }) //interdiction car pas d'autorisation 
        }
    })
    .catch(error => response.status(500).json(error)); //catch en cas d'erreur 
}