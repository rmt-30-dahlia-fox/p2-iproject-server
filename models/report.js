'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.hasMany(models.Transaction, {foreignKey: "reportId"})
      Report.hasMany(models.Order, {foreignKey: "reportId"})
    }
  }
  Report.init({
    code: DataTypes.STRING,
    creditValue: DataTypes.INTEGER,
    debitValue: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    products: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};