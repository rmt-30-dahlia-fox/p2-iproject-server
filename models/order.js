'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Report, {foreignKey: "reportId"})
      Order.belongsTo(models.Product, {foreignKey: "productId"})
    }
  }
  Order.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    orderPrice: DataTypes.INTEGER,
    reportId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};