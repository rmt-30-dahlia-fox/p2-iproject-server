'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dealer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dealer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Dealer name is required'
        },
        notEmpty: {
          msg: 'Dealer name is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dealer address is required'
        },
        notEmpty: {
          msg: 'Dealer address is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'City is required'
        },
        notEmpty: {
          msg: 'City is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number is required'
        },
        notEmpty: {
          msg: 'Phone number is required'
        }
      }
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Latitude is required'
        },
        notEmpty: {
          msg: 'Latitude is required'
        }
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Longitude is required'
        },
        notEmpty: {
          msg: 'Longitude is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Dealer',
  });
  return Dealer;
};