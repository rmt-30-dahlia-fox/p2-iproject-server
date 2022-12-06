'use strict';

const { hashPass } = require("../util/crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const record = [
      {
	username: "SLIuhgskurfyg",
	email: "hello@mail.com",
	password: "hellomail",
      },
    ].map(el => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPass(el.password);
      return el;
    });

    return queryInterface.bulkInsert("Users", record);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users");
  }
};
