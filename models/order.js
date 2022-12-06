'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Pick up location is required"
        },
        notNull: {
          msg: "Pick up location is required"
        }
      }
    },
    pickupDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Pick up date is required"
        },
        notNull: "Pick up date is required"
      }
    },
    returnLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Return location is required"
        },
        notNull: "Return location is required"
      }
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Return date is required"
        },
        notNull: "Return date is required"
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "totalPrice is required"
        },
        notNull: "totalPrice is required"
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Status is required"
        },
        notNull: "Status is required"
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "CustomerId is required"
        },
        notNull: "CustomerId is required"
      }
    },
    UnitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "UnitId is required"
        },
        notNull: "UnitId is required"
      }
    }, 
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};