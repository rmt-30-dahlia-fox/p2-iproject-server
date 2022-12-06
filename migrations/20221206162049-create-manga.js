'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mangas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MALId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      main_picture_medium: {
        type: Sequelize.STRING
      },
      main_picture_large: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.INTEGER
      },
      mean: {
        type: Sequelize.DECIMAL
      },
      alternative_titles_synonyms: {
        type: Sequelize.STRING
      },
      alternative_titles_en: {
        type: Sequelize.STRING
      },
      alternative_titles_ja: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mangas');
  }
};