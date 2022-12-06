'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.hasMany(models.MessageAttachment, {
	foreignKey: "MessageId",
      });

      Message.belongsTo(models.User, {
	foreignKey: "UserId",
      });

      Message.belongsTo(models.Channel, {
	foreignKey: "ChannelId",
      });
    }
  }
  Message.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
	notEmpty: {
	  msg: "Content can't be empty",
	},
	notNull: {
	  msg: "Content can't be empty",
	},
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
    },
    ChannelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Channels",
	key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
