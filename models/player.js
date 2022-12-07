'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.hasMany(models.MyPlayer)
    }
  }
  Player.init({
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    position: DataTypes.STRING,
    shirtNumber: DataTypes.INTEGER,
    preferredFoot: DataTypes.STRING,
    nation: DataTypes.STRING,
    proposedMarketValue: DataTypes.INTEGER,
    team: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};