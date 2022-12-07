"use strict";
const { Model } = require("sequelize");
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
  Order.init(
    {
      pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pick up location is required",
          },
          notNull: {
            msg: "Pick up location is required",
          },
        },
      },
      pickupDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pick up date is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
      pickupTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      returnLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Return location is required",
          },
          notNull: {
            msg: "Return location is required",
          },
        },
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Return date is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
      returnTime: {
        allowNull: false,
        type: DataTypes.TIME
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "totalPrice is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CustomerId is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
      UnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "UnitId is required",
          },
          notNull: {
            msg: "Return date is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
