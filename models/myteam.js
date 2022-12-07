'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyTeam.belongsTo(models.User, {foreignKey: 'ManagerId', as: 'Manager'})
      MyTeam.hasMany(models.MyPlayer, {foreignKey: 'TeamId'})
    }
  }
  MyTeam.init({
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
    logo: DataTypes.STRING,
    ManagerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ManagerId is required"
        },
        notNull: {
          msg: "ManagerId is required"
        }
      }
    },
    wealth: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyTeam',
  });
  return MyTeam;
};