'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFriend.belongsTo(models.User, {
	foreignKey: "UserId",
	as: "users",
      });

      UserFriend.belongsTo(models.User, {
	foreignKey: "FriendId",
	as: "friends",
      });
    }
  }
  UserFriend.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
    },
    FriendId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Users",
	key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'UserFriend',
  });
  return UserFriend;
};
