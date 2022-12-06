'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostAttachment.belongsTo(models.Post, {
	foreignKey: "PostId",
      });

      PostAttachment.belongsTo(models.Media, {
	foreignKey: "MediaId",
      });
    }
  }
  PostAttachment.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Posts",
	key: "id",
      },
    },
    MediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
	model: "Media",
	key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'PostAttachment',
  });
  return PostAttachment;
};
