"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medicine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount is required",
          },
          notEmpty: {
            msg: "Amount is required",
          },
        },
      },
      dose: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Dose is required",
          },
          notEmpty: {
            msg: "Dose is required",
          },
        },
      },
      photoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Medicine photo is required",
          },
          notEmpty: {
            msg: "Medicine photo is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Medicine",
    }
  );
  return Medicine;
};
