'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.hasOne(models.User, {
	foreignKey: "AvatarId",
	as: "Avatar"
      });

      Media.hasMany(models.PostAttachment, {
	foreignKey: "MediaId",
      });

      Media.hasMany(models.MessageAttachment, {
	foreignKey: "MediaId",
      });
    }
  }
  Media.init({
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      },
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
	notNull: true,
	notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};
