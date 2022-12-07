"use strict"
const fs = require("fs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/patientDetail.json", "utf-8")).map(
      (data) => {
        data.createdAt = new Date()
        data.updatedAt = new Date()

        return data
      }
    )
    await queryInterface.bulkInsert("PatientDetails", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PatientDetails", null, {})
  },
}
