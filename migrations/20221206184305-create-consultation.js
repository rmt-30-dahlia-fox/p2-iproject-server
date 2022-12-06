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
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Diseases",
          key: "id",
        },
      },
      drugPrice: {
        type: Sequelize.INTEGER,
      },
      consultationPrice: {
        type: Sequelize.INTEGER,
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Appointments",
          key: "id",
        },
      },
      SymptomeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Symptomes",
          key: "id",
        },
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
