"use strict"
const fs = require("fs")
const { hashPassword } = require("../helpers/bcyrpt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/patient.json", "utf-8")).map(
      (data) => {
        data.createdAt = new Date()
        data.updatedAt = new Date()
        data.password = hashPassword(data.password)

        return data
      }
    )
    await queryInterface.bulkInsert("Patients", data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Patients", null, {})
  },
}
