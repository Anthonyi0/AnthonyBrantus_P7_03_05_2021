'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Forum extends Model {
        static associate(models) {
            this.hasMany(models.conversation)
        }
    }

    Forum.init({

        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        tableName: 'forum',
        modelName: 'forum',
    })

    return Forum;
}