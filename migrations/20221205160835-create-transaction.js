'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users'
        }
      },
      paidStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      verificationNumber: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      name: {
        type: Sequelize.STRING
      },
      dateCheckIn: {
        type: Sequelize.STRING
      },
      dateCheckOut: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.FLOAT
      },
      address: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      totalReviews: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      features: {
        type: Sequelize.STRING
      },
      roomLeft: {
        type: Sequelize.INTEGER
      },
      freeCancelPolicy: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Transactions');
  }
};