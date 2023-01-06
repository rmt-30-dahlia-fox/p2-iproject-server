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
	as: "users",
      });

      Message.belongsTo(models.User, {
	foreignKey: "RecipientId",
	as: "recipients",
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
    },
    RecipientId: {
      type: DataTypes.INTEGER,
      references: {
	model: "Users",
	key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
