'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User)
    }
  }
  Wishlist.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    dateCheckIn: DataTypes.STRING,
    dateCheckOut: DataTypes.STRING, 
    city: DataTypes.STRING,
    star: DataTypes.FLOAT,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    totalReviews: DataTypes.INTEGER,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }, 
    features: DataTypes.STRING,
    roomLeft: DataTypes.INTEGER,
    freeCancelPolicy: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};