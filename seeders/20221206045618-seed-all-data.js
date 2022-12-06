'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', require('../data/data.json').user.map(el=>{
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
    await queryInterface.bulkInsert('Cars', require('../data/data.json').car.map(el=>{
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
    await queryInterface.bulkInsert('Dealers', require('../data/data.json').dealer.map(el=>{
      el.createdAt = el.updatedAt = new Date();
      return el;
    }));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Cars', null, {});
    await queryInterface.bulkDelete('Dealers', null, {});
  }
};
