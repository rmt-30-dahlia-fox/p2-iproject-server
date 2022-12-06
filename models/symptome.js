'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptome extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Symptome.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Symptome',
  });
  return Symptome;
};