// backend/migrations/genero.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('generos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_rawg: {
        type: Sequelize.INTEGER,
        allowNull: true // Corregido a true para que permita al administrador crear un genero personalizado que no exista en la API externa
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    await queryInterface.dropTable('generos')
  }
}
