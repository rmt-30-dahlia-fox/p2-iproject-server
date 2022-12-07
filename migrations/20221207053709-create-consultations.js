"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Consultations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: { model: "Patients", key: "id" },
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: { model: "Diseases" },
      },
      drugPrice: {
        type: Sequelize.INTEGER,
      },
      consultationPrice: {
        type: Sequelize.INTEGER,
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: { model: "Doctors" },
      },
      symptome: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Consultations")
  },
}
