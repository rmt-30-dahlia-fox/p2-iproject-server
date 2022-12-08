'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.User, {foreignKey: "cashierId"})
    }
  }
  Member.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Member Name Cannot Be Empty"}, 
        notNull: {msg: "Member Name Must Be Filled"}
      }
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Member Gender Cannot Be Empty"}, 
        notNull: {msg: "Member Gender Must Be Filled"}
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Member Email Cannot Be Empty"}, 
        notNull: {msg: "Member Email Must Be Filled"}
      }
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Member Phone Number Cannot Be Empty"}, 
        notNull: {msg: "Member Phone Number Must Be Filled"}
      }
    },
    point: DataTypes.INTEGER,
    cashierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};