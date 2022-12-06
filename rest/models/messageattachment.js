'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MessageAttachment.belongsTo(models.Message, {
	foreignKey: "MessageId",
      });

      MessageAttachment.belongsTo(models.Media, {
	foreignKey: "MediaId",
      });
    }
  }
  MessageAttachment.init({
      MessageId: {
        type: DataTypes.INTEGER,
	allowNull: false,
	references: {
	  model: "Messages",
	  key: "id",
	},
      },
      MediaId: {
        type: DataTypes.INTEGER,
	allowNull: false,
	references: {
	  model: "Media",
	  key: "id",
	},
      },
  }, {
    sequelize,
    modelName: 'MessageAttachment',
  });
  return MessageAttachment;
};
