"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserDetail)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      role: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Role is required" },
          notEmpty: { msg: "Role is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
