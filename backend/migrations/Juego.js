module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('juegos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lanzamiento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      url_imagen: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('juegos')
  }
}