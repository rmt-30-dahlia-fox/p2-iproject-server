"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderHistory.init(
    {
      UserId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      price: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderHistory",
    }
  );
  return OrderHistory;
};
