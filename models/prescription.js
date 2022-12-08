"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prescription.belongsTo(models.Medicine);
      Prescription.belongsTo(models.User);
    }
  }
  Prescription.init(
    {
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Patient name is required",
          },
          notEmpty: {
            msg: "Patient name is required",
          },
        },
      },
      patient_age: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Patient age is required",
          },
          notEmpty: {
            msg: "Patient age is required",
          },
        },
      },
      patient_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Patient address is required",
          },
          notEmpty: {
            msg: "Patient address is required",
          },
        },
      },
      use_description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Use description is required",
          },
          notEmpty: {
            msg: "Use description is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Users is required",
          },
          notEmpty: {
            msg: "Users is required",
          },
        },
      },
      MedicineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Medicines is required",
          },
          notEmpty: {
            msg: "Medicines is required",
          },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prescription",
    }
  );
  Prescription.beforeCreate((prescriptions, options) => {
    prescriptions.status = "unclaimed";
  });
  return Prescription;
};
