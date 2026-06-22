// backend/migrations/JuegoPlataforma.js
module.exports = {
  async up(queryInterface, Sequelize) { // Corregi el orden de los parametros
    await queryInterface.createTable('juegos_plataformas', {
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Corregido: Clave Compuesta parte 1
        references: {
        model: 'juegos',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Si se elimina un juego, limpia sus plataformas en la intermedia
      },
      id_plataforma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Corregido: Clave Compuesta parte 2
        references: {
        model: 'plataformas',
        key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Si se elimina una plataforma, limpia los juegos asociados en la intermedia
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
