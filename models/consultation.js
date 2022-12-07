'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Consultation.init({
    UserId: DataTypes.INTEGER,
    DiseaseId: DataTypes.INTEGER,
    drugPrice: DataTypes.INTEGER,
    consultationPrice: DataTypes.INTEGER,
    AppointmentId: DataTypes.INTEGER,
    SymptomeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Consultation',
  });
  return Consultation;
};