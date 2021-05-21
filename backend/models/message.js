'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user)
    }
  };
  message.init({
    userId: {
      field : 'user_id',
      type : DataTypes.INTEGER,
    },
    conversationId: {
      field: 'conversation_id',
      type: DataTypes.INTEGER
    },
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};