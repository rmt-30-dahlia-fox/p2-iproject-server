'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostAttachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
	allowNull: false,
	references: {
	  model: "Posts",
	  key: "id",
	},
	onDelete: "CASCADE",
      },
      MediaId: {
        type: Sequelize.INTEGER,
	allowNull: false,
	references: {
	  model: "Media",
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
    await queryInterface.dropTable('PostAttachments');
  }
};
