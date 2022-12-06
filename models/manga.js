'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manga.hasMany(models.WantToRead)
    }
  }
  Manga.init({
    MALId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    main_picture_medium: DataTypes.STRING,
    main_picture_large: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    mean: DataTypes.DECIMAL,
    alternative_titles_synonyms: DataTypes.STRING,
    alternative_titles_en: DataTypes.STRING,
    alternative_titles_ja: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};