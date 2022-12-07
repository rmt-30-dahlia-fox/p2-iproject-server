'use strict';
const Password = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataUser = require('../data.json').Users.map(el => {
      el.password = Password.hashPass(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Users", dataUser)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
