'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tabla = await queryInterface.describeTable('juegos');

    if (!tabla.descripcion) {
      await queryInterface.addColumn('juegos', 'descripcion', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }
  },

  async down(queryInterface) {
    const tabla = await queryInterface.describeTable('juegos');

    if (tabla.descripcion) {
      await queryInterface.removeColumn('juegos', 'descripcion');
    }
  }
};