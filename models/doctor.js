"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Fullname is required",
          },
          notEmpty: {
            msg: "Fullname is required",
          },
        },
      },
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      specialization: DataTypes.STRING,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
