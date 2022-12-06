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
      User.belongsTo(models.Badge)
      User.hasMany(models.Activity)
      User.hasMany(models.Like)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    city: DataTypes.STRING,
    imageProfile: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BadgeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};