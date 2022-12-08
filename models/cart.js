'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Transaction, {foreignKey: "transactionId"})
      Cart.belongsTo(models.Product, {foreignKey: "productId"})
    }
  }
  Cart.init({
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};