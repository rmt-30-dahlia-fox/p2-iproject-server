'use strict';
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
      User.hasMany(models.WantToRead)
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "email is required"
        },
        notNull :{
          msg : "email is required"
        },
        isEmail : {
          msg : "Invalid email format"
        }
      }
    },
    password: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "password is required"
        },
        notNull :{
          msg : "password is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};