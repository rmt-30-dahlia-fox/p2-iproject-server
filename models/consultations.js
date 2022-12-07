'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultations.init({
    PatientId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER,
    drugPrice: DataTypes.INTEGER,
    consultationPrice: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    symptome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Consultations',
  });
  return Consultations;
};