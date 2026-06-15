module.exports = {
  async up(Sequelize, queryInterface) {
    await queryInterface.createTable('juegos_plataformas', {
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'juegos',
        key: 'id'
        }
      },
      id_plataforma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'plataformas',
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
    await queryInterface.dropTable('juegos_plataformas')
  }
}