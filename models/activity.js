'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.hasMany(models.Like)
      Activity.belongsTo(models.User)
      Activity.belongsTo(models.Type)
      Activity.belongsTo(models.Difficulty)
    }
  }
  Activity.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageActivity: DataTypes.TEXT,
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Caption is required'
        },
        notEmpty: {
          msg: 'Caption is required'
        }
      }
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type is required'
        },
        notEmpty: {
          msg: 'Type is required'
        }
      }
    },
    DifficultyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Difficulty is required'
        },
        notEmpty: {
          msg: 'Difficulty is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};