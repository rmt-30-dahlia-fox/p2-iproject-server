'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Report, {foreignKey: "reportId"})
      Transaction.belongsTo(models.User, {foreignKey: "cashierId"})
      Transaction.hasMany(models.Cart, {foreignKey: "transactionId"})
    }
  }
  Transaction.init({
    reportId: DataTypes.INTEGER,
    cashierId: DataTypes.INTEGER,
    value: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    point: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};