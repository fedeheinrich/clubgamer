// backend/migrations/JuegoGenero.js
module.exports = {
  async up(queryInterface, Sequelize) { // Corregí el orden
    await queryInterface.createTable('juegos_generos', {
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Corregido: Clave compuesta parte 1 (Igual al modelo)
        references: {
        model: 'juegos',
        key: 'id'
        },
        onUpdate: 'CASCADE',  // Se agrego para que si se actualiza/borra un juego se limpie la tabla intermedia
        onDelete: 'CASCADE'   
      },
      id_genero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Corregido: Clave Compuesta parte 2 (Igual al modelo)
        references: {
        model: 'generos',
        key: 'id'
        },
        onUpdate: 'CASCADE', // Si actualizan/borran un genero, limpia la intermedia
        onDelete: 'CASCADE' 
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
    await queryInterface.dropTable('juegos_generos')
  }
}
