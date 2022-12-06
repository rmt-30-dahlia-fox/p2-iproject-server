'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WantToRead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WantToRead.belongsTo(models.User)
      WantToRead.belongsTo(models.Manga)
    }
  }
  WantToRead.init({
    MangaId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    statusRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WantToRead',
  });
  return WantToRead;
};