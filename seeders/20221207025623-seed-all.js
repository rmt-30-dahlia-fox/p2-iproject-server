'use strict';

const { hashPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const difficulties = require('../data/data.json').difficulties
    .map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const types = require('../data/data.json').types
    .map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const badges = require('../data/data.json').badges
    .map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })

    const users = require('../data/data.json').users
    .map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPass(el.password)
      return el
    })

    await queryInterface.bulkInsert('Difficulties', difficulties, {})
    await queryInterface.bulkInsert('Types', types, {})
    await queryInterface.bulkInsert('Badges', badges, {})
    await queryInterface.bulkInsert('Users', users, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Badges', null, {});
    await queryInterface.bulkDelete('Types', null, {});
    await queryInterface.bulkDelete('Difficulties', null, {});
  }
};
