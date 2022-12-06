'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receipt.init({
    sip_number: DataTypes.STRING,
    patient_name: DataTypes.STRING,
    patient_age: DataTypes.STRING,
    patient_address: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MedicineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};