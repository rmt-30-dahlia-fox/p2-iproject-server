'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pickupLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pickupDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      returnLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      returnDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CustomerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      UnitId: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Orders');
  }
};