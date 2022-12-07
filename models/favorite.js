'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
<<<<<<<< HEAD:models/favorite.js
  class Favorite extends Model {
========
  class Favorites extends Model {
>>>>>>>> 9ce13e7fec5f2170bb4572fa516c5717e58e90a9:models/favorites.js
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
<<<<<<<< HEAD:models/favorite.js
  Favorite.init({
========
  Favorites.init({
>>>>>>>> 9ce13e7fec5f2170bb4572fa516c5717e58e90a9:models/favorites.js
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    urlToImage: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
<<<<<<<< HEAD:models/favorite.js
    modelName: 'Favorite',
  });
  return Favorite;
========
    modelName: 'Favorites',
  });
  return Favorites;
>>>>>>>> 9ce13e7fec5f2170bb4572fa516c5717e58e90a9:models/favorites.js
};