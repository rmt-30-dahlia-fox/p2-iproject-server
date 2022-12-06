'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MessageAttachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MessageId: {
        type: Sequelize.INTEGER,
	allowNull: false,
	references: {
	  model: "Messages",
	  key: "id",
	},
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
    await queryInterface.dropTable('MessageAttachments');
  }
};
