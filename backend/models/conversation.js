'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        static associate(models) {
            this.belongsTo(models.forum)
            this.hasMany(models.message)
            this.belongsTo(models.user)
        }
    }

    Conversation.init({
        forumId: {
            field : 'forum_id',
            type : DataTypes.INTEGER,
        },
        userId: {
            field : 'user_id',
            type : DataTypes.INTEGER,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        },
        title: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        tableName: 'conversation',
        modelName: 'conversation',
    })

    return Conversation;
}