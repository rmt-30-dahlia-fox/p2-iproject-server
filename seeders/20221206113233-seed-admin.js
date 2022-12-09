'use strict';

const { hashPw } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const admins = require('../data/admin.json').map(el => {
    el.createdAt = el.updatedAt = new Date()
    el.password = hashPw(el.password)
    return el
   });
   
   await queryInterface.bulkInsert('Admins', admins, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Admins', null, {});
  }
};
