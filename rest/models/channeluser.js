'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChannelUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChannelUser.belongsTo(models.User, {
	foreignKey: "UserId",
      });

      ChannelUser.belongsTo(models.Channel, {
	foreignKey: "ChannelId",
      });
    }
  }
  ChannelUser.init({
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
    modelName: 'ChannelUser',
  });
  return ChannelUser;
};
