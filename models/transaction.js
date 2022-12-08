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
      Transaction.belongsTo(models.Car);
      Transaction.belongsTo(models.User);
      Transaction.hasOne(models.Review);
    }
  }
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User is required'
        },
        notEmpty: {
          msg: 'User is required'
        }
      }
    },
    CarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User is required'
        },
        notEmpty: {
          msg: 'User is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Transaction status is required'
        },
        notEmpty: {
          msg: 'Transaction status is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};