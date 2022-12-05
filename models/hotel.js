'use strict';
const {
  Model
} = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Wishlist)
      Hotel.hasMany(models.Transaction)
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    star: DataTypes.FLOAT,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    totalReviews: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    features: DataTypes.STRING,
    roomLeft: DataTypes.INTEGER,
    freeCancelPolicy: DataTypes.BOOLEAN,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};