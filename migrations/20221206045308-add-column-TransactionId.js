'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reviews', 'TransactionId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Transactions",
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Reviews', 'TransactionId', {});
  }
};
