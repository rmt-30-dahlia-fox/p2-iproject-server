'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
	allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
	allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
	allowNull: false,
	references: {
	  model: "Users",
	  key: "id",
	},
      },
      RecipientId: {
        type: Sequelize.INTEGER,
	references: {
	  model: "Users",
	  key: "id",
	},
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};
