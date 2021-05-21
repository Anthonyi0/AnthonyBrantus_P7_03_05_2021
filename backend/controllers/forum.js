let models = require('../models');
const { Sequelize } = require('sequelize');

exports.listForum = (request, response) => {
    models.forum.findAll({
        include: {
            model: models.conversation,
            limit:5,
            include: models.user,
            order: [[Sequelize.literal('conversation.created_at'), 'DESC']],
        }
    })
        .then(forums => {

            response.status(200).json(forums);
        })
        .catch(error => {
            response.status(500).json(error);
        });
}

exports.showForum = (request, response) => {
    models.forum.findOne({
        where: {id: request.params.id }
    })
        .then(forum => {
            response.status(200).json(forum);
        })
        .catch(error => {
            response.status(404).json(error);
        })
}