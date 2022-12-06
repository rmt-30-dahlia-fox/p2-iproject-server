'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Car);
      Review.belongsTo(models.User);
      Review.belongsTo(models.Transaction);
    }
  }
  Review.init({
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
          msg: 'Car is required'
        },
        notEmpty: {
          msg: 'Car is required'
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Review message is required'
        },
        notEmpty: {
          msg: 'Review message is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};