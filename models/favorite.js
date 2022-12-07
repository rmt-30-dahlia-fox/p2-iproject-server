"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Favorite.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNull: { msg: "Description is required" },
          notNull: { msg: "Description is required" },
        },
      },
      urlToImage: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isNull: { msg: "urlToImage is required" },
          notNull: { msg: "urlToImage is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNull: { msg: "UserId is required" },
          notNull: { msg: "UserId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  )
  return Favorite
}
