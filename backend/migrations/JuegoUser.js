// backend/migrations/JuegoUser.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('juegos_usuarios', { // Corregido al nombre correcto
      id_juego: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Clave primaria compuesta parte 1
        references: {
        model: 'juegos',
        key: 'id'
        },
        onUpdate: 'CASCADE', // Se agrega para limpiar tabla intermedia en caso de que se elimine un juego
        onDelete: 'CASCADE'
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, // Clave primaria compuesta parte 2
        references: {
        model: 'users',
        key: 'id'
        },
        onUpdate: 'CASCADE', // Se agrega para limpiar tabla intermedia en caso de que se elimine un usuario
        onDelete: 'CASCADE'
      },
      estado: {
        type: Sequelize.ENUM('completado', 'jugando', 'pendiente'), // Corregido, le faltaba la n
        allowNull: false,
        defaultValue: 'pendiente'
      },
      calificacion_personal: {
        type: Sequelize.INTEGER,
        allowNull: true     // Corregido: se saco la validacion ya que las validaciones de escala (1-5) actúan directo en el modelo
      },
      tiempo_de_juego_horas: { //Corregido al nombre que se usa en el modelo
        type: Sequelize.FLOAT,
        defaultValue: 0, // Agrega el valor inicial
        allowNull: false // Corregido, las validaciones se realizan en el modelo
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
    await queryInterface.dropTable('juegos_usuarios') // Corregido el nombre
  }
}
