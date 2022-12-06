'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [{
      "MALId": 10357,
      "title": "Jinrui wa Suitai Shimashita",
      "main_picture_medium": "https://api-cdn.myanimelist.net/images/anime/4/45704.jpg",
      "main_picture_large": "https://api-cdn.myanimelist.net/images/anime/4/45704l.jpg",
      "rank": 935,
      "mean": 7.76,
      "alternative_titles_synonyms": "Jintai",
      "alternative_titles_en": "Humanity Has Declined",
      "alternative_titles_ja": "人類は衰退しました",      
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('Mangas', data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Mangas');

  }
};
