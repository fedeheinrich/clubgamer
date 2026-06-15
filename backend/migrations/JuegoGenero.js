module.exports = {
  async up(Sequelize, queryInterface) {
    await queryInterface.createTable('juego_genero', {
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'juegos',
        key: 'id'
        }
      },
      id_genero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'generos',
        key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('juego_genero')
  }
}