let models = require('../models');
const jwtUtiles = require("../utiles/jwtUtiles");

exports.listConversations = (request, response) => {
    models.conversation.findAll({
    })
        .then(conversations => {
            response.status(200).json(conversations);
        })
        .catch(error => {
            response.status(500).json(error);
        });
}

exports.showConversation = (request, response)  => {
    models.conversation.findOne({
        include: {
            model: models.message,
            include: models.user
        },
        where: {id: request.params.id }
    })
        .then(conversation => {
            if(null === conversation) {
                return response.status(404).json({});
            }
            response.status(200).json(conversation);
        })
        .catch(error => {
            response.status(404).json(error);
        })
};

exports.createConversation = (request, response) => {
    let userId = jwtUtiles.getUserId(request.headers.authorization) //ont à besoin de l'authorization

    models.conversation.create({
        title: request.body.title,
        forumId: request.body.forum_id,
        userId: userId
    })
        .then(conversation => {
            models.message.create({
                conversationId: conversation.id,
                content: request.body.content,
                userId: userId
            })
            response.status(201).json(conversation);
        }).catch(error => {
            response.status(400).json({});
        })
};

exports.deleteConversation = (request, response) => {
    let userId = jwtUtiles.getUserId(request.headers.authorization) //ont à besoin de l'authorization


    models.conversation.findOne({
        where: {id: request.params.id }
    }).then((conversation) => {

        if (userId !== conversation.dataValues.userId) {
            response.status(401).json({});
        }

        models.conversation.destroy({
            where: { id: request.params.id }
        })
            .then(() => response.status(204).json({})) //promise de réussite
            .catch(error => response.status(500).json(error))
    })
}