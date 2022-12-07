'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyPlayer.belongsTo(models.MyTeam, {foreignKey: 'TeamId', as: 'Team'})
      MyPlayer.belongsTo(models.Player)
    }
  }
  MyPlayer.init({
    TeamId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyPlayer',
  });
  return MyPlayer;
};