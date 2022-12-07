'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientDetail.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    telephone: DataTypes.STRING,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    eyeColor: DataTypes.STRING,
    address: DataTypes.STRING,
    PatientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientDetail',
  });
  return PatientDetail;
};