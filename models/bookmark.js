'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Movie);
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    MovieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });

  Bookmark.beforeCreate((bookmark) => {
    bookmark.status = "Unwatched";
  });

  return Bookmark;
};
