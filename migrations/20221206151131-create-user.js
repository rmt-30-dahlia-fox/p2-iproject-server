'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: { msg: 'Email must be unique' },
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      city: {
        type: Sequelize.STRING
      },
      imageProfile: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        default: 'Regular'
      },
      star: {
        type: Sequelize.INTEGER,
        default: 0
      },
      BadgeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Badges',
          key: 'id'
        }
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
    await queryInterface.dropTable('Users');
  }
};