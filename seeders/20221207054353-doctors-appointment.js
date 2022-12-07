"use strict"
const fs = require("fs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/doctor-date.json", "utf-8")).map(
      (data) => {
        data.createdAt = new Date()
        data.updatedAt = new Date()

        return data
      }
    )
    await queryInterface.bulkInsert("Appointments", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Appointments", null, {})
  },
}
