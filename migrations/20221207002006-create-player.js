'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      height: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shirtNumber: {
        type: Sequelize.INTEGER
      },
      preferredFoot: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      proposedMarketValue: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      team: {
        allowNull: false,
        type: Sequelize.STRING
      },
      profile: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Players');
  }
};