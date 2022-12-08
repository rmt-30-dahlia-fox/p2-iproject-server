'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
	foreignKey: "UserId",
	as: "users"
      });

      Post.hasMany(models.PostAttachment, {
	foreignKey: "PostId",
      });
    }
  }
  Post.init({
    content: {
        type: DataTypes.TEXT,
	allowNull: false,
	validate: {
	  notNull: {
	    msg: "Content can't be empty",
	  },
	  notEmpty: {
	    msg: "Content can't be empty",
	  },
	}
      },
    likeCount: {
        type: DataTypes.INTEGER,
	defaultValue: 0,
      },
    UserId: {
        type: DataTypes.INTEGER,
	allowNull: false,
	references: {
	  model: "Users",
	  key: "id",
	},
      },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
