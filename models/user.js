'use strict';
const Password = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Member, {foreignKey: "cashierId"})
      User.hasMany(models.History, {foreignKey: "userId"})
    }
  }
  User.init({
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "User Name Cannot Be Empty"}, 
        notNull: {msg: "User Name Must Be Filled"}
      }
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "User Full Name Cannot Be Empty"}, 
        notNull: {msg: "User Full Name Must Be Filled"}
      }
    },
    photo: DataTypes.STRING,
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "User Role Cannot Be Empty"}, 
        notNull: {msg: "User Role Must Be Filled"}
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "User Password Cannot Be Empty"}, 
        notNull: {msg: "User Password Must Be Filled"}
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "User Email Cannot Be Empty"}, 
        notNull: {msg: "User Email Must Be Filled"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    return instance.password = Password.hashPass((instance.password))
  })
  return User;
};