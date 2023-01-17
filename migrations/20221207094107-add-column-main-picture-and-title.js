'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("WantToReads", "mainPicture", {
      type: Sequelize.STRING,
      allowNull:false
    })

    await queryInterface.addColumn("WantToReads", "title", {
      type: Sequelize.STRING,
      allowNull:false
    })


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("WantToReads", "mainPicture", {
      type: Sequelize.STRING
    })
    await queryInterface.removeColumn("WantToReads", "title", {
      type: Sequelize.STRING
    })
  }
};
