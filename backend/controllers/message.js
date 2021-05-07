//Import
let models = require('../models');
let jwtUtiles = require('../utiles/jwtUtiles');
const fs = require('fs');

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
    .then(user => {
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
                models.message.create({
                    content: content,
                    attachement: attachmentURL,
                    UserId: user.id
                })
                .then((newMessage) => {
                    response.status(201).json(newMessage)
                })
                .catch((error) => {
                    response.status(500).json(error)
                })
            };
        } else {
            response.status(400).json(error);
        }
    })
    .catch(error => response.status(500).json(error));
}
//Afficher les messages sur le mur
exports.listMessage = (request, response) => {
    models.message.findAll({
        include: [{
            model: models.user,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
    .then(message => {
        if (message.length > null) {
            response.status(200).json(message)
        } else {
            response.status(404).json({ error: 'Pas de message à afficher' })
        }
    })
    .catch(error => response.status(500).json(error))
}
//Suppression d'un message
exports.delete = (request, response) => {
    //request => userId, messageId, user.is_admin
    let userOrder = request.body.userIdOrder;
    //identification du demandeur
    let id = jwtUtiles.getUserId(request.headers.authorization)
    models.user.findOne({
        attributes: ['id', 'email', 'username', 'is_admin'],
        where: { id: id }
    })
    .then(user => {
        //Vérification que le demandeur est soit l'admin soit le Poster (vérif aussi sur le front)
        if (user && (user.is_admin == true || user.id == userOrder)) {
            console.log('Suppression du message id :', request.body.messageId);
            models.message.findOne({
                 where: { id: request.body.messageId }
            })
            .then((messageFind) => {
                if (messageFind.attachement) {
                    const filename = messageFind.attachement.split('/images/')[1];
                    console.log("test", filename);
                    fs.unlink(`images/${filename}`, () => {
                        models.message.destroy({
                            where: { id: messageFind.id }
                        })
                        .then(() => response.end())
                        .catch(error => response.status(500).json(error))
                    })
                } else {
                    models.message.destroy({
                        where: { id: messageFind.id }
                    })
                    .then(() => response.end())
                    .catch(error => response.status(500).json(error))
                }
            })
            .catch(error => response.status(500).json(error))
        } else { response.status(403).json('Utilisateur non autorisé à supprimer ce message') }
    })
    .catch(error => response.status(500).json(error));
};
//Modification d'un message
exports.update = (request, response) => {
    //récupération de l'id du demandeur pour vérification
    let userOrder = request.body.userIdOrder;
    //identification du demandeur
    let id = jwtUtiles.getUserId(request.headers.authorization);
    models.user.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
    .then(user => {
        //Vérification que le demandeur est soit l'admin soit le Poster (vérif aussi sur le front)
        if (user && (user.is_admin == true || user.id == userOrder)) {
            console.log('Modif ok pour le message :', request.body.messageId);
            models.message.update({
                    content: request.body.newText,
                    attachement: request.body.newImg
            },
                { where: { id: request.body.messageId } }
            )
            .then(() => response.end())
            .catch(error => response.status(500).json(error))
        }else {
            response.status(401).json({ error: 'Utilisateur non autorisé à modifier ce message' })
        }
    })
    .catch(error => response.status(500).json(error));
}