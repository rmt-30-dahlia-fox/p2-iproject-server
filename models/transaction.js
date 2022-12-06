'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
    }
  }
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    }, 
    paidStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    totalPrice: {
      type: DataTypes.FLOAT,
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
    modelName: 'Transaction',
  });
  return Transaction;
};