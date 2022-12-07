'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Dealers', 'latitude', { type: Sequelize.DOUBLE });
    await queryInterface.addColumn('Dealers', 'longitude', { type: Sequelize.DOUBLE });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Dealers', 'latitude', {});
    await queryInterface.removeColumn('Dealers', 'longitude', {});
  }
};
