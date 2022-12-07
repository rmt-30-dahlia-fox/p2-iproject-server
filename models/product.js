'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Name Cannot Be Empty"}, 
        notNull: {msg: "Product Name Must Be Filled"}
      }
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Image Cannot Be Empty"}, 
        notNull: {msg: "Product Image Must Be Filled"}
      }
    },
    stock: DataTypes.INTEGER,
    sales: DataTypes.INTEGER,
    price: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Price Cannot Be Empty"}, 
        notNull: {msg: "Product Price Must Be Filled"}
      }
    },
    vendor: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Vendor Cannot Be Empty"}, 
        notNull: {msg: "Product Vendor Must Be Filled"}
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Status Cannot Be Empty"}, 
        notNull: {msg: "Product Status Must Be Filled"}
      }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Product Category Cannot Be Empty"}, 
        notNull: {msg: "Product Category Must Be Filled"}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};