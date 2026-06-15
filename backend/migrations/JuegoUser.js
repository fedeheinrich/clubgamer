module.exports = {
  async up(Sequelize, queryInterface) {
    await queryInterface.createTable('juego_user', {
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'juegos',
        key: 'id'
        }
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        }
      },
      estado: {
        type: Sequelize.ENUM('Completado', 'Jugando', 'Pendiente'),
        allowNull: false
      },
      calificacion_personal: {
        type: Sequelize.INTEGER,
        validate: {
            max: 10,
            min: 1
        }
      },
      tiempo_de_juego: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0
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
    await queryInterface.dropTable('juego_user')
  }
}