'use strict';

const { hashPw } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const customers = require('../data/customer.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    el.password = hashPw(el.password)
    return el
   });
   await queryInterface.bulkInsert('Customers', customers, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Customers', null, {});
  }
};
