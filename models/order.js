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
    }
  }
  Order.init({
    pickupLocation: DataTypes.STRING,
    pickupDate: DataTypes.DATE,
    returnLocation: DataTypes.STRING,
    returnDate: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER,
    UnitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};