'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require('../util/crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Media, {
	foreignKey: "AvatarId",
      });

      User.hasMany(models.Post, {
	foreignKey: "UserId",
      });

      User.hasMany(models.UserFriend, {
	foreignKey: "UserId",
	as: "users",
      });

      User.hasMany(models.UserFriend, {
	foreignKey: "FriendId",
	as: "friends",
      });

      User.hasMany(models.ChannelUser, {
	foreignKey: "UserId",
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: {
	  msg: "Username can't be empty",
	},
	notEmpty: {
	  msg: "Username can't be empty",
	},
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
	notNull: {
	  msg: "Email can't be empty",
	},
	notEmpty: {
	  msg: "Email can't be empty",
	},
	isEmail: {
	  msg: "Invalid email format",
	},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    AvatarId: {
      type: DataTypes.INTEGER,
      references: {
	model: "Medias",
	key: "id"
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate("hashPassword", (user, opts) => {
    user.password = hashPass(user.password);
  });

  return User;
};
