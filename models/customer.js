'use strict';
const {
  Model
} = require('sequelize');
const { hashPw } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order)
    }
  }
  Customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email must be unique"
      },
      validate: {
        notNull:{
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number is required"
        },
        notNull: {
          msg: "Phone number is required"
        }
      }
    },
    identityType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Identity type is required"
        },
        notNull: {
          msg: "Identity type is required"
        }
      }
    },
    identityNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Identity number is required"
        },
        notNull: {
          msg: "Identity number is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((customer, options) => {
    customer.password = hashPw(customer.password)
  })

  return Customer;
};