'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const units = require('../data/unit.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    return el
   });
   await queryInterface.bulkInsert('Units', units, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Units', null, {});
  }
};
