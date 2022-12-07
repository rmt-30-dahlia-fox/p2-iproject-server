'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WantToRead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WantToRead.belongsTo(models.User)
    }
  }
  WantToRead.init({
    MangaId: {
      type :DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Manga Id is required"
        },
        notNull :{
          msg : "Manga Id is required"
        }
      }
    },
    UserId: {
      type :DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "User Id is required"
        },
        notNull :{
          msg : "User Id is required"
        }
      }
    },
    statusRead: DataTypes.BOOLEAN,
    mainPicture: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Main Picture Url is required"
        },
        notNull :{
          msg : "Main Picture Url is required"
        }
      }
    },
    title: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty :{
          msg : "Title is required"
        },
        notNull :{
          msg : "Title is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'WantToRead',
  });
  return WantToRead;
};