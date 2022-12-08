'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.Transaction);
      Car.hasMany(models.Review);
    }
  }
  Car.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Car name is required'
        },
        notEmpty: {
          msg: 'Car name is required'
        }
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car image is required'
        },
        notEmpty: {
          msg: 'Car image is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car price is required'
        },
        notEmpty: {
          msg: 'Car price is required'
        },
        min: {
          args: 100000000,
          msg: "Price must be higher than 100.000.000"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car description is required'
        },
        notEmpty: {
          msg: 'Car description is required'
        }
      }
    },
    specification: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car specification is required'
        },
        notEmpty: {
          msg: 'Car specification is required'
        }
      }
    },
    brand: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Car brand is required'
        },
        notEmpty: {
          msg: 'Car brand is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};